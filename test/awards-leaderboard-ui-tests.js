import '../src/components/awards-leaderboard-ui.js';
import { expect, fixture, html } from '@open-wc/testing';

describe('awards-leaderboard-ui', () => {
	let awardsLeaderboard;

	describe('basic', () => {
		beforeEach(async () => {
			awardsLeaderboard = await fixture(html`
				<d2l-awards-leaderboard-ui id="leaderboard">
				</d2l-awards-leaderboard-ui>
			`);
		});

		it('should return row for different userId', () => {
			awardsLeaderboard.userId = 5;

			const item = { UserId: 1234 };
			const ret = awardsLeaderboard._createLeaderboardEntry(item, false);

			expect(ret).to.not.be.null;
			expect(ret).to.not.be.undefined;
		});

		it('should return row for same userId', () => {
			awardsLeaderboard.userId = 1234;

			const item = { UserId: 1234 };
			const ret = awardsLeaderboard._createLeaderboardEntry(item, false);

			expect(ret).to.not.be.null;
			expect(ret).to.not.be.undefined;
		});

		it('should return nothing if userid is not set', () => {
			awardsLeaderboard.userId = 5;

			const item = {};
			const ret = awardsLeaderboard._createLeaderboardEntry(item, false);

			expect(ret).to.be.undefined;
		});

		it('should return true mobile, false full match the mobile value', () => {
			const event = { detail: { current: { width: 700 } } };

			awardsLeaderboard._handleResized(event);

			expect(awardsLeaderboard.mobile).to.be.true;
			expect(awardsLeaderboard.full).to.be.false;
			expect(awardsLeaderboard.maxBadges).to.equal(8);
		});

		it('should return true mobile, false full for tiny', () => {
			const event = { detail: { current: { width: 200 } } };

			awardsLeaderboard._handleResized(event);

			expect(awardsLeaderboard.mobile).to.be.true;
			expect(awardsLeaderboard.full).to.be.false;
			expect(awardsLeaderboard.maxBadges).to.equal(3);
		});

		it('should return true mobile, false full for just over mobile', () => {
			const event = { detail: { current: { width: 701 } } };

			awardsLeaderboard._handleResized(event);

			expect(awardsLeaderboard.mobile).to.be.false;
			expect(awardsLeaderboard.full).to.be.false;
			expect(awardsLeaderboard.maxBadges).to.equal(8);
		});

		it('should return false mobile, false full for under full', () => {
			const event = { detail: { current: { width: 900 } } };

			awardsLeaderboard._handleResized(event);

			expect(awardsLeaderboard.mobile).to.be.false;
			expect(awardsLeaderboard.full).to.be.false;
			expect(awardsLeaderboard.maxBadges).to.equal(8);
		});

		it('should return false mobile, true full for over full', () => {
			const event = { detail: { current: { width: 951 } } };

			awardsLeaderboard._handleResized(event);

			expect(awardsLeaderboard.mobile).to.be.false;
			expect(awardsLeaderboard.full).to.be.true;
			expect(awardsLeaderboard.maxBadges).to.equal(10);
		});
	});
});
