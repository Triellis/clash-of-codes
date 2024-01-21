"use client";
import ConfigBoard from "@/app/components/AddConfigPlate/AddConfigPlate";
import ConfigItem from "@/app/components/ConfigItem/ConfigItem";
import Pagination from "@/app/components/Pagination/Pagination";
import Searchbar from "@/app/components/Searchbar/Searchbar";
import SpecialTxt from "@/app/components/SpecialTxt";
import { useConfig } from "@/app/util/functions";

import { Center, Divider, Heading, useToast } from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import styles from "./Config.module.css";

// for the button:

export default function Config() {
	const toast = useToast();

	const tableCols = useMemo(
		() => [
			"Team1",
			"Team2",
			"Contest Code",
			"Date Added",
			"Live",
			"Remove",
		],
		[]
	);

	const [isAddLoading, setIsAddLoading] = useState<boolean>(false);

	const maxResults = 6;
	const [page, setPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState("");

	const { contests, isLoading, isError, mutate } = useConfig(
		page,
		searchQuery,
		maxResults
	);
	let contestNodes;

	if (isLoading) contestNodes = <Center>Loading...</Center>;
	else if (isError) contestNodes = <Center>Error...</Center>;
	else if (contests) {
		contestNodes = contests.map((contest) => (
			<ConfigItem
				key={String(contest._id!)}
				mutate={mutate}
				itemData={contest}
			/>
		));

		if (contestNodes.length === 0) {
			contestNodes = <Center>No contests found</Center>;
		}
	}

	return (
		<main className={styles.config}>
			<Heading fontSize="32px" marginBlock={"32px"}>
				Active Contests
			</Heading>

			{/* Searchbar here */}
			<div className={styles.search}>
				<Searchbar
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
					setPage={setPage}
				/>
			</div>

			{/* form for making the item */}
			<div className={styles.configBoard}>
				<div className={styles.header}>
					{tableCols.map((col) => (
						<SpecialTxt key={col}>{col}</SpecialTxt>
					))}
				</div>

				<Divider variant="default" />

				<ConfigBoard
					toast={toast}
					isLoading={isAddLoading}
					setIsLoading={setIsAddLoading}
					mutate={mutate}
					setPage={setPage}
				/>

				{contestNodes}
			</div>

			<Pagination
				page={page}
				setPage={setPage}
				items={contests}
				maxResults={maxResults}
			/>
		</main>
	);
}
