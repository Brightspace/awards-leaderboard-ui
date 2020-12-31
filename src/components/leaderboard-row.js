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
import './award-issued.js';
import '@brightspace-ui-labs/accordion/accordion-collapse.js';
import 'd2l-resize-aware/d2l-resize-aware.js';
import { bodyCompactStyles, bodySmallStyles  } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html, LitElement, unsafeCSS } from 'lit-element/lit-element.js';
import { PanelPadding, TopStyleLimit } from '../constants/constants';
import { BaseMixin } from '../mixins/base-mixin.js';
import { LeaderboardRoutes } from '../helpers/leaderboardRoutes';

class LeaderboardRow extends BaseMixin(LitElement) {

	static get properties() {
		return {
			userData: { type: Object },
			myAward: { type: Boolean, attribute: 'my-award' },
			sortByCreditsConfig: { type: Boolean, attribute: 'sort-by-credits-config' },
			mobile: {
				type: Boolean,
				value: false
			},
			full: {
				type: Boolean,
				value: false
			},
			maxBadges: { type: Number, attribute: 'max-badges' },
			_displayedBadges: { type: Number }
		};
	}

	static get styles() {
		return [
			bodyCompactStyles,
			bodySmallStyles,
			css`
			:host {
				width: 100%;
			}
			.d2l-award-row {
				align-items: center;
				display: flex;
				flex-direction: row;
			}
			.d2l-profile-image {
				border-radius: 5px;
				margin-left: 12px;
			}
			:host([dir="rtl"]) .d2l-profile-image {
				margin-right: 12px;
				margin-left: 0;
			}
			.d2l-award-rank {
				align-items: center;
				background-color: #E3E9F1;
				border: 1px solid #E3E9F1;
				border-radius: 15px;
				display: flex;
				height: 21px;
				justify-content: center;
				margin-left: 17px;
				padding: 9px;
				width: 21px;
				-moz-border-radius:50%;
				-webkit-border-radius:50%;
			}
			.d2l-ranking{
				width: 58px;
			}
			:host([dir="rtl"]) .d2l-award-rank {
				margin-left: 0px;
				margin-right: 17px;
			}
			.d2l-award-rank[topRank] {
				background-color: white;
				border: 1px solid var(--d2l-color-ferrite);
			}
			.d2l-award-row[myAward] .d2l-award-rank[topRank],
			.d2l-award-row[myAward] .d2l-award-rank {
				border: 1px solid var(--d2l-color-celestine);
			}
			:host([full]) .d2l-credit-count {
				align-items: center;
				display:flex;
			}
			.d2l-credit-count {
				display: flex;
				flex-direction: column;
				overflow: hidden;
				margin-left: 10px;
			}
			:host([dir="rtl"]) .d2l-credit-count {
				margin-left: 0px;
				margin-right: 10px;
			}
			:host([full]) .d2l-credit-count {
				align-items: center;
				display: flex;
				flex-direction: row;
				width: 35%;
			}
			.d2l-display-name {
				overflow: hidden;
				text-overflow: ellipsis;
			}
			:host([full]) .d2l-display-name {
				margin-right: 10px;
				width: 70%;
			}
			:host([full][dir="rtl"]) .d2l-display-name {
				margin-left: 10px;
				margin-right: 0;
			}
			.d2l-display-number {
				margin-left: 0;
				margin-right: 0;
			}
			:host([full]) .d2l-display-number {
				align-items: center;
				display: flex;
				width: 30%;
			}
			.d2l-panel {
				background-color: var(--d2l-color-sylvite);
				border-top: 1px solid var(--d2l-color-mica);
				margin-bottom: -11px;
				margin-top: 11px;
				padding-bottom: 12px;
				padding-left: ${unsafeCSS(PanelPadding)}px;
				padding-top: 12px;
			}
			:host([dir="rtl"]) .d2l-panel {
				padding-left: 0px;
				padding-right: ${unsafeCSS(PanelPadding)}px;
			}
			.side {
				flex-shrink: 0;
				margin-left: auto;
				margin-right: 25px;
			}
			:host([dir="rtl"]) .side {
				margin-left: 25px;
				margin-right: auto;
			}
			`
		];
	}

