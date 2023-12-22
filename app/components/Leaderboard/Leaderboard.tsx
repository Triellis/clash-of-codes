import { Clan, LiveBoardTeam, LiveLeaderboard } from "@/app/util/types";
import styles from "./Leaderboard.module.css";
export default function Leaderboard({
	fetchedData,
}: {
	fetchedData: LiveBoardTeam;
}) {
	if (!fetchedData) return <div>Loading...</div>;
	const clans = Object.keys(fetchedData);

	const leftClan = fetchedData[clans[0] as Clan];
	const rightClan = fetchedData[clans[1] as Clan];

	return (
		<div className={styles.wrapper}>
			<div>{leftClan.map((a) => JSON.stringify(a))}</div>
			<div>{rightClan.map((a) => JSON.stringify(a))}</div>
		</div>
	);
}
