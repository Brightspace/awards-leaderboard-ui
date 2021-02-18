const BAS_VERSION = 1.1;
const MAX_USERS = 10;

export class LeaderboardRoutes {
	static ClasslistLeaderboard(orgUnitId, classlistSort) { return `/d2l/api/bas/${BAS_VERSION}/orgunits/${orgUnitId}/classlist/?limit=${MAX_USERS}&sortField=${classlistSort}&fetchLatest=true&awardType=1`; }
	static MyAwards(orgUnitId, userId) { return `/d2l/api/bas/${BAS_VERSION}/orgunits/${orgUnitId}/classlist/users/${userId}`; }
	static MyConfigs(orgUnitId) { return `/d2l/api/bas/${BAS_VERSION}/orgunits/${orgUnitId}/myConfiguration`; }
	static ProfileImage(userId) { return `/d2l/api/hm/users/${userId}`; }
}
