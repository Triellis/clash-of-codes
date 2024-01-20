"use client";
import styles from "./Clans.module.css";
import ClanCard from "../components/ClanCard/ClanCard";
import { useClans } from "../util/functions";

export default function Clans() {
	const { clans, isError, isLoading, mutate } = useClans();
	if (isLoading) return <div className={styles.wrapper}>Loading...</div>;
	if (isError) return <div className={styles.wrapper}>Error</div>;

	return (
		<div className={styles.wrapper}>
			<div className={styles.clansPage}>
				{clans.map((clanObj, rank) => {
					return (
						<ClanCard
							clanName={clanObj.clanName}
							key={clanObj.clanName}
							clanScore={clanObj.totalScore}
							solvedProblems={clanObj.totalProblemSolved}
							rank={rank + 1}
						/>
					);
				})}
			</div>
		</div>
	);
}
