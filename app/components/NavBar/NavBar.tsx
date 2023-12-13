import { Button, Flex } from "@chakra-ui/react";
import Logo from "../Logo/Logo";
import NavItem from "../NavItem/NavItem";
import styles from "./NavBar.module.css";

import { Box } from "@chakra-ui/react";
import Image from "next/image";
import MenuIcon from "../../styles/Icons/Menu";
import CloseIcon from "../../styles/Icons/Close";
import classNames from "classnames";
import dynamic from "next/dynamic";

const LoginBtn = dynamic(() => import("../LoginBtn/LoginBtn"), { ssr: false });
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
				<Button
					variant={"ghost"}
					className={styles.menuIcon}
					onClick={() => setIsOpen(!isOpen)}
				>
					<CloseIcon />
				</Button>
			) : (
				<Button
					className={styles.menuIcon}
					variant={"ghost"}
					onClick={() => setIsOpen(!isOpen)}
				>
					<MenuIcon onClick={() => setIsOpen(!isOpen)} />
				</Button>
			)}

			<Logo />
			<div
				className={classNames(
					styles.navItemsWrapper,
					!isOpen && styles.close
				)}
			>
				<NavItem isOpen={false} title="Live" linkTo="/" />
				<NavItem isOpen={true} title="Past Scores" linkTo="/" />
				<NavItem isOpen={false} title="option1" linkTo="/" />
			</div>

			<LoginBtn />
		</nav>
	);
}
