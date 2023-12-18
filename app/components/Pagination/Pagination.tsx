import Backward from "@/app/styles/Icons/Backward";
import Forward from "@/app/styles/Icons/Forward";
import { Button, IconButton } from "@chakra-ui/react";
import React from "react";
import styles from "./Pagination.module.css";

function Pagination() {
  return (
    <div className={styles.main}>
      <IconButton aria-label="Search database" icon={<Backward />} />
      <Button>1</Button>
      <Button variant="outline">1</Button>
      <Button variant="outline">2</Button>
      <Button variant="outline">3</Button>
      <Button variant="outline">4</Button>
      <IconButton aria-label="Search database" icon={<Forward />} />
    </div>
  );
}

export default Pagination;
