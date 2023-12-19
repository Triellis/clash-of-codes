"use client";

import React from "react";
import Logo from "../components/Logo/Logo";
import NavBar from "../components/NavBar/NavBar";
import NavItem from "../components/NavItem/NavItem";
import styles from "./page.module.css";
import { Flex } from "@chakra-ui/react";
import { customFetch, getServerUrl, getUserData } from "../util/functions";

export default function Test() {
	const [isOpen, setIsOpen] = React.useState(false);
	return (
		<main className={styles.main}>
			<button
				onClick={async () => {
					const dummyContest = {
						Team1: "BW",
						Team2: "YB",
						ContestCode: "12345",
						Live: true,
					};

					const res = await customFetch(`admin/config`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(dummyContest),
					});
				}}
			>
				Click
			</button>
		</main>
	);
}
