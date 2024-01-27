import { Link, Divider, Center } from "@chakra-ui/react";
import SpecialTxt from "../SpecialTxt/SpecialTxt";
import styles from "./ClanMemberItem.module.css";

export default function ClanMemberItem({
	rank,
	name,
	role,
	score,
	problemsSolved,
	cfUsername,
}: {
	rank: number;
	name: string;
	role: string;
	score: number;
	problemsSolved: number;
	cfUsername: string;
}) {
	return (
		<div className={styles.clanMemberItem}>
			<div className={styles.rank}>
				<SpecialTxt>#{rank}</SpecialTxt>
			</div>
			<div>
				<div className={styles.name}>{name}</div>
				<div className={styles.role}>{role}</div>
			</div>
			<div className={styles.divider} />
			<Link
				className={styles.cfUsername}
				href={`https://codeforces.com/profile/${cfUsername}`}
				target="_blank"
			>
				{cfUsername}
			</Link>

			<div className={styles.smallTextWrapper}>
				<div className={styles.smallText}>Score</div>
				<div className={styles.score}>
					<SpecialTxt>{Math.round(score)}</SpecialTxt>
				</div>
			</div>
			<div className={styles.smallTextWrapper}>
				<div className={styles.smallText}>Solved</div>
				<div className={styles.problemSolved}>
					<SpecialTxt>{problemsSolved}</SpecialTxt>
				</div>
			</div>
		</div>
	);
}
