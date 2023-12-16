export function getServerUrl(url: string) {
	let SERVER_URL;
	if (process.env.NODE_ENV === "production") {
		SERVER_URL = "https://clash-of-codes-api.onrender.com";
	} else {
		SERVER_URL = "http://localhost:3001";
	}
	return `${SERVER_URL}/${url}`;
}

export function customFetch(url: string, options?: any) {
	options = options || {};
	options.headers = {
		...options.headers,
		cookie: document.cookie,
	};
	return fetch(getServerUrl(url), ...options);
}
