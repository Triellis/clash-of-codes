import Live from "@/app/styles/Icons/Live";
import { Clan, LiveBoardTeam, TabsType } from "@/app/util/types";
import { Center, Heading } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import SpecialTxt from "../SpecialTxt";
import TabsComponent from "../TabsComponent/TabsComponent";
import styles from "./Leaderboard.module.css";

function Scorecard() {
  const team1 = "Purple Pekkas";
  const team2 = "Red Giants";

  const score1 = 5;
  const score2 = 3;

  return (
    <div className={styles.mainScore}>
      <div className={styles.title}>
        <SpecialTxt>{team1} </SpecialTxt>
        <span className="logo">VS</span>
        <SpecialTxt> {team2}</SpecialTxt>
      </div>

      <div className={styles.score}>
        <SpecialTxt>{score1}</SpecialTxt>
        <SpecialTxt> - </SpecialTxt>
        <SpecialTxt>{score2}</SpecialTxt>
      </div>
    </div>
  );
}

export default function Leaderboard({
  fetchedData,
}: {
  fetchedData: LiveBoardTeam;
}) {
  if (!fetchedData) return <Center>Loading...</Center>;
  const clans = Object.keys(fetchedData);

  console.log(fetchedData);

  // Remove unused variables
  // const leftClan = fetchedData[clans[0] as Clan];
  // const rightClan = fetchedData[clans[1] as Clan];

  return (
    <div className={styles.main}>
      <div className={styles.board}>
        <Scorecard />
      </div>
    </div>
  );
}
