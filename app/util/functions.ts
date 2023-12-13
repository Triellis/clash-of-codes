export function getFullUrl(url: string) {
	let SERVER_URL;
	if (process.env.NODE_ENV === "production") {
		SERVER_URL = "https://supercell.vercel.app";
	} else {
		SERVER_URL = "http://localhost:3001";
	}
	return `${SERVER_URL}/${url}`;
}
