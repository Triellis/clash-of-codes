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
	description: "The Official Live Leaderboard for Clash of Codes ",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// const [isOpen, setIsOpen] = useState(false);

	return (
		<html lang="en">
			<Head>
				<meta property="og:image" content="./icons/coc.png" />
				<meta property="og:image:alt" content="logo" />
				<meta property="og:image:type" content="image/png" />
				<meta property="og:image:width" content="91" />
				<meta property="og:image:height" content="90" />
			</Head>
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
