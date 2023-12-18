import React from "react";
import styles from "./SpecialTxt.module.css";

function SpecialTxt({ children }: { children: React.ReactNode }) {
  return <span className={styles.shiny}>{children}</span>;
}

export default SpecialTxt;
