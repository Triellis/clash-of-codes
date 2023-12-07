import Logo from "../components/Logo/Logo";
import NavBar from "../components/NavBar/NavBar";
import NavItem from "../components/NavItem/NavItem";
import styles from "./page.module.css";
import { Flex } from "@chakra-ui/react";
export default function Tet() {
	return (
		<main className={styles.main}>
			<NavBar />
		</main>
	);
}
