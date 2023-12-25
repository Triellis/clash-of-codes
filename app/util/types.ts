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
	Team1: Clan;
	Team2: Clan;
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
