"use client";
import ConfigItem from "@/app/components/ConfigItem/ConfigItem";
import { Contest } from "@/app/util/types";
import { Flex, Heading } from "@chakra-ui/react";
import styles from "./Config.module.css";
import useSWR from "swr";
import { getServerUrl, fetcher } from "@/app/util/functions";
function useConfig(page: number) {
	const { data, error, isLoading, mutate } = useSWR(
		getServerUrl(`admin/config?page=${page}`),
		fetcher
	);

	return {
		contests: data as Contest[],
		isLoading,
		isError: error,
		mutate,
	};
}
export default function Config() {
	const { contests, isLoading, isError, mutate } = useConfig(1);
	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error</div>;

	return (
		<main className={styles.config}>
			<Heading size={"md"}>Contests Config</Heading>

			<div className={styles.configBoard}>
				{contests.map((contest) => {
					return (
						<ConfigItem
							key={contest.Score + 55}
							itemData={contest as Contest}
						/>
					);
				})}
			</div>
		</main>
	);
}
