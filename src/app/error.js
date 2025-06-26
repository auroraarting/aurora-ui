"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import styles from "@/styles/pages/404.module.scss";
import Link from "next/link";
import Button from "@/components/Buttons/Button";

/** Error  */
export default function Error({ error, reset }) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.log(error);
	}, [error]);

	return (
		<main className={`${styles.not_found_page}`}>
			<div className={styles.not_found_wrap}>
				<h2 className={styles.title}>Error</h2>
				<p className={`${styles.desp} text_center`}>Something went wrong!</p>
				{error && <p>{JSON.stringify(error)}</p>}
			</div>
		</main>
	);
}
