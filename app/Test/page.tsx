"use client";

import { Button, Flex, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import Counter from "../components/Counter/Counter";

import styles from "./page.module.css";

export default function Test() {
	const [number, setNumber] = useState(1);

	return (
		<main className={styles.main}>
			<Counter startNumber={number} />

			<Button
				onClick={(e) => {
					setNumber(number + 1);
				}}
			>
				+
			</Button>
		</main>
	);
}
