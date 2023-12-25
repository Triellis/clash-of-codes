"use client";
import React, { useEffect, useMemo, useState } from "react";
import Leaderboard from "../components/Leaderboard/Leaderboard";
import TabsComponent from "../components/TabsComponent";
import Live from "../styles/Icons/Live";
import { LiveLeaderboard, TabsType } from "../util/types";
import styles from "./Live.module.css";
import { fullForm } from "../util/functions";

const WebSocketComponent = () => {
	const [leaderboardArr, setLeaderboardArr] = useState<LiveLeaderboard>([]);
	const [tabIndex, setTabIndex] = useState(0);
	const tabs = leaderboardArr.map((item, idx) => {
		const teams = Object.keys(item);
		const team1 = teams[0];
		const team2 = teams[1];
		const team1Full = fullForm(team1).split(" ")[1];
		const team2Full = fullForm(team2).split(" ")[1];
		const joint = `${team1Full} vs ${team2Full}`;
		return { label: joint, value: joint, index: idx };
	});

	const [tab, setTab] = useState<string>("");

	useEffect(() => {
		console.log(tab);
		tabs.forEach((t) => {
			if (t.value === tab) {
				setTabIndex(t.index);
			}
		});
	}, [tab]);
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

			<Leaderboard fetchedData={leaderboardArr[tabIndex]} />
		</div>
	);
};

export default WebSocketComponent;
