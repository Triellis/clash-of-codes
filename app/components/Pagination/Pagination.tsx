import Backward from "@/app/styles/Icons/Backward";
import Forward from "@/app/styles/Icons/Forward";
import { Button, IconButton } from "@chakra-ui/react";
import React from "react";
import styles from "./Pagination.module.css";

export default function Pagination() {
  const [currPage, setCurrPage] = React.useState(1);

  // array of pages:
  let pages = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  // make a component of page buttons
  let pageButtons = pages.map((page) => (
    <Button
      variant={`${page === currPage ? "solid" : "outline"}`}
      key={page}
      onClick={() => setCurrPage(page)}
    >
      {page}
    </Button>
  ));

  return (
    <div className={styles.main}>
      <IconButton aria-label="Go to previous page" icon={<Backward />} />
      {pageButtons}
      <IconButton aria-label="Go to next page" icon={<Forward />} />
    </div>
  );
}
