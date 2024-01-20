import { Clan } from "@/app/util/types";
import classNames from "classnames";
import styles from "./ClanCard.module.css";
import SpecialTxt from "../SpecialTxt/SpecialTxt";
import { fullForm } from "@/app/util/functions";
import { Flex } from "@chakra-ui/react";
export default function ClanCard({
	clanName,
	clanScore,
	rank,
	solvedProblems,
}: {
	clanName: Clan;
	clanScore: number;
	rank: number;
	solvedProblems: number;
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
			</Flex>
		</div>
	);
}
