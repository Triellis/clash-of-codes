"use client";
import ConfigItem from "@/app/components/ConfigItem";
import Pagination from "@/app/components/Pagination";
import Searchbar from "@/app/components/Searchbar/Searchbar";
import SpecialTxt from "@/app/components/SpecialTxt/SpecialTxt";
import UserAdd from "@/app/components/UserAdd/UserAdd";
import UserItem from "@/app/components/UserItem/UserItem";
import { useUser } from "@/app/util/functions";
import { AddUserAction, AddUserState } from "@/app/util/types";
import { Center, Divider, Heading, useToast } from "@chakra-ui/react";
import { useMemo, useReducer, useState } from "react";
import styles from "./Users.module.css";

function reduceAddUser(
	state: AddUserState,
	action: AddUserAction
): AddUserState {
	switch (action.type) {
		case "UPDATE":
			return { ...state, [action.field!]: action.value };
		case "RESET":
			return {
				name: "",
				email: "",
				cfUsername: "",
				role: "Member",
				clan: null,
			};
		default:
			return state;
	}
}

export default function Users() {
	const maxResults = 5;
	const [page, setPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState("");

	const tableCols = useMemo(
		() => ["Name", "CF Handle", "Status", "Clan", "Action"],
		[]
	);

	const { users, isLoading, isError, mutate } = useUser(
		page,
		searchQuery,
		maxResults
	);

	const [isAddLoading, setIsAddLoading] = useState<boolean>(false);
	const toast = useToast();

	let userNodes;
	if (isLoading) userNodes = <Center>Loading...</Center>;
	else if (isError) userNodes = <Center>Error...</Center>;
	else if (users) {
		userNodes = users.map((usr) => (
			<UserItem key={String(usr._id!)} mutate={mutate} itemData={usr} />
		));

		if (userNodes.length === 0) userNodes = <Center>No Users Found</Center>;
	}

	const defaultUser: AddUserState = {
		name: "",
		email: "",
		cfUsername: "",
		role: "Member",
		clan: null,
	};

	const [newUser, dispatchUser] = useReducer(reduceAddUser, defaultUser);

	return (
		<div className={styles.main}>
			<Heading fontSize="32px" marginBlock={"32px"}>
				Users
			</Heading>

			<Searchbar
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				setPage={setPage}
			/>

			{/* headers */}
			<div className={styles.usersBoard}>
				<div className={styles.header}>
					{tableCols.map((col) => (
						<SpecialTxt key={col}>{col}</SpecialTxt>
					))}
				</div>

				<Divider variant="default" />

				<div className={styles.list}>
					<UserAdd
						toast={toast}
						isLoading={isAddLoading}
						setIsLoading={setIsAddLoading}
						mutate={mutate}
						setPage={setPage}
						newUser={newUser}
						dispatchUser={dispatchUser}
					/>

					{userNodes}
				</div>
			</div>

			<Pagination
				page={page}
				setPage={setPage}
				items={users}
				maxResults={maxResults}
			/>
		</div>
	);
}
