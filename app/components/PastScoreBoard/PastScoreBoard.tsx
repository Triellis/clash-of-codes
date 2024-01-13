import { ReceivedPastScore } from "@/app/util/types";
import { Divider } from "@chakra-ui/react";
import Leaderboard from "../Leaderboard/Leaderboard";
import styles from "./PastScoreBoard.module.css";

export default function PastScoreBoard({
	boardData,
}: {
	boardData: ReceivedPastScore;
}) {
	const date = new Date(boardData.dateAdded).toLocaleDateString(["en-GB"], {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	});

	return (
		<div className={styles.board}>
			<div className={styles.date} >{date}</div>
			<Divider />
			<Leaderboard mode="Past" fetchedData={boardData} />
		</div>
	);
}
