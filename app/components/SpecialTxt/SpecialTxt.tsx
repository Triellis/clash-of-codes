import React from "react";
import styles from "./SpecialTxt.module.css";

function SpecialTxt({ children }: { children: React.ReactNode }) {
  return <div className={styles.shiny}>{children}</div>;
}

export default SpecialTxt;
