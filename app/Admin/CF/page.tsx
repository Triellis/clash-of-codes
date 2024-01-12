"use client";

import { customFetch } from "@/app/util/functions";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
	Button,
	Center,
	FormControl,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
} from "@chakra-ui/react";
import React, { useEffect, useReducer, useState } from "react";
import styles from "./CF.module.css";

type configData = {
	cfApiKey: string;
	cfSecret: string;
	groupCode: string;
};

type configDataAction = {
	field?: "cfApiKey" | "cfSecret" | "groupCode" | "all";
	value?: string | configData;
	type: "UPDATE";
};

const configDataReducer = (
	state: configData,
	action: configDataAction
): configData => {
	switch (action.type) {
		case "UPDATE":
			if (action.field === "all") {
				return action.value as configData;
			} else if (action.field) {
				return {
					...state,
					[action.field]: action.value,
				};
			}
			return state;
		default:
			return state;
	}
};

function PasswordInput({
	initialValue,
	editmode,
}: {
	initialValue: string;
	editmode: boolean;
}) {
	const [show, setShow] = React.useState(false);
	const handleClick = () => setShow(!show);
	const [value, setValue] = useState(initialValue);

	return (
		<InputGroup size="md">
			<Input
				value={value}
				onChange={(e) => {
					setValue(e.target.value);
				}}
				pr="4.5rem"
				isDisabled={!editmode}
			/>
			<InputRightElement>
				<IconButton
					size="sm"
					aria-label="Show/Hide Password"
					onClick={handleClick}
					variant={"ghost"}
					icon={show ? <ViewOffIcon /> : <ViewIcon />}
					isDisabled={!editmode}
				/>
			</InputRightElement>
		</InputGroup>
	);
}

async function onSave() {}

function CF() {
	const [editMode, setEditMode] = useState(false);
	let finalButton;
	if (editMode) {
		finalButton = (
			<Button
				colorScheme="teal"
				variant="solid"
				size="lg"
				onClick={() => onSave()}
			>
				Save
			</Button>
		);
	} else {
		finalButton = (
			<Button
				colorScheme="teal"
				variant="solid"
				size="lg"
				onClick={() => {
					setEditMode(true);
				}}
			>
				Update
			</Button>
		);
	}

	const initialState = {
		cfApiKey: "",
		cfSecret: "",
		groupCode: "",
	};

	const [configData, dispatch] = useReducer(configDataReducer, initialState);

	useEffect(() => {
		// const getConfigData = async () => {
		// 	const res = await customFetch("/admin/cfConfig", {
		// 		method: "GET",
		// 		headers: {
		// 			"Content-Type": "application/json",
		// 		},
		// 	});
		// 	const data = await res.json();
		// 	dispatch({ type: "UPDATE", field: "all", value: data });
		// };
		// getConfigData();
	}, []);

	return (
		<div>
			<div className={styles.title}>Codeforces Settings</div>

			<div className={styles.form}>
				<div className={styles.formInput}>
					<div className={styles.formLabel}>CF API KEY</div>
					<div>
						<PasswordInput
							editmode={editMode}
							initialValue={configData.cfApiKey}
						/>
					</div>
				</div>
				<div className={styles.formInput}>
					<div className={styles.formLabel}>CF SECRET</div>
					<div>
						<PasswordInput
							editmode={editMode}
							initialValue={configData.cfSecret}
						/>
					</div>
				</div>
				<div className={styles.formInput}>
					<div className={styles.formLabel}>GROUP CODE </div>
					<div>
						<Input
							width={{ md: "322.4px", base: "100%" }}
							value={configData.groupCode}
							onChange={(e) => {
								configData.groupCode = e.target.value;
							}}
							isDisabled={!editMode}
						/>
					</div>
				</div>
			</div>

			<div className={styles.submit}>
				<Button
					colorScheme="teal"
					variant="outline"
					size="lg"
					onClick={() => {
						setEditMode(false);
					}}
				>
					Cancel
				</Button>
				{finalButton}
			</div>
		</div>
	);
}

export default CF;
