import Backward from "@/app/styles/Icons/Backward";
import Forward from "@/app/styles/Icons/Forward";
import { Button, IconButton } from "@chakra-ui/react";
import React, { useState } from "react";
import styles from "./Pagination.module.css";

type paginationProps = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  items: any[];
  maxResults: number;
};

export default function Pagination({
  page,
  setPage,
  items,
  maxResults,
}: paginationProps) {
  return (
    <div className={styles.main}>
      <IconButton
        aria-label="Go to previous page"
        icon={<Backward />}
        variant={"outline"}
        isDisabled={page == 1}
        onClick={() => {
          if (page > 1) setPage(page - 1);
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
          if (items?.length == maxResults) setPage(page + 1);
        }}
      />
    </div>
  );
}
