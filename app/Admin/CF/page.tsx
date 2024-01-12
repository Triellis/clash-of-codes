"use client";

import { customFetch } from "@/app/util/functions";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
	Button,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import styles from "./CF.module.css";

async function onSave(configData: {
	cfApiKey: string;
	cfSecret: string;
	groupCode: string;
}) {
	const res = await customFetch("/admin/cfConfig", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(configData),
	});
	const data = await res.json();
	console.log(data);
}

type CFState = {
	CF_API_KEY: string;
	CF_SECRET: string;
	CF_GROUP_CODE: string;
};
function CF() {
	const [isDisabled, setIsDisabled] = useState(true);
	let finalButton;
	const [CF_API_KEY, setCF_API_KEY] = useState("XXXXXXXXXX");
	const [CF_SECRET, setCF_SECRET] = useState("XXXXXXXX");
	const [GROUP_CODE, setGROUP_CODE] = useState("Loading...");

	if (!isDisabled) {
		finalButton = (
			<Button
				colorScheme="teal"
				variant="solid"
				size="lg"
				onClick={() => {
					setIsDisabled((e) => !e);
				}}
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
					setIsDisabled((e) => !e);
				}}
			>
				Update
			</Button>
		);
	}
	const getConfigData = useCallback(async () => {
		const res = await customFetch("/admin/cfConfig", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = (await res.json()) as CFState;

		setCF_API_KEY(data.CF_API_KEY);
		setCF_SECRET(data.CF_SECRET);
		setGROUP_CODE(data.CF_GROUP_CODE);
	}, []);
	useEffect(() => {
		getConfigData();
	}, [getConfigData]);

	return (
		<div>
			<div className={styles.title}>Codeforces Settings</div>

			<div className={styles.form}>
				<div className={styles.formInput}>
					<div className={styles.formLabel}>CF API KEY</div>
					<div>
						<Input value={CF_API_KEY} isDisabled={isDisabled} />
					</div>
				</div>
				<div className={styles.formInput}>
					<div className={styles.formLabel}>CF SECRET</div>
					<div>
						<Input value={CF_SECRET} isDisabled={isDisabled} />
					</div>
				</div>
				<div className={styles.formInput}>
					<div className={styles.formLabel}>GROUP CODE </div>
					<div>
						<Input
							width={{ md: "322.4px", base: "100%" }}
							value={GROUP_CODE}
							onChange={(e) => {
								setGROUP_CODE(e.target.value);
							}}
							isDisabled={isDisabled}
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
						setIsDisabled(false);
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
