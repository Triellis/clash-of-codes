"use client";

import { Divider } from "@chakra-ui/react";
import React, { useState } from "react";
import Leaderboard from "../components/Leaderboard/Leaderboard";
import styles from "./PastScores.module.css";
import { usePastScores } from "../util/functions";
import PastScoreBoard from "../components/PastScoreBoard/PastScoreBoard";

export default function PastScores() {
	const [page, setPage] = useState(1);
	const maxResults = 10;
	const pastScores = usePastScores(page, maxResults);
	if (pastScores.isLoading) {
		return <div className={styles.main}>Loading...</div>;
	}
	if (pastScores.isError) {
		return <div className={styles.main}>Error</div>;
	}

	return (
		<div className={styles.main}>
			{pastScores.data.map((d, index) => {
				return <PastScoreBoard boardData={d} key={index} />;
			})}
		</div>
	);
}
