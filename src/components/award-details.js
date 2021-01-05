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

import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import '@brightspace-ui/core/components/icons/icon.js';
import '@brightspace-ui/core/components/list/list.js';
import '@brightspace-ui/core/components/list/list-item.js';
import 'd2l-users/components/d2l-profile-image.js';
import './leaderboard-row.js';

import { bodyStandardStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { BaseMixin } from '../mixins/base-mixin.js';

class AwardDetails extends BaseMixin(LitElement) {

	static get properties() {
		return {
			awardsDialogOpen: { type: Boolean },
			awardTitle: { type: String },
			issuerName: { type: String },
			awardDescription: { type: String },
			awardIssued: { type: String },
			awardCredit: { type: String },
			awardEvidence: { type: String },
			awardImage: { type: String },
			awardExpiry: { type: String }
		};
	}

	static get styles() {
		return [
			bodyStandardStyles,
			labelStyles,
			css`
			.d2l-award-details-row {
				display: flex;
				flex-direction: row;
			}
			.d2l-award-image {
				overflow: auto;
				max-width: 85px;
				width: 20%;
			}
			.d2l-award-image img{
				width: 100%;
			}
			.d2l-award-description {
				max-width: 70%;
				margin-left: 1rem;
			}
			:host([dir="rtl"]) .d2l-award-description {
				margin-left: 0;
				margin-right: 1rem;
			}
			.d2l-body-compact {
				margin-bottom: .25rem;
			}
		`];
	}

	constructor() {
		super();
		this.awardsDialogOpen = false;
	}

	render() {
		return html`
				<d2l-dialog title-text="${this.awardTitle}" ?opened="${this.awardsDialogOpen}" @d2l-dialog-close="${this._closeDialog}">
					${this._renderDialogContents()}
					<d2l-button slot="footer" dialog-action>${this.localize('closeDialog')}</d2l-button>
				</d2l-dialog>
			`;
	}

	openDialog(event) {
		this.awardTitle = event.detail.awardTitle;
		this.issuerName = event.detail.issuerName;
		this.awardDescription = event.detail.awardDescription;
		this.awardIssued = event.detail.awardIssued;
		this.awardCredit = event.detail.awardCredit;
		this.awardEvidence = event.detail.awardEvidence;
		this.awardImage = event.detail.awardImage;
		this.awardExpiry = event.detail.awardExpiry;

		this.awardsDialogOpen = true;
	}

	_closeDialog() {
		this.awardsDialogOpen = false;
		// When dialog closes, reset blur to hide tooltip
		requestAnimationFrame(() => document.activeElement.blur());
	}

	_renderDialogContents() {
		if (!this.awardsDialogOpen) {
			return;
		}

		const credits = this.awardCredit === null || this.awardCredit === undefined ?
			html`` :
			html`
				<div class="d2l-label-text">${this.localize('label.credits')}</div>
				<div class="d2l-body-compact">${this.awardCredit}</div>
			`;
		const expiry = this.awardExpiry === null || this.awardExpiry === undefined ?
			html`` :
			html`
				<div class="d2l-label-text">${this.localize('label.expiryDate')}</div>
				<div class="d2l-body-compact">${this.formatDateTime(this.awardExpiry)}</div>
			`;

		return html`
			<div class="d2l-award-details-row">
				<div class="d2l-award-image">
					<img src="${this.awardImage}" alt="${this.awardTitle}" />
				</div>
				<div class="d2l-award-description">
					<div class="d2l-label-text">${this.localize('label.description')}</div>
					<div class="d2l-body-compact">${this.awardDescription}</div>

					${expiry}

					<div class="d2l-label-text">${this.localize('label.issueDate')}</div>
					<div class="d2l-body-compact">${this.formatDateTime(this.awardIssued)}</div>

					<div class="d2l-label-text">${this.localize('label.issuer')}</div>
					<div class="d2l-body-compact">${this.issuerName}</div>

					${credits}

					<div class="d2l-label-text">${this.localize('label.evidence')}</div>
					<div class="d2l-body-compact">${this.awardEvidence}</div>
				</div>
			</div>
		`;
	}

}

window.customElements.define('d2l-award-details', AwardDetails);
