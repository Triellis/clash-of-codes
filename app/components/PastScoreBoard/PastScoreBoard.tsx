import { ReceivedPastScore } from "@/app/util/types";
import styles from "./PastScoreBoard.module.css";
import Leaderboard from "../Leaderboard/Leaderboard";

export default function PastScoreBoard({
	boardData,
}: {
	boardData: ReceivedPastScore;
}) {
	return (
		// <div className={styles.board}>
		<Leaderboard mode="Past" fetchedData={boardData} />
		// </div>
	);
}
