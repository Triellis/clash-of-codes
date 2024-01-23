"use client";
import { Button } from "@chakra-ui/react";
import React, { use, useEffect, useState } from "react";
import Counter from "../components/Counter/Counter";
import styles from "./page.module.css";

function timeDec({
	mins,
	hrs,
	sec,
	setMin,
	setHrs,
	setSec,
}: {
	mins: number;
	hrs: number;
	sec: number;
	setMin: any;
	setHrs: any;
	setSec: any;
}) {
	if (sec === 0) {
		if (mins === 0) {
			if (hrs === 0) {
				// Timer is already at zero, do nothing
				return;
			}

			// Decrement hours and set minutes to 59
			hrs--;
			setHrs(hrs);
			setMin(59);
		} else {
			// Decrement minutes and set seconds to 59
			mins--;
			setMin(mins);
			setSec(59);
		}
	} else {
		// Decrement seconds
		sec--;
		setSec(sec);
	}
}

export default function Test() {
	const [hrs, setHrs] = useState(1);
	const [mins, setMins] = useState(30);
	const [sec, setSec] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			timeDec({ mins, hrs, sec, setMin: setMins, setHrs, setSec });
		}, 1000);
		return () => clearInterval(timer);
	}, [mins, hrs, sec]);

	return (
		<main className={styles.main}>
			<Counter startNumber={hrs} />
			{":"}
			<Counter startNumber={mins} />
			{":"}
			<Counter startNumber={sec} />

			<Button>+</Button>
		</main>
	);
}
