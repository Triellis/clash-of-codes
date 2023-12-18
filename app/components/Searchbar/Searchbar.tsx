import React from "react";
import styles from "./Searchbar.module.css";
import { Input } from "@chakra-ui/react";

function Searchbar() {
  return <div className={styles.main} >

    <Input variant={"default"}  placeholder="Search" />
  </div>;
}

export default Searchbar;
