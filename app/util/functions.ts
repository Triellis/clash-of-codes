import jwt from "jsonwebtoken";
import cookie from "cookie";
export function getServerUrl(url: string) {
	let SERVER_URL;
	if (process.env.NODE_ENV === "production") {
		SERVER_URL = "https://clash-of-codes-api-pwiz.onrender.com";
	} else {
		SERVER_URL = "http://localhost:3001";
	}
	return `${SERVER_URL}/${url}`;
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
	const cookieObj = cookie.parse(document.cookie);
	const serverToken = cookieObj["server_token"];
	if (!serverToken) {
		throw new Error("Can not find the server_token cookie");
	}
	const userData = jwt.decode(serverToken);
	return userData;
}
