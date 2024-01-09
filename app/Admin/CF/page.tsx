"use client";

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
import React, { useState } from "react";
import styles from "./CF.module.css";

function PasswordInput({
	title,
	disabled,
}: {
	title: string;
	disabled: boolean;
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
					placeholder="XXXXXXXX"
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

	return (
		<div>
			<div className={styles.title}>Codeforces Settings</div>

			<div className={styles.form}>
				<div className={styles.formInput}>
					<div className={styles.formLabel}>CF API KEY</div>
					<PasswordInput title={"CF API KEY"} disabled={!editMode} />
				</div>
				<div className={styles.formInput}>
					<div className={styles.formLabel}>CF SECRET</div>
					<PasswordInput title={"CF SECRET"} disabled={!editMode} />
				</div>
				<div className={styles.formInput}>
					<div className={styles.formLabel}>GROUP CODE</div>
					<PasswordInput title={"GROUP CODE"} disabled={!editMode} />
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
