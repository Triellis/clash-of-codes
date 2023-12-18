"use client";
import ConfigItem from "@/app/components/ConfigItem/ConfigItem";
import Pagination from "@/app/components/Pagination/Pagination";
import Add from "@/app/styles/Icons/Add";
import { fetcher, getServerUrl } from "@/app/util/functions";
import { ContestCol } from "@/app/util/types";
import { AddIcon } from "@chakra-ui/icons";
import {
	Button,
	Divider,
	Flex,
	Heading,
	IconButton,
	Input,
	Select,
	Switch,
} from "@chakra-ui/react";
import useSWR from "swr";
import styles from "./Config.module.css";
function useConfig(page: number) {
	const { data, error, isLoading, mutate } = useSWR(
		getServerUrl(`admin/config?page=${page}`),
		fetcher
	);

	return {
		contests: data as ContestCol[],
		isLoading,
		isError: error,
		mutate,
	};
}
export default function Config() {
	const { contests, isLoading, isError, mutate } = useConfig(1);
	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error</div>;

	const selectOptions = [
		{ value: "BW", label: "Blue Wizards" },
		{ value: "YB", label: "Yellow Barbarians" },
		{ value: "RG", label: "Red Giants" },
		{ value: "PP", label: "Purple Pekkas" },
	];

	return (
		<main className={styles.config}>
			<Heading fontSize={"32px"} marginBlock={"64px"}>
				Active Contests
			</Heading>

			{/* form for makign the item: */}

			<div className={styles.configBoard}>
				<div className={styles.header}>
					<div className="shiny">Team1</div>
					<div className="shiny">Team2</div>
					<div className="shiny">Contest Code</div>
					<div className="shiny">Date </div>
					<div className="shiny">Live </div>
					<div className="shiny">Remove</div>
				</div>

				<Divider />

				<div className={styles.configForm}>
					{/* team1 */}
					<Select variant={"default"} placeholder="Team 1" size="sm">
						{selectOptions?.map((option) => {
							return (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							);
						})}
					</Select>

					{/* team2 */}
					<Select variant={"default"} placeholder="Team 2" size="sm">
						{selectOptions?.map((option) => {
							return (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							);
						})}
					</Select>

					{/* contest code */}
					<Input variant="default" placeholder="Contest Code" />

					{/* date */}
					<div>Today</div>

					{/* isLive */}
					<Switch
						variant={"default"}
						size="lg"
						disabled
						defaultChecked
					/>

					{/* add button */}
					<IconButton
						aria-label="Add"
						icon={<AddIcon />}
						width={"64px"}
						height={"48px"}
						borderRadius={"16px"}
					/>
				</div>

				{contests?.map((contest) => {
					return (
						<ConfigItem
							key={String(contest._id!)}
							itemData={contest as ContestCol}
						/>
					);
				})}
			</div>

			<Pagination />
		</main>
	);
}
