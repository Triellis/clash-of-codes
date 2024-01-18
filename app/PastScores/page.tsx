"use client";

import { Button, Divider } from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";
import Leaderboard from "../components/Leaderboard/Leaderboard";
import Pagination from "../components/Pagination/Pagination";
import PastScoreBoard from "../components/PastScoreBoard/PastScoreBoard";
import { usePastScores } from "../util/functions";
import styles from "./PastScores.module.css";

export default function PastScores() {
	const [page, setPage] = useState(1);
	const maxResults = 5;
	const pastScores = usePastScores(page, maxResults);
	if (pastScores.isLoading) {
		return <div className={styles.main}>Loading...</div>;
	}
	if (pastScores.isError) {
		return <div className={styles.main}>Error</div>;
	}

	if (pastScores.data.length == 0) {
		return (
			<div className={styles.main}>
				No Past Scores
				<Pagination
					page={page}
					setPage={setPage}
					items={pastScores.data}
					maxResults={maxResults}
				/>
			</div>
		);
	}

	return (
		<div className={styles.main}>
			{pastScores.data.map((d, index) => {
				return <PastScoreBoard boardData={d} key={index} />;
			})}
			<Pagination
				page={page}
				setPage={setPage}
				items={pastScores.data}
				maxResults={maxResults}
			/>
		</div>
	);
}