	render() {
		if (this.userData === undefined) {
			return;
		}

		const mainFontStyle = this.full ? 'd2l-body-standard' : 'd2l-body-compact';
		const secondFontStyle = this.full ? 'd2l-body-standard' : 'd2l-body-small';

		const isDisabled = this.userData.TotalAwardCount === 0 ? true : false;

		if (this.mobile) {
			return html`
				<d2l-labs-accordion>
					<d2l-labs-accordion-collapse flex icon-has-padding ?disabled="${isDisabled}">
						<div class="d2l-award-row" ?myAward="${this.myAward}" slot="header">
							<div class="d2l-ranking">
								<div
									class="d2l-award-rank ${mainFontStyle}"
									role="img"
									?topRank="${this.userData.Rank <= TopStyleLimit}"
									aria-label="${this.localize('rankingAria', { rank:`${this.userData.Rank}` })}">
									${this.userData.Rank}
								</div>
							</div>
							<d2l-profile-image
								class="d2l-profile-image"
								href="${LeaderboardRoutes.ProfileImage(this.userData.UserId)}"
								medium
								token="token"
								aria-hidden="true">
							</d2l-profile-image>
							<div class="d2l-credit-count">
								<div class="${mainFontStyle} d2l-display-name" @mouseenter=${this._handleMouseEnter}>${this.userData.DisplayName}</div>
								<div class="${secondFontStyle} d2l-display-number">${this._getDisplayNumber()}</div>
							</div>
						</div>
						<div class="d2l-panel">
							<span role="list">
								${this._getAwardsDisplay()}
							</span>
							${this._getExtraAwardsDisplay()}
						</div>
					</d2l-labs-accordion-collapse>
				</d2l-labs-accordion>
			`;
		}
		return html`
			<div class="d2l-award-row" ?myAward="${this.myAward}">
				<div class="d2l-ranking">
					<div
						class="d2l-award-rank ${mainFontStyle}"
						role="img"
						?topRank="${this.userData.Rank <= TopStyleLimit}"
						aria-label="${this.localize('rankingAria', { rank:`${this.userData.Rank}` })}">
						${this.userData.Rank}
					</div>
				</div>
				<d2l-profile-image
					class="d2l-profile-image"
					href="${LeaderboardRoutes.ProfileImage(this.userData.UserId)}"
					medium
					token="token"
					aria-hidden="true">
				</d2l-profile-image>
				<div class="d2l-credit-count">
					<div class="${mainFontStyle} d2l-display-name" @mouseenter=${this._handleMouseEnter}>${this.userData.DisplayName}</div>
					<div class="${secondFontStyle} d2l-display-number">${this._getDisplayNumber()}</div>
				</div>
				<div class="side">
					<span role="list">
						${this._getAwardsDisplay()}
					</span>
					${this._getExtraAwardsDisplay()}
				</div>
			</div>
		`;
	}

	_createAwardEntry(award) {
		if (this._displayedBadges > (this.maxBadges - 1)) {
			return;
		}
		this._displayedBadges = this._displayedBadges + 1;
		const tooltipMidline = this.maxBadges / 2;
		const isTooltipStart = (this.mobile && this._displayedBadges <= tooltipMidline);
		const isTooltipEnd = (this.mobile && this._displayedBadges > tooltipMidline);

		return html`
			<span role="listitem">
				<d2l-award-issued .award=${award} .isTooltipStart=${isTooltipStart} .isTooltipEnd=${isTooltipEnd}>
				</d2l-award-issued>
			</span>
		`;
	}

	_getAwardCountText() {
		if (this.userData.TotalAwardCount === 1) {
			return this.localize('awards.one');
		}
		return this.localize('awards.many', { numawards:`${this.userData.TotalAwardCount}` });
	}

	_getAwardsDisplay() {
		if (!this._hasAwardsToDisplay()) {
			return;
		}

		this._displayedBadges = 0;

		return html`
			${this.userData.IssuedAwards.Objects.map(award => this._createAwardEntry(award))}
		`;
	}

	_getCreditCountText() {
		if (this.userData.TotalCreditCount === 1) {
			return this.localize('credits.one');
		}
		return this.localize('credits.many', { numcredits:`${this.userData.TotalCreditCount}` });
	}

	_getDisplayNumber() {
		if (this.sortByCreditsConfig) {
			return this._getCreditCountText();
		}
		return this._getAwardCountText();
	}

	_getExtraAwardCount() {
		if (this.userData.TotalAwardCount > this.maxBadges) {
			const extraCount = this.userData.TotalAwardCount - this.maxBadges;
			return extraCount;
		}
		return 0;
	}

	_getExtraAwardsDisplay() {
		const extraCount = this._getExtraAwardCount();

		if (extraCount === 0) {
			return;
		}
		return html`
				<span role="img" aria-label="${this.localize('extraCountDescription', { extracount:`${extraCount}` })}">+${extraCount}</span>
			`;
	}

	_handleMouseEnter(event) {
		const target = event.target;

		if (target && target.offsetWidth < target.scrollWidth) {
			target.title = target.innerText.trim();
		}
	}

	_hasAwardsToDisplay() {
		if (this.userData === undefined ||
			this.userData.IssuedAwards === undefined ||
			this.userData.IssuedAwards.Objects === undefined ||
			!this.userData.IssuedAwards.Objects.length
		) {
			return false;
		}
		return true;
	}
}

window.customElements.define('d2l-leaderboard-row', LeaderboardRow);
