import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useState } from "react";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import { Providers } from "./providers";
import "./styles/globals.css";
import Head from "next/head";
// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Clash of Codes",
	metadataBase: new URL("https://clash-of-codes-five.vercel.app"),
	description: "The Official Live Leaderboard for Clash of Codes ",
	keywords: [
		"Clash of Codes",
		"Leaderboard",
		"Coding",
		"Live",
		"Ahmedabad University",
		"AU",
		"codeforces",
		"live leaderboard",
		"coding leaderboard",
		"coding competition",
		"coding contest",
		"coding",
		"programming",
		"programming contest",
		"programming competition",
		"programming leaderboard",
		"programming leaderboard",
		"programming live leaderboard",
		"programming live",
	],
	openGraph: {
		title: "Clash of Codes",
		description: "The Official Live Leaderboard for Clash of Codes ",
		images: {
			url: "/icons/coc.png", // Must be an absolute URL
			width: 91,
			height: 90,
		},
		url: "https://clash-of-codes-five.vercel.app",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// const [isOpen, setIsOpen] = useState(false);

	return (
		<html lang="en">
			<body>
				<Providers>
					<div className="nav">
						<NavBar />
					</div>
					<div id="root">{children}</div>
					<div>
						<Footer />
					</div>
				</Providers>
			</body>
		</html>
	);
}
