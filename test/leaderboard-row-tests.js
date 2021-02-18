import '../src/components/leaderboard-row.js';
import { expect, fixture, html } from '@open-wc/testing';

describe('leaderboard-row', () => {
	let leaderboardRow;

	describe('basic', () => {
		beforeEach(async () => {
			leaderboardRow = await fixture(html`
                <d2l-leaderboard-row id="leaderboardRow"></d2l-leaderboard-row>
            `);
		});

		it('should return award issued and increment displayBadge count', () => {
			leaderboardRow._displayedBadges = 1;

			const award = { UserId: 1234, TotalAwardCount: 2 };
			const ret = leaderboardRow._createAwardEntry(award);

			expect(ret).to.not.be.null;
			expect(ret).to.not.be.undefined;
			expect(ret.strings[0]).to.not.equal('');
			expect(leaderboardRow._displayedBadges).to.equal(2);
		});

		it('should not return award, displayed more than max', () => {

			leaderboardRow._displayedBadges = 100;
			leaderboardRow.maxBadges = 8;

			const award = { UserId: 1234, TotalAwardCount: 3 };
			const ret = leaderboardRow._createAwardEntry(award);

			expect(ret).to.be.undefined;
		});

		it('should not return award displayed same as max', () => {
			leaderboardRow._displayedBadges = 8;
			leaderboardRow.maxBadges = 8;

			const award = { UserId: 1234, TotalAwardCount: 3 };
			const ret = leaderboardRow._createAwardEntry(award);

			expect(ret).to.be.undefined;
		});

		it('should have extra count of badges for display', () => {
			leaderboardRow.maxBadges = 8;
			leaderboardRow.userData = {
				'UserId': 1234,
				'TotalAwardCount': 20,
				'IssuedAwards': { 'Objects': [{ 'AwardId': 1 }] }
			};

			const ret = leaderboardRow._getExtraAwardCount();

			expect(ret).to.be.equal(12);
		});

		it('should not have extra count for less than limit', () => {
			leaderboardRow.userData = {
				'UserId': 1234,
				'TotalAwardCount': 1,
				'IssuedAwards': { 'Objects': [{ 'AwardId': 1 }] }
			};

			const ret = leaderboardRow._getExtraAwardCount();

			expect(ret).to.be.equal(0);
		});

		it('should return 0 when user has no issued awards', () => {
			leaderboardRow.userData = {
				'UserId': 1234,
				'TotalAwardCount': 1
			};

			const ret = leaderboardRow._getExtraAwardCount();

			expect(ret).to.be.equal(0);
		});

		it('should return 0 awards', () => {
			leaderboardRow.userData = { UserId: 1234, TotalAwardCount: 0 };

			const ret = leaderboardRow._getAwardCountText();

			expect(ret).to.equal('0 awards');
		});

		it('should return 1 award', () => {
			leaderboardRow.userData = { UserId: 1234, TotalAwardCount: 1 };

			const ret = leaderboardRow._getAwardCountText();

			expect(ret).to.equal('1 award');
		});

		it('should return 3 awards', () => {
			leaderboardRow.userData = { UserId: 1234, TotalAwardCount: 3 };

			const ret = leaderboardRow._getAwardCountText();

			expect(ret).to.equal('3 awards');
		});

		it('should return 0 credits', () => {
			leaderboardRow.userData = { UserId: 1234, TotalCreditCount: 0 };

			const ret = leaderboardRow._getCreditCountText();

			expect(ret).to.equal('0 credits');
		});

		it('should return 1 credit', () => {
			leaderboardRow.userData = { UserId: 1234, TotalCreditCount: 1 };

			const ret = leaderboardRow._getCreditCountText();

			expect(ret).to.equal('1 credit');
		});

		it('should return 3 credits', () => {
			leaderboardRow.userData = { UserId: 1234, TotalCreditCount: 3 };

			const ret = leaderboardRow._getCreditCountText();

			expect(ret).to.equal('3 credits');
		});

		it('should return 1 award for sorting false', () => {
			leaderboardRow.sortByCreditsConfig = false;
			leaderboardRow.userData = { UserId: 1234, TotalAwardCount: 1 };

			const ret = leaderboardRow._getDisplayNumber();

			expect(ret).to.equal('1 award');
		});

		it('should return 1 award for sorting true', () => {
			leaderboardRow.sortByCreditsConfig = true;
			leaderboardRow.userData = { UserId: 1234, TotalCreditCount: 1 };

			const ret = leaderboardRow._getDisplayNumber();

			expect(ret).to.equal('1 credit');
		});
	});
});
