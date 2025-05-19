"use client";
// MODULES //
import { useEffect, useState } from "react";

// COMPONENTS //

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/careers/Benifits.module.scss";

// IMAGES //

// DATA //

// SERVICES //

/** Faq Page Wrap */
export default function Benifits({ data }) {
	return (
		<section className={`${styles.Benifits} pt_100`}>
			<div className="container">
				<h2 className={`${styles.head} text_xl`}>{data?.sectionTitle}</h2>
				<div className={`${styles.list}`}>
					{data?.list?.map((item) => {
						return (
							<div className={`${styles.item}`} key={item?.title}>
								<img src={item?.icon?.node?.mediaItemUrl} />
								<div className={`${styles.title}`}>
									<p className={`${styles.text} f_w_s_b`}>{item?.title}</p>
									<p className={`${styles.desc} text_xs`}>{item?.desc}</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
