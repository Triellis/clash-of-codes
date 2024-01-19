"use client";
import { Button, Flex } from "@chakra-ui/react";
import Logo from "../Logo/Logo";
import NavItem from "../NavItem/NavItem";
import styles from "./NavBar.module.css";

import { getUserData } from "@/app/util/functions";
import classNames from "classnames";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CloseIcon from "../../styles/Icons/Close";
import MenuIcon from "../../styles/Icons/Menu";
import { useAppDispatch, useAppSelector } from "../../util/hooks";
const navMenus = {
	Default: [
		{
			title: "Live",
			linkTo: "/Live",
		},
		{
			title: "Past Scores",
			linkTo: "/PastScores",
		},
		{
			title: "Clans",
			linkTo: "/Clans",
		},
	],
	Admin: [
		{
			title: "Live",
			linkTo: "/Live",
		},
		{
			title: "Config",
			linkTo: "/Admin/Config",
		},
		{
			title: "Users",
			linkTo: "/Admin/Users",
		},
		{
			title: "CF",
			linkTo: "/Admin/CF",
		},
		{
			title: "Past Scores",
			linkTo: "/PastScores",
		},
		{
			title: "Clans",
			linkTo: "/Clans",
		},
	],
};

const LoginBtn = dynamic(() => import("../LoginBtn/LoginBtn"), { ssr: false });
export default function NavBar({}: // isOpen = false,
// setIsOpen,
{
	// isOpen: boolean;
	// setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const [isOpen, setIsOpen] = useState(false);

	const [navItems, setNavItems] = useState(navMenus.Default);
	const [cookieValue, setCookieValue] = useState(Cookies.get("server_token"));
	const user = useAppSelector((state) => state.user.value);

	const pathname = usePathname();
	useEffect(() => {
		const user = getUserData();
		if (!user) return;
		if (user.role !== "Admin") {
			setNavItems(navMenus.Default);
		} else {
			setNavItems(navMenus.Admin);
		}
		// setNavItems(navMenus[user.role]);
	}, [user]);
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
				{navItems.map((item) => (
					<NavItem
						key={item.title}
						isOpen={item.linkTo == pathname}
						title={item.title}
						linkTo={item.linkTo}
					/>
				))}
			</div>
			<div className={styles.login}>
				<LoginBtn />
			</div>
		</nav>
	);
}
