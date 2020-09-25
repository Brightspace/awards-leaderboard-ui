// Copyright 2020 D2L Corporation
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import './award-details.js';
import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/icons/icon.js';
import '@brightspace-ui/core/components/list/list.js';
import '@brightspace-ui/core/components/list/list-item.js';
import 'd2l-users/components/d2l-profile-image.js';
import './leaderboard-row.js';

import { BadgeImageSize, PanelPadding } from '../constants/constants';
import { bodyStandardStyles, heading2Styles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { BaseMixin } from '../mixins/base-mixin.js';

import { LeaderboardServiceFactory } from '../services/leaderboard-service-factory.js';
const mobileWidthMax = 700;
const fullWidthMin = 950;
const maxFullBadges = 10;
const maxMobileBadges = 8;

class App extends BaseMixin(LitElement) {

	static get properties() {
		return {
			orgUnitId: { type: Number },
			userId: { type: Number },
			sortByCreditsConfig: { type: Boolean },
			doneLoading: { type: Boolean },
			mobile: {
				type: Boolean,
				value: false
			},
			full: {
				type: Boolean,
				value: false
			},
			maxBadges: { type: Number },
			isEmptyLeaderboard: { type: Boolean },
			demo: { type: Boolean }
		};
	}

	static get styles() {
		return [
			bodyStandardStyles,
			heading2Styles,
			css`
			d2l-list {
				max-height: 420px;
				overflow: hidden;
				overflow-y: auto;
			}
			d2l-resize-aware {
				width: 100%;
			}

			@keyframes loadingPulse {
				0% { background-color: var(--d2l-color-sylvite); }
				50% { background-color: var(--d2l-color-regolith); }
				75% { background-color: var(--d2l-color-sylvite); }
				100% { background-color: var(--d2l-color-sylvite); }
			}
			.skeleton-awardRow{
				align-items: center;
				display: flex;
				flex-direction: row;
				padding: 3px;
			}
			.skeleton-awardRank{
				animation: loadingPulse 1.8s linear infinite;
				border-radius: 15px;
				height: 21px;
				margin: 9px;
				padding: 9px;
				width: 21px;
				-moz-border-radius:50%;
				-webkit-border-radius:50%;
			}
			.skeleton-profilePic {
				animation: loadingPulse 1.8s linear infinite;
				border-radius: 6px;
				height: 42px;
				margin-left: 7px;
				width: 42px;
			}
			:host([dir="rtl"]) .skeleton-profilePic {
				margin-left: 0px;
				margin-right: 7px;
			}
			.skeleton-info {
				display: flex;
				flex-direction: column;
				padding-left: 10px;
				width: 50%;
			}
			:host([dir="rtl"]) .skeleton-info {
				padding-left: 0px;
				padding-right: 10px;
			}
			.skeleton-name {
				animation: loadingPulse 1.8s linear infinite;
				border-radius: 6px;
				height: 0.8rem;
				width: 60%;
			}
			.skeleton-count {
				animation: loadingPulse 1.8s linear infinite;
				border-radius: 4px;
				height: 0.7rem;
				margin-top: 4px;
				width: 40%;
			}
			.emptyState {
				align-items: center;
				display: flex;
				flex-direction: column;
			}
			.emptyImage {
				max-width: 100%;
				width: 255px;
			}
		`];
	}

	constructor() {
		super();
		this.orgUnitId = 0;
		this.userId = 0;
		this.sortedLeaderboardArray = [];
		this.myAwards = {};
		this.sortByCreditsConfig = false;
		this.doneLoading = false;

		this.leaderboardService = LeaderboardServiceFactory.getLeaderboardService();

		const baseUrl = import.meta.url;
		this.emptyImage = new URL('../../images/leaderboard-empty-state.svg', baseUrl);
		this.maxBadges = maxMobileBadges;
	}

	firstUpdated() {
		this._getLeaderboard();
		this.addEventListener('award-issued-dialog', this._openDialog);
	}

	render() {
		const dialog = html`<award-details id="awarddetails"></award-details>`;

		let listContent;
		if (!this.doneLoading) {
			const numberOfItems = 5;
			const itemsSkeleton = html`
				<d2l-list-item>
					<d2l-list-item-content>
						<div class="skeleton-awardRow">
							<div class="skeleton-awardRank"></div>
							<div class="skeleton-profilePic"></div>
							<div class="skeleton-info">
								<div class="skeleton-name"></div>
								<div class="skeleton-count"></div>
							</div>
						</div>
					</d2l-list-item-content>
				</d2l-list-item>
			`;
			listContent = html`
				${(new Array(numberOfItems)).fill(itemsSkeleton)}
			`;
		} else if (this.isEmptyLeaderboard) {
			return this._displayEmptyLeaderboard();
		} else {
			listContent = html`
				${this.sortedLeaderboardArray.map(item => this._createLeaderboardEntry(item, false))}
				${this._createLeaderboardEntry(this.myAwards, true)}
			`;
		}
		return html`
			${dialog}
			<d2l-resize-aware @d2l-resize-aware-resized=${this._handleResized} ?mobile="${this.mobile}" ?full="${this.full}">
				<d2l-list aria-busy="${!this.doneLoading}">
					${listContent}
				</d2l-list>
			</d2l-resize-aware>
		`;
	}

	_createLeaderboardEntry(item, isMyAward) {
		if (item.UserId === undefined) {
			return;
		}
		if (item.UserId === this.userId) {
			isMyAward = true;
		}
		return html`
			<d2l-leaderboard-row
				?my-award="${isMyAward}"
				.userData="${item}"
				?sort-by-credits-config="${this.sortByCreditsConfig}"
				?mobile="${this.mobile}"
				?full="${this.full}"
				max-badges="${this.maxBadges}">
			</d2l-leaderboard-row>
		`;
	}

	_displayEmptyLeaderboard() {
		return html`
			<div class="emptyState">
				<img src="${this.emptyImage}" class="emptyImage" alt="" />
				<div class="d2l-heading-2">${this.localize('emptyHeading')}</div>
				<div class="d2l-body-standard">${this.localize('emptyBody')}</div>
			</div>
		`;
	}

	async _getLeaderboard() {
		const myLeaderboard = await this.leaderboardService.getLeaderboard(this.orgUnitId, this.sortByCreditsConfig);
		this.sortedLeaderboardArray = myLeaderboard.Objects;
		this.isEmptyLeaderboard = this._isEmptyLeaderboard();
		if (this.isEmptyLeaderboard) {
			this.doneLoading = true;
			return;
		}

		const isUserIncluded = this._isLoggedInUserIncluded();
		if (isUserIncluded) {
			this.doneLoading = true;
			return;
		}
		await this._getMyAwards();

		this.doneLoading = true;
	}

	async _getMyAwards() {
		//Obtain the currently logged in user's awards
		const myAwards = await this.leaderboardService.getMyAwards(this.orgUnitId, this.userId);
		if (myAwards === undefined || myAwards === null) {
			return;
		}
		if (Object.prototype.hasOwnProperty.call(myAwards, 'Message')) {
			return;
		}
		this.myAwards = myAwards;
	}

	async _handleResized(event) {
		if (!event || !event.detail || !event.detail.current) {
			return;
		}

		const currentWidth = event.detail.current.width;
		const mobile = currentWidth <= mobileWidthMax;
		const full = currentWidth > fullWidthMin;
		let maxBadges;
		if (!full) {
			const awardMaxWidth = Math.floor((currentWidth - PanelPadding * 2 - BadgeImageSize + 10) / (BadgeImageSize + 10));
			maxBadges = awardMaxWidth > maxMobileBadges ? maxMobileBadges : awardMaxWidth;
		} else {
			maxBadges = maxFullBadges;
		}
		if (this.mobile !== mobile || this.full !== full || this.maxBadges !== maxBadges) {
			this.mobile = mobile;
			this.full = full;
			this.maxBadges = maxBadges;

			await this.requestUpdate();
		}
	}

	_isEmptyLeaderboard() {
		if (this.sortedLeaderboardArray.some(awards => awards.TotalAwardCount > 0)) {
			return false;
		}
		return true;
	}

	_isLoggedInUserIncluded() {
		if (this.sortedLeaderboardArray.some(awards => awards.UserId === this.userId)) {
			return true;
		}
		return false;
	}

	_openDialog(event) {
		this.shadowRoot.getElementById('awarddetails').openDialog(event);
	}
}

window.customElements.define('d2l-awards-leaderboard-ui', App);
