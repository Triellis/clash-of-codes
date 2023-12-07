import { Flex } from "@chakra-ui/react";
import Logo from "../Logo/Logo";
import NavItem from "../NavItem/NavItem";
import styles from "./NavBar.module.css";
import LoginBtn from "../LoginBtn/LoginBtn";

export default function NavBar() {
	return (
		<nav className={styles.NavBar}>
			<Logo />
			<Flex direction={{ sm: "column", md: "row" }} gap={4}>
				<NavItem isOpen={false} title="option1" linkTo="/" />
				<NavItem isOpen={true} title="option1" linkTo="/" />
				<NavItem isOpen={false} title="option1" linkTo="/" />
			</Flex>

			<LoginBtn />
		</nav>
	);
}
