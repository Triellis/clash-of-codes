import { fullForm } from "@/app/util/functions";
import {
	CFAPIResponse,
	CFAPIResponseWithRating,
	Clan,
	LiveBoardTeam,
	ProcessedRatingData,
	ReceivedPastScore,
	Side,
} from "@/app/util/types";
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
	mode,
}: {
	team1: Clan;
	team2: Clan;
	score1: number;
	score2: number;
	mode: "Live" | "Past";
}) {
	const team1Full = fullForm(team1).split(" ");
	const team2Full = fullForm(team2).split(" ");

	return (
		<div className={styles.mainScore}>
			<div className={styles.mainScoreTitle}>
				<div className={styles.teamNameWrapper}>
					<div
						className={
							mode === "Past" && score1 >= score2
								? styles.winner
								: ""
						}
					>
						{team1Full.map((word, index) => {
							return <SpecialTxt key={index}>{word}</SpecialTxt>;
						})}
					</div>
				</div>
				<span className={classNames("logo", styles.logo)}>VS</span>
				<div className={styles.teamNameWrapper}>
					<div
						className={
							mode === "Past" && score2 >= score1
								? styles.winner
								: ""
						}
					>
						{team2Full.map((word, index) => {
							return <SpecialTxt key={index}>{word}</SpecialTxt>;
						})}
					</div>
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

function LeaderboardEntry({
	side,
	entry,
	mode = "Live",
	index,
}: {
	side: Side;
	entry: any;
	mode?: "Live" | "Past";
	index: number;
}) {
	return (
		<div
			className={classNames(
				index == 0 ? styles.best : "",
				styles.tableEntry,
				side == "RightSide" ? styles.tableEntryRight : ""
			)}
		>
			<div className={styles.name}>{entry.name}</div>
			{mode == "Live" ? (
				<>
					<SpecialTxt className={styles.points}>
						{entry.points}
					</SpecialTxt>
					<SpecialTxt className={styles.death}>
						{entry.penalty}
					</SpecialTxt>
				</>
			) : (
				<>
					<SpecialTxt className={styles.points}>
						{entry.points}
					</SpecialTxt>
					<div className={styles.rating}>
						<SpecialTxt>{entry.rating}</SpecialTxt>
					</div>
				</>
			)}
		</div>
	);
}
function LeaderboardEntryFooter({
	totalPoints,
	totalScore,
	side,
	mode = "Live",
}: {
	totalScore: number;
	totalPoints: number;

	side: Side;
	mode?: "Live" | "Past";
}) {
	return (
		<div
			className={classNames(
				styles.tableEntry,
				side == "RightSide" ? styles.tableEntryRight : ""
			)}
		>
			<SpecialTxt flex={"2"}>Total</SpecialTxt>
			{mode == "Live" ? (
				<>
					<SpecialTxt className={styles.points}>
						{totalPoints}
					</SpecialTxt>
					<div className={styles.death}>{totalScore}</div>
				</>
			) : (
				<>
					<div className={styles.points}>
						<SpecialTxt>{totalPoints}</SpecialTxt>
					</div>
					<div className={styles.rating}>
						<SpecialTxt>{totalScore}</SpecialTxt>
					</div>
				</>
			)}
		</div>
	);
}

function LeaderboardEntryHeader({
	side,
	mode = "Live",
}: {
	side: Side;
	mode?: "Live" | "Past";
}) {
	return (
		<div
			className={classNames(
				styles.tableHeader,

				side == "RightSide" ? styles.tableHeaderRight : ""
			)}
		>
			<div>name</div>
			{mode == "Live" ? (
				<>
					<div className={styles.points}>#</div>
					<div className={styles.death}>Penalty</div>
				</>
			) : (
				<>
					<div className={styles.points}>#</div>
					<div className={styles.rating}>
						<SpecialTxt>Score</SpecialTxt>
					</div>
				</>
			)}
		</div>
	);
}

type BoardProps = {
	fetchedData: any;
	mode: "Live" | "Past";
};

export default function Leaderboard({ fetchedData, mode }: BoardProps) {
	if (!fetchedData) return <Center pt={"100px"}>Loading...</Center>;

	let clans = Object.keys(fetchedData);

	clans = clans.filter((clan) => clan !== "dateAdded");
	clans = clans.sort((a, b) => a.localeCompare(b));

	const leftClanName = clans[0] as Clan;
	const rightClanName = clans[1] as Clan;

	const leftClan = fetchedData[leftClanName];
	const rightClan = fetchedData[rightClanName];

	let rating1 = 0;
	let rating2 = 0;
	let points1 = 0;
	let points2 = 0;

	if (mode == "Past") {
		leftClan?.forEach((entry: CFAPIResponseWithRating) => {
			rating1 += entry.rating;
			points1 += entry.points;
		});
		rightClan?.forEach((entry: CFAPIResponseWithRating) => {
			rating2 += entry.rating;
			points2 += entry.points;
		});
	} else {
		leftClan?.forEach((entry: CFAPIResponse) => {
			rating1 += entry.penalty;
			points1 += entry.points;
		});
		rightClan?.forEach((entry: CFAPIResponse) => {
			rating2 += entry.penalty;
			points2 += entry.points;
		});
	}

	rating1 = Math.round(rating1 * 100) / 100;
	rating2 = Math.round(rating2 * 100) / 100;

	let entries1;
	let entries2;

	if (leftClan) {
		entries1 = leftClan.map((entry: any, index: any) => (
			<LeaderboardEntry
				side="LeftSide"
				entry={entry}
				key={index}
				mode={mode}
				index={index}
			/>
		));
	}

	if (rightClan) {
		entries2 = rightClan.map((entry: any, index: any) => (
			<LeaderboardEntry
				side="RightSide"
				entry={entry}
				key={index}
				mode={mode}
				index={index}
			/>
		));
	}

	return (
		<div className={styles.main}>
			<Center>
				<Scorecard
					team1={leftClanName}
					team2={rightClanName}
					score1={points1}
					score2={points2}
					mode={mode}
				/>
			</Center>

			<div className={styles.board}>
				{/* sb1 */}
				<div className={classNames(styles.sb1, styles[leftClanName])}>
					<LeaderboardEntryHeader mode={mode} side="LeftSide" />

					{entries1}

					<LeaderboardEntryFooter
						totalScore={rating1}
						side="LeftSide"
						mode={mode}
						totalPoints={points1}
					/>
				</div>

				{/* sb2 */}
				<div className={classNames(styles.sb2, styles[rightClanName])}>
					<LeaderboardEntryHeader mode={mode} side="RightSide" />
					{entries2}
					<LeaderboardEntryFooter
						totalPoints={points2}
						totalScore={rating2}
						side="RightSide"
						mode={mode}
					/>
				</div>
			</div>
		</div>
	);
}
