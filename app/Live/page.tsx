"use client";
import React, { useEffect, useMemo, useState } from "react";
import Leaderboard from "../components/Leaderboard/Leaderboard";
import TabsComponent from "../components/TabsComponent";
import Live from "../styles/Icons/Live";
import { fullForm } from "../util/functions";
import { LiveLeaderboard, TabsType } from "../util/types";
import styles from "./Live.module.css";

const WebSocketComponent = () => {
	const [leaderboardArr, setLeaderboardArr] = useState<LiveLeaderboard>([]);

	const [tabIndex, setTabIndex] = useState(0);
	let [tabs, setTabs] = useState([
		{
			value: "Loading...",
			label: "Loading...",
			index: 0,
		},
	]);

	const [tab, setTab] = useState<string>("");

	useEffect(() => {
		tabs.forEach((t) => {
			if (t.value === tab) {
				setTabIndex(t.index);
			}
		});
	}, [tab, tabs]);
	useEffect(() => {
		const newTabs = leaderboardArr.map((item, idx) => {
			const teams = Object.keys(item);
			const team1 = teams[0];
			const team2 = teams[1];
			const team1Full = fullForm(team1).split(" ")[1];
			const team2Full = fullForm(team2).split(" ")[1];
			const joint = `${team1Full} vs ${team2Full}`;
			return { label: joint, value: joint, index: idx };
		});
		setTabs(newTabs);
	}, [leaderboardArr]);
	useEffect(() => {
		// Establish WebSocket connection
		const ws = new WebSocket("ws://localhost:3001");

		// Set up event listeners
		ws.addEventListener("open", () => {
			console.log("WebSocket connection opened");
		});

		ws.addEventListener("message", (event) => {
			try {
				const receivedMessage = JSON.parse(event.data);
				setLeaderboardArr(receivedMessage);
			} catch (err) {
				console.error(err);
			}
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

			<div className={styles.tabs}>
				<TabsComponent
					tab={tab} // Pass the 'tab' state variable
					setTab={setTab}
					allTabs={tabs}
				/>
			</div>

			<Leaderboard fetchedData={leaderboardArr[tabIndex]} />
		</div>
	);
};

export default WebSocketComponent;
