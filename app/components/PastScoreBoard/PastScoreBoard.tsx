import { ReceivedPastScore } from "@/app/util/types";
import styles from "./PastScoreBoard.module.css";
import Leaderboard from "../Leaderboard/Leaderboard";
import { Divider } from "@chakra-ui/react";

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
			{date}
			<Divider />
			<Leaderboard mode="Past" fetchedData={boardData} />
		</div>
	);
}
