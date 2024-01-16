import { Input } from "@chakra-ui/react";
import React from "react";
import styles from "./Searchbar.module.css";

type searchbarProps = {
	searchQuery: string;
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
	setPage: React.Dispatch<React.SetStateAction<number>>;
	placeholder?: string;
};

function Searchbar({
	searchQuery,
	setSearchQuery,
	setPage,
	placeholder,
}: searchbarProps) {
	return (
		<div className={styles.main}>
			<Input
				variant={"default"}
				placeholder={placeholder || "Search"}
				onChange={(e) => {
					setSearchQuery(e.target.value);
					setPage(1);
				}}
			/>
		</div>
	);
}

export default Searchbar;
