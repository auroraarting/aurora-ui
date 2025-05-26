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
				<h2 className={styles.title}>404</h2>
				<p className={`${styles.desp} text_center`}>
					The page that you are
					<br /> looking for does not exist!
				</p>
				<Link href={"/"}>
					<div className={styles.home_btn}>
						<Button color="primary" variant="filled" shape="rounded">
							Go to Homepage
						</Button>
					</div>
				</Link>
			</div>
		</main>
	);
}
