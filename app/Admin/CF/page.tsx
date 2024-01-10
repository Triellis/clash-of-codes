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
	field?: "cfApiKey" | "cfSecret" | "groupCode";
	value?: string;
	type: "UPDATE" | "RESET";
};

function configDataReducer(
	state: configData,
	action: configDataAction
): configData {
	switch (action.type) {
		case "UPDATE":
			return { ...state, [action.field!]: action.value };
		case "RESET":
			return { cfApiKey: "", cfSecret: "", groupCode: "" };
		default:
			return state;
	}
}

function PasswordInput({
	title,
	disabled,
	placeholder,
}: {
	title: string;
	disabled: boolean;
	placeholder?: string;
}) {
	const [show, setShow] = React.useState(false);
	const handleClick = () => setShow(!show);

	return (
		<div>
			<InputGroup size="md">
				<Input
					pr="4.5rem"
					isDisabled={disabled}
					type={show ? "text" : "password"}
					placeholder={placeholder}
				/>
				<InputRightElement width="4.5rem">
					<IconButton
						isDisabled={disabled}
						variant={"unstyled"}
						aria-label="XXXXXXXX"
						icon={show ? <ViewOffIcon /> : <ViewIcon />}
						onClick={handleClick}
					/>
				</InputRightElement>
			</InputGroup>
		</div>
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
		const getData = async () => {
			const res = await customFetch("/admin/cfConfig", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			const data = await res.json();

			console.log("data", data);
			dispatch({ type: "UPDATE", value: data });
			console.log("config:", configData);
		};

		getData();
	}, []);

	return (
		<div>
			<div className={styles.title}>Codeforces Settings</div>

			<div className={styles.form}>
				<div className={styles.formInput}>
					<div className={styles.formLabel}>CF API KEY</div>
					<PasswordInput
						title={"CF API KEY"}
						disabled={!editMode}
						placeholder={configData.cfApiKey}
					/>
				</div>
				<div className={styles.formInput}>
					<div className={styles.formLabel}>CF SECRET</div>
					<PasswordInput
						title={"CF SECRET"}
						disabled={!editMode}
						placeholder={configData.cfSecret}
					/>
				</div>
				<div className={styles.formInput}>
					<div className={styles.formLabel}>GROUP CODE</div>
					<PasswordInput
						title={"GROUP CODE"}
						disabled={!editMode}
						placeholder={configData.groupCode}
					/>
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
