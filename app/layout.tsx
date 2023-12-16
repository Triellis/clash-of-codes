import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";
import { Providers } from "./providers";
import NavBar from "./components/NavBar/NavBar";
import { useState } from "react";
// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Clash Of Codes",
	description: "The Live Coding Competition",
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
					<NavBar />
					{children}
				</Providers>
			</body>
		</html>
	);
}
