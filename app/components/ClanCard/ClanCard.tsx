import { Clan } from "@/app/util/types";
import classNames from "classnames";
import styles from "./ClanCard.module.css";
import SpecialTxt from "../SpecialTxt/SpecialTxt";
import { fullForm } from "@/app/util/functions";
import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { event } from "nextjs-google-analytics";
import { ChevronRightIcon } from "@chakra-ui/icons";

export default function ClanCard({
	clanName,
	clanScore,
	rank,
	solvedProblems,
	isLink = true,
}: {
	clanName: Clan;
	clanScore: number;
	rank: number;
	solvedProblems: number;
	isLink?: boolean;
}) {
	const Wrapper = ({
		children,
		href,
		className,
	}: {
		children: React.ReactNode;
		href: string;
		className: string;
	}) => {
		if (isLink) {
			return (
				<Link
					href={href}
					className={className}
					onClick={() => {
						event("navigate", {
							menu: clanName,
						});
						setTimeout(() => {
							window.scrollTo(0, 0);
						}, 500);
					}}
				>
					{children}
				</Link>
			);
		} else {
			return <div className={className}>{children}</div>;
		}
	};
	return (
		<Wrapper
			href={`/Clans/${clanName}`}
			className={classNames(styles.clanCard, styles[clanName])}
		>
			<div className={styles.rank}>
				<SpecialTxt>#{rank}</SpecialTxt>
			</div>
			<Flex direction={"column"}>
				<div className={styles.clanName}>
					{fullForm(clanName).split(" ")[1]}
				</div>
				<div className={styles.clanScore}>
					<SpecialTxt>Problems Solved: {solvedProblems}</SpecialTxt>
				</div>
				{isLink && (
					<Text mt="1" fontSize={"small"} color={"gray.400"}>
						Click to see more <ChevronRightIcon h={6} w={6} />
					</Text>
				)}
			</Flex>
		</Wrapper>
	);
}
