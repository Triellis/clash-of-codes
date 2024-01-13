import { ReceivedPastScore } from "@/app/util/types";
import styles from "./PastScoreBoard.module.css";

export default function PastScoreBoard({
	boardData,
}: {
	boardData: ReceivedPastScore;
}) {
	return <div className={styles.board}>Yo</div>;
}
