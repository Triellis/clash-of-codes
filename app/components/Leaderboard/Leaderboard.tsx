import Live from "@/app/styles/Icons/Live";
import { Clan, LiveBoardTeam, TabsType } from "@/app/util/types";
import { Center, Heading } from "@chakra-ui/react";
import classNames from "classnames";
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
        <span className={classNames("logo", styles.logo)}>VS</span>
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

  // console.log(fetchedData);

  // Remove unused variables
  const leftClan = fetchedData[clans[0] as Clan];
  const rightClan = fetchedData[clans[1] as Clan];

  console.log("leftClan", leftClan);
  console.log("rightClan", rightClan);

  let entries1;
  let entries2;

  if (leftClan) {
    entries1 = leftClan.map((entry, index) => {
      return (
        <div className={styles.entry1} key={index}>
          <div>{entry.name}</div>
          <SpecialTxt>{entry.points}</SpecialTxt>
          <div className={styles.death}>{entry.penalty}</div>
        </div>
      );
    });
  }

  if (rightClan) {
    entries2 = rightClan.map((entry, index) => {
      return (
        <div className={styles.entry2} key={index}>
          <div className={styles.death}>{entry.penalty}</div>
          <SpecialTxt>{entry.points}</SpecialTxt>
          <div>{entry.name}</div>
        </div>
      );
    });
  }

  return (
    <div className={styles.main}>
      <Scorecard />

      <div className={styles.board}>
        {/* sb1 */}
        <div className={styles.sb1}>
          <div className={styles.header1}>
            <div>#</div>
            <div className={styles.death}>Penalty</div>
          </div>

          {entries1}
        </div>

        {/* sb2 */}
        <div className={styles.sb2}>
          <div className={styles.header2}>
            <div className={styles.death}>Penalty</div>
            <div>#</div>
          </div>

          {entries2}
        </div>
      </div>
    </div>
  );
}
