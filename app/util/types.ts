import { ObjectId } from "mongodb";

export type Clan = "BW" | "RG" | "YB" | "PP";

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
	role: "User" | "Admin" | "Elder" | "Member" | "Leader" | "CoLeader";
	clan: null | Clan;
	visits: number;
	createdAt: Date;
	lastVisit: Date;
	cfUsername?: string;
};

export type UserOnClient = Omit<UserCol, "visits" | "createdAt" | "lastVisit">;
