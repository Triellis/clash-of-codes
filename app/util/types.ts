import { ObjectId } from "mongodb";

export type UserCol = {
	_id?: ObjectId;
	name: String;
	email: String;
	role: "User" | "Admin" | "Elder" | "Member" | "Leader" | "CoLeader";
	clan: null | "BW" | "RG" | "YB" | "PP";
	visits: number;
	createdAt: Date;
	lastVisit: Date;
};

export type UserOnClient = Omit<UserCol, "visits" | "createdAt" | "lastVisit">;
