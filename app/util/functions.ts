import cookie from "cookie";
import jwt from "jsonwebtoken";
import useSWR from "swr";
import NotifToast from "../components/NotifToast";
import {
	AddContestState,
	ContestCol,
	UserOnClient,
	ReceivedPastScore,
	ClanData,
	ClanMember,
} from "./types";

export function getServerUrl(url: string) {
	let SERVER_URL;
	if (process.env.NODE_ENV === "production") {
		SERVER_URL = "https://clash-of-codes.onrender.com";
	} else {
		SERVER_URL = "http://localhost:3001";
	}
	return `${SERVER_URL}${url}`;
}

export function getSocketsUrl(url: string) {
	let SOCKET_URL;
	if (process.env.NODE_ENV === "production") {
		SOCKET_URL = "wss://clash-of-codes.onrender.com";
	} else {
		SOCKET_URL = "ws://localhost:3001";
	}
	return `${SOCKET_URL}${url}`;
}

export function customFetch(url: string, options?: any) {
	options = options || {};

	options.headers = {
		...options.headers,
		auth: document.cookie,
		"Content-Type": "application/json",
	};

	return fetch(getServerUrl(url), options);
}

export function getUserData() {
	if (!process.browser) return null;
	const cookieObj = cookie.parse(document.cookie);
	const serverToken = cookieObj["server_token"];
	if (!serverToken) {
		return null;
	}
	const userData: UserOnClient = jwt.decode(serverToken) as UserOnClient;
	return userData;
}
//@ts-ignore
export const fetcher = (...args) => {
	args.push({
		headers: {
			auth: document.cookie,
			"Content-Type": "application/json",
		},
	});
	//@ts-ignore
	return fetch(...args).then((res) => {
		return res.json();
	});
};

export function fullForm(short: string) {
	switch (short) {
		case "RG":
			return "Red Giants";
		case "BW":
			return "Blue Wizards";
		case "PP":
			return "Purple PEKKAS";
		case "YB":
			return "Yellow Barbarians";
		default:
			return "N/A";
	}
}

export function useConfig(
	page: number,
	searchQuery: string,
	maxResults: number
) {
	const { data, error, isLoading, mutate } = useSWR(
		getServerUrl(
			`/admin/config?page=${page}&maxResults=${maxResults}&searchQuery=${searchQuery}`
		),
		fetcher
	);

	return {
		contests: data as ContestCol[],
		isLoading,
		isError: error,
		mutate,
	};
}

export function useUser(page: number, searchQuery: string, maxResults: number) {
	const { data, error, isLoading, mutate } = useSWR(
		getServerUrl(
			`/admin/users?maxResults=${maxResults}&&page=${page}&&searchQuery=${searchQuery}`
		),
		fetcher
	);

	return {
		users: data as UserOnClient[],
		isLoading,
		isError: error,
		mutate,
	};
}

export async function addContest(
	contest: AddContestState,
	mutate: Function,
	toast: any
) {
	// Remove all spaces
	if (contest?.ContestCode === "") {
		NotifToast({
			title: "Please enter a contest code",
			status: "error",
			toast: toast,
		});
		return;
	}

	const res = await customFetch("/admin/config", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(contest),
	});

	const status = await res.status;
	if (status === 200) {
		mutate();
		NotifToast({
			title: "Success",
			status: "success",
			toast: toast,
		});
	} else {
		NotifToast({
			title: "failed",
			description: await res.text(),
			status: "error",
			toast: toast,
		});
	}
}

export function hasEmptyFields(object: any) {
	for (const key of Object.keys(object)) {
		const value = object[key];

		if (value === "") {
			return true;
		}
	}
	return false;
}

export async function addUser(
	user: UserOnClient,
	mutate: Function,
	toast: any,
	dispatchUser: Function
) {
	if (hasEmptyFields(user)) {
		NotifToast({
			title: "Please fill all fields",
			status: "error",
			toast: toast,
		});
		return;
	}
	// @ts-ignore
	if (user.clan === "None") {
		user.clan = null;
	}

	if (user.role !== "User" && user.role !== "Admin" && user.clan === null) {
		NotifToast({
			title: "Please select a clan",
			status: "error",
			toast: toast,
		});
		return;
	}

	const res = await customFetch("/admin/users", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	});

	const status = await res.status;

	if (status === 200) {
		mutate();
		NotifToast({
			title: "Success",
			status: "success",
			toast: toast,
		});

		dispatchUser({ type: "RESET", value: "" });
	} else {
		NotifToast({
			title: "failed",
			description: await res.text(),
			status: "error",
			toast: toast,
		});
	}
}

export function usePastScores(
	page: number,

	maxResults: number
) {
	const { data, error, isLoading, mutate } = useSWR(
		getServerUrl(`/PastScores?page=${page}&maxResults=${maxResults}`),
		fetcher
	);

	return {
		data: data as ReceivedPastScore[],
		isLoading,
		isError: error,
		mutate,
	};
}
export function useClans(clanName?: string) {
	let urlString = `/clans`;
	if (clanName !== undefined) {
		urlString += `?clanName=${clanName}`;
	}

	const { data, error, isLoading, mutate } = useSWR(
		getServerUrl(urlString),
		fetcher
	);
	if (clanName) {
		return {
			clans: data as ClanData,
			isLoading,
			isError: error,
			mutate,
		};
	}
	return {
		clans: data as ClanData[],
		isLoading,
		isError: error,
		mutate,
	};
}
export function useClanMembers(
	clanName: string,
	searchQuery: string,
	page: number,
	maxResults: number
) {
	const { data, error, isLoading, mutate } = useSWR(
		getServerUrl(
			`/clan/${clanName}?page=${page}&maxResults=${maxResults}&searchQuery=${searchQuery}`
		),
		fetcher
	);

	return {
		members: data as ClanMember[],
		isMembersLoading: isLoading,
		isMembersError: error,
		membersMutate: mutate,
	};
}
