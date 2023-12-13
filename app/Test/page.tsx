"use client";

import React from "react";
import Logo from "../components/Logo/Logo";
import NavBar from "../components/NavBar/NavBar";
import NavItem from "../components/NavItem/NavItem";
import styles from "./page.module.css";
import { Flex } from "@chakra-ui/react";

export default function Test() {
	const [isOpen, setIsOpen] = React.useState(false);
	return (
		<main className={styles.main}>
			<NavBar isOpen={isOpen} setIsOpen={setIsOpen} />
		</main>
	);
}
