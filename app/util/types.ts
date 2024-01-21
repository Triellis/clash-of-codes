import { ObjectId } from "mongodb";

export type Clan = "BW" | "RG" | "YB" | "PP";
export type Role =
	| "Admin"
	| "Elder"
	| "Member"
	| "Leader"
	| "CoLeader"
	| "User";

export interface ContestCol {
	_id?: ObjectId;

	ContestCode: string;
	DateAdded: Date;
	Live: boolean;
}

export type UserCol = {
	_id?: ObjectId;
	name: String;
	email: String;
	role: Role;
	clan: null | Clan;
	visits: number;
	createdAt: Date;
	lastVisit: Date;
	cfUsername?: string;
};

export type UserOnClient = Omit<UserCol, "visits" | "createdAt" | "lastVisit">;

export type AddContestState = { Team1: Clan; Team2: Clan; ContestCode: string };

export type AddUserAction = {
	field?: "name" | "email" | "cfUsername" | "role" | "clan";
	value: string | Clan | Role;
	type: "UPDATE" | "RESET";
};

export type CFAPIResponse = {
	rank: number;
	points: number;
	penalty: number;
	username: string;
};

type ModifiedCFResponse = {
	name: string;
	cfUsername: string;
} & Omit<CFAPIResponse, "username">;

export type LiveBoardTeam = {
	[key in Clan]: ModifiedCFResponse[];
};

export type LiveLeaderboard = LiveBoardTeam[];

export type TabsType = {
	label: string;
	value: string;
	color?: string;
}[];
export type CFAPIResponseWithRating = Omit<CFAPIResponse, "panelty"> & {
	rating: number;
};
export type ProcessedRatingData = {
	[key in Clan]?: CFAPIResponseWithRating[];
};

export type ReceivedPastScore = {
	dateAdded: Date;
} & ProcessedRatingData;
export type Side = "LeftSide" | "RightSide";
export type ClanData = {
	clanName: Clan;
	totalScore: number;
	totalProblemSolved: number;
};
