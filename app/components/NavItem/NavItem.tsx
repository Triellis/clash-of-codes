import { Text } from "@chakra-ui/react";
import styles from "./NavItem.module.css";

import * as React from "react";
import Link from "next/link";

export default function NavItem({
	title,
	isOpen,
	linkTo,
}: {
	title: string;
	isOpen: boolean;
	linkTo: string;
}) {
	return (
		<Link
			href={linkTo}
			className={`${styles.navItem} ${isOpen ? styles.open : ""}`}
		>
			{title}
		</Link>
	);
}
