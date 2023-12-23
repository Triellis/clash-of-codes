"use client";
import React, { useEffect, useState } from "react";
import Leaderboard from "../components/Leaderboard/Leaderboard";

const WebSocketComponent = () => {
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
	}, []); // Empty dependency array means this effect runs once on mount

	return ( 	
		<div>
			<Leaderboard fetchedData={leaderboardArr[0]} />
		</div>
	);
};

export default WebSocketComponent;
