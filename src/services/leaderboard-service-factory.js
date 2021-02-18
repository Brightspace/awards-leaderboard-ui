
import { DemoService } from './demo-service.js';
import { LeaderboardService } from './awards-leaderboard-service.js';

export class LeaderboardServiceFactory {
	static getLeaderboardService() {
		if (window.demo) {
			return DemoService;
		}
		return LeaderboardService;
	}
}
