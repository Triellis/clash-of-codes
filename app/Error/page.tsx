"use client";
import { useEffect, useMemo, useState } from "react";
import styles from "./Error.module.css";

export default function ErrorPage() {
	return (
		<div className={styles.main}>
			<div className={styles.title}>Error !</div>
			<p>Something went wrong :(</p>
		</div>
	);
}
