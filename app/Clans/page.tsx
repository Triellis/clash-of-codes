"use client";
import { Center } from "@chakra-ui/react";
import ClanCard from "../components/ClanCard/ClanCard";
import { useClans } from "../util/functions";
import { ClanData } from "../util/types";
import styles from "./Clans.module.css";

export default function Clans() {
	const { clans, isError, isLoading, mutate } = useClans();
	if (isLoading) return <div className={styles.wrapper}>Loading...</div>;
	if (isError) return <div className={styles.wrapper}>Error</div>;

	return (
		<div className={styles.wrapper}>
			{clans ? (
				<div className={styles.clansPage}>
					{(clans as ClanData[]).map(
						(clanObj: ClanData, rank: number) => {
							return (
								<ClanCard
									clanName={clanObj.clanName}
									key={clanObj.clanName}
									clanScore={clanObj.totalScore}
									solvedProblems={clanObj.totalProblemSolved}
									rank={rank + 1}
								/>
							);
						}
					)}
				</div>
			) : (
				<div>Something went wrong!</div>
			)}
		</div>
	);
}
