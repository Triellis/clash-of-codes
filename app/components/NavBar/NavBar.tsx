import { Flex } from "@chakra-ui/react";
import Logo from "../Logo/Logo";
import NavItem from "../NavItem/NavItem";
import styles from "./NavBar.module.css";
import LoginBtn from "../LoginBtn/LoginBtn";
import { Box } from "@chakra-ui/react";
import Image from "next/image";
import MenuIcon from "../../styles/Icons/Menu";
import CloseIcon from "../../styles/Icons/Close";
import classNames from "classnames";
export default function NavBar({
	isOpen = false,
	setIsOpen,
}: {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	return (
		<nav className={styles.NavBar}>
			{isOpen ? (
				<CloseIcon
					className={styles.menuIcon}
					onClick={() => setIsOpen(!isOpen)}
				/>
			) : (
				<MenuIcon
					className={styles.menuIcon}
					onClick={() => setIsOpen(!isOpen)}
				/>
			)}

			<Logo />
			<div
				className={classNames(
					styles.navItemsWrapper,
					!isOpen && styles.close
				)}
			>
				<NavItem isOpen={true} title="Live" linkTo="/" />
				<NavItem isOpen={false} title="Past Scores" linkTo="/" />
				<NavItem isOpen={false} title="option1" linkTo="/" />
			</div>

			<LoginBtn />
		</nav>
	);
}
