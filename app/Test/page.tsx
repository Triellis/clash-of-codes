"use client";

import { Button, Flex, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import Counter from "../components/Counter/Counter";

import styles from "./page.module.css";

export default function Test() {
	const [number, setNumber] = useState(1);
	const [number2, setNumber2] = useState(1);
	return (
		<main className={styles.main}>
			<Counter startNumber={number} />
			<Input
				type="number"
				onChange={(e) => setNumber2(Number(e.target.value))}
			/>
			<Button
				onClick={(e) => {
					setNumber(number2);
				}}
			>
				+
			</Button>
		</main>
	);
}
