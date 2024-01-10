"use client";

import { Divider } from "@chakra-ui/react";
import React from "react";
import Leaderboard from "../components/Leaderboard/Leaderboard";
import styles from "./PastScores.module.css";

function Board() {
	return (
		<div className={styles.board}>
			<div className={styles.date}>Date: 14/6/2023</div>
			<Divider />
			{/* <Leaderboard fetchedData={} /> */}
		</div>
	);
}

function page() {
	return (
		<div className={styles.main}>
			<Board />
		</div>
	);
}

export default page;
