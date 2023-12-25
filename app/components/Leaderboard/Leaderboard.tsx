import Live from "@/app/styles/Icons/Live";
import { Clan, LiveBoardTeam, TabsType } from "@/app/util/types";
import { Center, Heading } from "@chakra-ui/react";
import classNames from "classnames";
import { useMemo, useState } from "react";
import SpecialTxt from "../SpecialTxt";
import TabsComponent from "../TabsComponent/TabsComponent";
import styles from "./Leaderboard.module.css";
import { fullForm } from "@/app/util/functions";

function Scorecard({
	team1,
	team2,
	score1,
	score2,
}: {
	team1: Clan;
	team2: Clan;
	score1: number;
	score2: number;
}) {
	const team1Full = fullForm(team1);
	const team2Full = fullForm(team2);

	return (
		<div className={styles.mainScore}>
			<div className={styles.title}>
				<SpecialTxt>{team1Full} </SpecialTxt>
				<span className={classNames("logo", styles.logo)}>VS</span>
				<SpecialTxt> {team2Full}</SpecialTxt>
			</div>

			<div className={styles.score}>
				<SpecialTxt>{score1}</SpecialTxt>
				<SpecialTxt> - </SpecialTxt>
				<SpecialTxt>{score2}</SpecialTxt>
			</div>
		</div>
	);
}

export default function Leaderboard({
	fetchedData,
}: {
	fetchedData: LiveBoardTeam;
}) {
	if (!fetchedData) return <Center pt={"100px"}>Loading...</Center>;
	const clans = Object.keys(fetchedData);

	// console.log(fetchedData);

	// Remove unused variables
	const leftClanName = clans[0] as Clan;
	const rightClanName = clans[1] as Clan;

	const leftClan = fetchedData[leftClanName];
	const rightClan = fetchedData[rightClanName];

	let score1 = 0;
	let score2 = 0;
	leftClan.forEach((entry) => {
		score1 += entry.points;
	});
	rightClan.forEach((entry) => {
		score2 += entry.points;
	});

	// console.log("leftClan", leftClan);
	// console.log("rightClan", rightClan);

	let entries1;
	let entries2;

	if (leftClan) {
		entries1 = leftClan.map((entry, index) => {
			return (
				<div className={styles.tableEntry} key={index}>
					<div className={styles.name}>{entry.name}</div>
					<SpecialTxt>{entry.points}</SpecialTxt>
					<SpecialTxt className={styles.death}>
						{entry.penalty}
					</SpecialTxt>
				</div>
			);
		});
	}

	if (rightClan) {
		entries2 = rightClan.map((entry, index) => {
			return (
				<div
					className={classNames(
						styles.tableEntry,
						styles.tableEntryRight
					)}
					key={index}
				>
					<div className={styles.name}>{entry.name}</div>
					<SpecialTxt>{entry.points}</SpecialTxt>
					<SpecialTxt className={styles.death}>
						{entry.penalty}
					</SpecialTxt>
				</div>
			);
		});
	}

	return (
		<div className={styles.main}>
			<Scorecard
				team1={leftClanName}
				team2={rightClanName}
				score1={score1}
				score2={score2}
			/>

			<div className={styles.board}>
				{/* sb1 */}
				<div className={classNames(styles.sb1, styles[leftClanName])}>
					<div className={styles.tableHeader}>
						<div>name</div>
						<div>#</div>
						<div className={styles.death}>Penalty</div>
					</div>

					{entries1}
				</div>

				{/* sb2 */}
				<div className={classNames(styles.sb2, styles[rightClanName])}>
					<div
						className={classNames(
							styles.tableHeader,
							styles.tableHeaderRight
						)}
					>
						<div className={styles.death}>Penalty</div>
						<div>#</div>
						<div>name</div>
					</div>

					{entries2}
				</div>
			</div>
		</div>
	);
}
