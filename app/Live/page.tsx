"use client";
import React, { useEffect, useMemo, useState } from "react";
import Leaderboard from "../components/Leaderboard/Leaderboard";
import TabsComponent from "../components/TabsComponent";
import Live from "../styles/Icons/Live";
import { TabsType } from "../util/types";
import styles from "./Live.module.css";

const WebSocketComponent = () => {
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

  const [message, setMessage] = useState("");
  const [leaderboardArr, setLeaderboardArr] = useState([]);
  useEffect(() => {
    // Establish WebSocket connection
    const ws = new WebSocket("ws://localhost:3001");

    // Set up event listeners
    ws.addEventListener("open", () => {
      console.log("WebSocket connection opened");
    });

    ws.addEventListener("message", (event) => {
      const receivedMessage = JSON.parse(event.data);
      setLeaderboardArr(receivedMessage);
    });

    ws.addEventListener("close", () => {
      console.log("WebSocket connection closed");
    });

    // Save the WebSocket instance in state

    // console.log(ws);
    // Clean up the WebSocket on component unmount
    return () => {
      ws.close();
    };
  }, []); // Empty dependency array means this effect runs once on mount\

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

      <Leaderboard fetchedData={leaderboardArr[0]} />
    </div>
  );
};

export default WebSocketComponent;
