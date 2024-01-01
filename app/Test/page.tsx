"use client";

import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import Counter from "../components/Counter/Counter";
import Logo from "../components/Logo/Logo";
import NavBar from "../components/NavBar/NavBar";
import NavItem from "../components/NavItem/NavItem";
import { customFetch, getServerUrl, getUserData } from "../util/functions";
import styles from "./page.module.css";

export default function Test() {
	const [number, setNumber] = useState(1);
	return (
		<main className={styles.main}>
			<Counter setNumber={setNumber} startNumber={number} />
		</main>
	);
}
