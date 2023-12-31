"use client";

import React, { useState } from "react";
import Logo from "../components/Logo/Logo";
import NavBar from "../components/NavBar/NavBar";
import NavItem from "../components/NavItem/NavItem";
import styles from "./page.module.css";
import { Flex } from "@chakra-ui/react";
import { customFetch, getServerUrl, getUserData } from "../util/functions";
import Counter from "../components/Counter";

export default function Test() {
	const [number, setNumber] = useState(1);
	return (
		<main className={styles.main}>
			<Counter setNumber={setNumber} startNumber={number} />
		</main>
	);
}
