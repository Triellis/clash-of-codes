import Live from "@/app/styles/Icons/Live";
import { Clan, LiveBoardTeam, TabsType } from "@/app/util/types";
import { Center, Heading } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import TabsComponent from "../TabsComponent/TabsComponent";
import styles from "./Leaderboard.module.css";
import SpecialTxt from "../SpecialTxt";

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
  const tabs: TabsType = useMemo(
    () => [
      { label: "match1", value: "All" },
      { label: "match2", value: "Student" },
      { label: "match3", value: "Faculty" },
      { label: "match4", value: "Admin" },
    ],
    []
  );

  const [tab, setTab] = useState<string>(tabs[0].value);

  if (!fetchedData) return <Center>Loading...</Center>;
  const clans = Object.keys(fetchedData);

  console.log(fetchedData);

  // Remove unused variables
  // const leftClan = fetchedData[clans[0] as Clan];
  // const rightClan = fetchedData[clans[1] as Clan];

  return (
    <div className={styles.main}>
      <div className={styles.heading}>
        <Live />
        Live Score Board
      </div>

      <TabsComponent
        tab={tab} // Pass the 'tab' state variable
        setTab={setTab}
        allTabs={tabs}
      />

      <div className={styles.board}>
        <Scorecard />
      </div>
    </div>
  );
}
