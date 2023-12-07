import Logo from "../components/Logo/Logo";
import NavItem from "../components/NavItem/NavItem";
import styles from "./page.module.css";
import { Flex } from "@chakra-ui/react";
export default function Tet() {
	return (
		<main className={styles.main}>
			<Logo />
			<Flex direction={"column"} gap={4} padding={8}>
				<NavItem isOpen={false} title="option1" linkTo="/" />
				<NavItem isOpen={true} title="option1" linkTo="/" />
				<NavItem isOpen={false} title="option1" linkTo="/" />
			</Flex>
		</main>
	);
}
