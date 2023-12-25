import Live from "@/app/styles/Icons/Live";
import { fullForm } from "@/app/util/functions";
import { Clan, LiveBoardTeam, TabsType } from "@/app/util/types";
import { Center, Heading, transition } from "@chakra-ui/react";
import classNames from "classnames";
import { useMemo, useState } from "react";
import MotionDiv from "../MotionDiv/MotionDiv";
import SpecialTxt from "../SpecialTxt";
import TabsComponent from "../TabsComponent/TabsComponent";
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
				<SpecialTxt>{score1}</SpecialTxt>
				<SpecialTxt> - </SpecialTxt>
				<SpecialTxt>{score2}</SpecialTxt>
			</div>
		</div>
	);
}

function LeaderboardEntry({
	props,
	entry,
	animation,
}: {
	props: any;
	entry: any;
	animation?: any;
}) {
	// going up transition:
	const transition = {
		type: "spring",
		stiffness: 260,
		damping: 20,
	};

	return (
		<MotionDiv {...props} transition={transition} animate={animation}>
			<div className={styles.name}>{entry.name}</div>
			<SpecialTxt className={styles.points}>{entry.points}</SpecialTxt>
			<SpecialTxt className={styles.death}>{entry.penalty}</SpecialTxt>
		</MotionDiv>
	);
}

export default function Leaderboard({
	fetchedData,
	oldData,
}: {
	fetchedData: LiveBoardTeam;
	oldData: LiveBoardTeam;
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

	const goUpAnimation = {
		scale: [1, 1.5, 1],
		y: [0, -100],
	};

	const goDownAnimation = {
		scale: [1, 0.5, 1],
		y: [0, 100],
	};

	if (leftClan) {
		entries1 = leftClan.map((entry, index) => {
			let animation;
			if (oldData) {
				const diff = oldData[leftClanName][index].rank - entry.rank;
				if (diff > 0) {
					animation = goUpAnimation;
				} else if (diff < 0) {
					animation = goDownAnimation;
				}
			}
			return (
				<LeaderboardEntry
					animation={animation}
					props={{ className: styles.tableEntry }}
					entry={entry}
					key={index}
				/>
			);
		});
	}

	if (rightClan) {
		entries2 = rightClan.map((entry, index) => {
			let animation;

			if (oldData) {
				let oldRank;
				for (let i = 0; i < oldData[rightClanName].length; i++) {
					if (oldData[rightClanName][i].name === entry.name) {
						oldRank = oldData[rightClanName][i].rank;
						break;
					}
				}
				const diff = oldRank - entry.rank;

				console.log(diff);
				if (diff > 0) {
					animation = goUpAnimation;
				} else if (diff < 0) {
					animation = goDownAnimation;
				}
				console.log(animation);
			}
			return (
				<LeaderboardEntry
					props={{
						className: classNames(
							styles.tableEntry,
							styles.tableEntryRight
						),
					}}
					animation={animation}
					entry={entry}
					key={index}
				/>
			);
		});
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
					<div className={styles.tableHeader}>
						<div>name</div>
						<div className={styles.points}>#</div>
						<div className={styles.death}>Penalty</div>
					</div>

					{entries1}

					<div className={styles.tableEntry}>
						<SpecialTxt>Total</SpecialTxt>
						<SpecialTxt className={styles.points}>
							{score1}
						</SpecialTxt>
						<SpecialTxt className={styles.death}>
							{penalty1}
						</SpecialTxt>
					</div>
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
						<div className={styles.points}>#</div>
						<div>name</div>
					</div>

					{entries2}

					<div
						className={classNames(
							styles.tableEntry,
							styles.tableEntryRight
						)}
					>
						<SpecialTxt flex={"2"}>Total</SpecialTxt>
						<SpecialTxt className={styles.points}>
							{score2}
						</SpecialTxt>
						<SpecialTxt className={styles.death}>
							{penalty2}
						</SpecialTxt>
					</div>
				</div>
			</div>
		</div>
	);
}
