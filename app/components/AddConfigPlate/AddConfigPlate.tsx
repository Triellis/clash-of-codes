import { addContest } from "@/app/util/functions";
import { Clan } from "@/app/util/types";
import { AddIcon } from "@chakra-ui/icons";
import { IconButton, Input, Switch } from "@chakra-ui/react";
import React, { useMemo, useReducer } from "react";

import CustomSelect from "../CustomSelect";
import styles from "./AddConfigPlate.module.css";
type AddContestAction = {
	field?: "Team1" | "Team2" | "ContestCode";
	value?: Clan | string;
	type: "UPDATE" | "RESET";
};

type AddContestState = { Team1: Clan; Team2: Clan; ContestCode: string };

type ConfigureBoardProps = {
	toast: any;
	isLoading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;

	mutate: Function;
	setPage: React.Dispatch<React.SetStateAction<number>>;
};
function reduceAddContest(
	state: AddContestState,
	action: AddContestAction
): AddContestState {
	switch (action.type) {
		case "UPDATE":
			return { ...state, [action.field!]: action.value };
		case "RESET":
			return { Team1: "BW", Team2: "RG", ContestCode: "" };
		default:
			return state;
	}
}
export default function AddConfigPlate({
	toast,
	isLoading,
	setIsLoading,

	mutate,
	setPage,
}: ConfigureBoardProps) {
	const defaultContest: AddContestState = {
		Team1: "BW",
		Team2: "PP",
		ContestCode: "",
	};

	const [newContest, dispatchContest] = useReducer(
		reduceAddContest,
		defaultContest
	);

	const selectOptions = useMemo(
		() => [
			{ value: "BW", label: "Blue Wizards" },
			{ value: "YB", label: "Yellow Barbarians" },
			{ value: "RG", label: "Red Giants" },
			{ value: "PP", label: "Purple Pekkas" },
		],
		[]
	);

	return (
		<div>
			<div className={styles.configForm}>
				{/* Team1 */}
				<CustomSelect
					selectOptions={selectOptions}
					option={newContest.Team1}
					setOption={(val) =>
						dispatchContest({
							type: "UPDATE",
							field: "Team1",
							value: val as Clan,
						})
					}
				/>

				{/* Team2 */}
				<CustomSelect
					selectOptions={selectOptions}
					option={newContest.Team2}
					setOption={(val) =>
						dispatchContest({
							type: "UPDATE",
							field: "Team2",
							value: val as Clan,
						})
					}
				/>

				{/* Contest code */}

				<Input
					placeholder="Contest Code"
					onChange={(e: any) => {
						dispatchContest({
							field: "ContestCode",
							value: e.target.value,
							type: "UPDATE",
						});

						// console.log("Contest code is set to", e.target.value);
					}}
					variant={"default"}
					value={newContest.ContestCode}
				/>

				{/* Date */}
				<div>Today</div>

				{/* IsLive */}
				<Switch variant="default" size="lg" disabled defaultChecked />

				{/* Add button */}

				<IconButton
					isLoading={isLoading}
					aria-label="Add"
					icon={<AddIcon />}
					width="64px"
					height="48px"
					borderRadius="16px"
					onClick={async () => {
						setIsLoading(true);
						setPage(1);
						await addContest(newContest, mutate, toast);
						dispatchContest({
							type: "RESET",
							field: "ContestCode",
							value: "",
						});
						mutate();
						setIsLoading(false);
					}}
				/>
			</div>
		</div>
	);
}
