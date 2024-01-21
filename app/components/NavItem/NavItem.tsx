import { Text } from "@chakra-ui/react";
import styles from "./NavItem.module.css";

import * as React from "react";
import Link from "next/link";

export default function NavItem({
	title,
	isOpen,
	linkTo,
	setIsOpen,
}: {
	title: string;
	isOpen: boolean;
	linkTo: string;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	return (
		<Link
			href={linkTo}
			onClick={() => setIsOpen(false)}
			className={`${styles.navItem} ${isOpen ? styles.open : ""}`}
		>
			{title}
		</Link>
	);
}
