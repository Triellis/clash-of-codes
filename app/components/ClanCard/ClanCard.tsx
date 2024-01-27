import { Clan } from "@/app/util/types";
import classNames from "classnames";
import styles from "./ClanCard.module.css";
import SpecialTxt from "../SpecialTxt/SpecialTxt";
import { fullForm } from "@/app/util/functions";
import { Button, Flex } from "@chakra-ui/react";
import { ArrowForwardIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { event } from "nextjs-google-analytics";
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
	return (
		<div className={classNames(styles.clanCard, styles[clanName])}>
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
				<Flex
					direction={"row"}
					justifyContent={"end"}
					alignItems={"flex-end"}
					width={"100%"}
				>
					{isLink && (
						<Link
							className={styles.viewClanBtn}
							href={`/Clans/${clanName}`}
							onClick={() => {
								event("navigate", {
									menu: clanName,
								});
							}}
						>
							<ArrowForwardIcon h={6} w={6} />
						</Link>
					)}
				</Flex>
			</Flex>
		</div>
	);
}
