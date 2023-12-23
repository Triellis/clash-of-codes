import Live from "@/app/styles/Icons/Live";
import { Clan, LiveBoardTeam, LiveLeaderboard } from "@/app/util/types";
import { Heading } from "@chakra-ui/react";
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

  /* <div>{leftClan.map((a) => JSON.stringify(a))}</div> 
   <div>{rightClan.map((a) => JSON.stringify(a))}</div> */

  return (
    <div className={styles.main}>
      <div className={styles.heading}>
        <Live />
        Live Score Board
      </div>
    </div>
  );
}
