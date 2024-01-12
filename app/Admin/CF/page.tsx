"use client";

import { customFetch } from "@/app/util/functions";

import { Button, Input } from "@chakra-ui/react";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import styles from "./CF.module.css";
import NotifToast from "@/app/components/NotifToast/NotifToast";
import { useToast } from "@chakra-ui/react";
async function onSave(
	configData: {
		CF_API_KEY: string;
		CF_SECRET: string;
		CF_GROUP_CODE: string;
	},
	toast: any,
	setIsLoading: any
) {
	setIsLoading(true);
	const res = await customFetch("/admin/cfConfig", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(configData),
	});
	setIsLoading(false);
	if (res.ok) {
		NotifToast({
			title: "Updated!",
			description: "",
			status: "success",
			toast: toast,
		});
	} else {
		NotifToast({
			title: "Error",
			description: "Something went wrong",
			status: "error",
			toast: toast,
		});
	}
}

type CFState = {
	CF_API_KEY: string;
	CF_SECRET: string;
	CF_GROUP_CODE: string;
};
function CF() {
	const [isDisabled, setIsDisabled] = useState(true);
	let finalButton;
	const [CF_API_KEY, setCF_API_KEY] = useState("XXXXXXXXX");
	const [CF_SECRET, setCF_SECRET] = useState("XXXXXXXXX");
	const [CF_GROUP_CODE, setCF_GROUP_CODE] = useState("Loading...");
	const toast = useToast();
	const [isLoading, setIsLoading] = useState(false);
	if (!isDisabled) {
		finalButton = (
			<Button
				colorScheme="teal"
				variant="solid"
				size="lg"
				onClick={() => {
					setIsDisabled((e) => !e);
					onSave(
						{
							CF_API_KEY,
							CF_SECRET,
							CF_GROUP_CODE,
						},
						toast,
						setIsLoading
					);
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
		setCF_GROUP_CODE(data.CF_GROUP_CODE);
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
						<Input
							value={isDisabled ? "XXXXXXXXX" : CF_API_KEY}
							isDisabled={isDisabled}
							variant={"default"}
							onChange={(e) => setCF_API_KEY(e.target.value)}
						/>
					</div>
				</div>
				<div className={styles.formInput}>
					<div className={styles.formLabel}>CF SECRET</div>
					<div>
						<Input
							variant={"default"}
							value={isDisabled ? "XXXXXXXXX" : CF_SECRET}
							isDisabled={isDisabled}
							onChange={(e) => {
								setCF_SECRET(e.target.value);
							}}
						/>
					</div>
				</div>
				<div className={styles.formInput}>
					<div className={styles.formLabel}>GROUP CODE </div>
					<div>
						<Input
							value={CF_GROUP_CODE}
							variant={"default"}
							onChange={(e) => {
								setCF_GROUP_CODE(e.target.value);
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
					isDisabled={isDisabled}
					onClick={() => {
						setIsDisabled((e) => !e);
						getConfigData();
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
