"use client";
import { Flex, Heading } from "@chakra-ui/react";
import styles from "./Config.module.css";
import ConfigItem from "@/app/components/ConfigItem/ConfigItem";
import { Contest } from "@/app/util/types";

export default function Config() {
	const data: Contest[] = [
		{
			Team1: "RG",
			Team2: "BW",
			ContestCode: 12461,
			DateAdded: "24/4/2023",
			Live: true,
		},
		{
			Team1: "RG",
			Team2: "BW",
			ContestCode: 12461,
			DateAdded: "2023-12-17T10:38:29.222Z",
			Live: true,
			Score: 1,
		},
		{
			Team1: "RG",
			Team2: "BW",
			ContestCode: 12461,
			DateAdded: "2023-12-17T10:41:10.816Z",
			Live: true,
			Score: 2,
		},
		{
			Team1: "RG",
			Team2: "BW",
			ContestCode: 12461,
			DateAdded: "2023-12-17T10:41:20.890Z",
			Live: true,
			Score: 3,
		},
	];
	return (
		<main className={styles.config}>
			<Heading size={"md"}>Contests Config</Heading>
			<Flex direction={"column"}>
				{data.map((contest) => {
					return (
						<ConfigItem
							key={contest.Score}
							itemData={contest as Contest}
						/>
					);
				})}
			</Flex>
		</main>
	);
}
