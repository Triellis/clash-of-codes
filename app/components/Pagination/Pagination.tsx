import Backward from "@/app/styles/Icons/Backward";
import Forward from "@/app/styles/Icons/Forward";
import { Box, Button, Flex, IconButton } from "@chakra-ui/react";
import React, { useState } from "react";
import styles from "./Pagination.module.css";
import { ArrowLeftIcon, ChevronLeftIcon } from "@chakra-ui/icons";

type paginationProps = {
	page: number;
	setPage: React.Dispatch<React.SetStateAction<number>>;
	items: any[];
	maxResults: number;
	shouldScrollToTop?: boolean;
};

export default function Pagination({
	page,
	setPage,
	items,
	maxResults,
	shouldScrollToTop = false,
}: paginationProps) {
	return (
		<div className={styles.main}>
			{page > 1 && (
				<IconButton
					aria-label="Go to previous page"
					icon={<ArrowLeftIcon />}
					variant={"outline"}
					onClick={() => {
						if (page > 1) {
							if (shouldScrollToTop) window.scrollTo(0, 0);
							setPage(1);
						}
					}}
				/>
			)}
			<IconButton
				aria-label="Go to previous page"
				icon={<Backward />}
				variant={"outline"}
				isDisabled={page == 1}
				onClick={() => {
					if (page > 1) {
						if (shouldScrollToTop) window.scrollTo(0, 0);

						setPage(page - 1);
					}
				}}
			/>
			<Button variant="solid">{page}</Button>
			<IconButton
				aria-label="Go to next page"
				icon={<Forward />}
				variant={"outline"}
				isDisabled={items && items?.length < maxResults}
				className="clicky"
				onClick={() => {
					if (items?.length == maxResults) {
						if (shouldScrollToTop) window.scrollTo(0, 0);

						setPage(page + 1);
					}
				}}
			/>
		</div>
	);
}
