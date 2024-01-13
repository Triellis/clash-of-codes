import { fullForm } from "@/app/util/functions";
import { Clan, LiveBoardTeam, Side } from "@/app/util/types";
import { Center } from "@chakra-ui/react";
import classNames from "classnames";

import Counter from "../Counter/Counter";

import SpecialTxt from "../SpecialTxt";

import styles from "./Leaderboard.module.css";

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
	const team1Full = fullForm(team1).split(" ");
	const team2Full = fullForm(team2).split(" ");

	return (
		<div className={styles.mainScore}>
			<div className={styles.mainScoreTitle}>
				<div className={styles.teamNameWrapper}>
					{team1Full.map((word, index) => {
						return <SpecialTxt key={index}>{word}</SpecialTxt>;
					})}
				</div>
				<span className={classNames("logo", styles.logo)}>VS</span>
				<div className={styles.teamNameWrapper}>
					{team2Full.map((word, index) => {
						return <SpecialTxt key={index}>{word}</SpecialTxt>;
					})}
				</div>
			</div>

			<div className={styles.score}>
				<Counter startNumber={score1} />

				<div>
					<SpecialTxt> - </SpecialTxt>
				</div>

				<Counter startNumber={score2} />
			</div>
		</div>
	);
}

function LeaderboardEntry({ side, entry }: { side: Side; entry: any }) {
	return (
		<div
			className={classNames(
				styles.tableEntry,
				side == "RightSide" ? styles.tableEntryRight : ""
			)}
		>
			<div className={styles.name}>{entry.name}</div>
			<SpecialTxt className={styles.points}>{entry.points}</SpecialTxt>
			<SpecialTxt className={styles.death}>{entry.penalty}</SpecialTxt>
		</div>
	);
}
function LeaderboardEntryFooter({
	totalScore,
	totalPenalty,
	side,
}: {
	totalScore: number;
	totalPenalty: number;
	side: Side;
}) {
	return (
		<div
			className={classNames(
				styles.tableEntry,
				side == "RightSide" ? styles.tableEntryRight : ""
			)}
		>
			<SpecialTxt flex={"2"}>Total</SpecialTxt>
			<SpecialTxt className={styles.points}>{totalScore}</SpecialTxt>
			<SpecialTxt className={styles.death}>{totalPenalty}</SpecialTxt>
		</div>
	);
}

function LeaderboardEntryHeader({ side }: { side: Side }) {
	return (
		<div
			className={classNames(
				styles.tableHeader,

				side == "RightSide" ? styles.tableHeaderRight : ""
			)}
		>
			<div>name</div>
			<div className={styles.points}>#</div>
			<div className={styles.death}>Penalty</div>
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

	const leftClanName = clans[0] as Clan;
	const rightClanName = clans[1] as Clan;

	const leftClan = fetchedData[leftClanName];
	const rightClan = fetchedData[rightClanName];

	let score1 = 0;
	let score2 = 0;
	let penalty1 = 0;
	let penalty2 = 0;

	leftClan.forEach((entry) => {
		score1 += entry.points;
		penalty1 += entry.penalty;
	});
	rightClan.forEach((entry) => {
		score2 += entry.points;
		penalty2 += entry.penalty;
	});

	let entries1;
	let entries2;

	if (leftClan) {
		entries1 = leftClan.map((entry, index) => (
			<LeaderboardEntry side="LeftSide" entry={entry} key={index} />
		));
	}

	if (rightClan) {
		entries2 = rightClan.map((entry, index) => (
			<LeaderboardEntry side="RightSide" entry={entry} key={index} />
		));
	}

	return (
		<div className={styles.main}>
			<Center>
				<Scorecard
					team1={leftClanName}
					team2={rightClanName}
					score1={score1}
					score2={score2}
				/>
			</Center>

			<div className={styles.board}>
				{/* sb1 */}
				<div className={classNames(styles.sb1, styles[leftClanName])}>
					<LeaderboardEntryHeader side="LeftSide" />

					{entries1}

					<LeaderboardEntryFooter
						totalPenalty={penalty1}
						totalScore={score1}
						side="LeftSide"
					/>
				</div>

				{/* sb2 */}
				<div className={classNames(styles.sb2, styles[rightClanName])}>
					<LeaderboardEntryHeader side="RightSide" />
					{entries2}
					<LeaderboardEntryFooter
						totalPenalty={penalty2}
						totalScore={score2}
						side="RightSide"
					/>
				</div>
			</div>
		</div>
	);
}
