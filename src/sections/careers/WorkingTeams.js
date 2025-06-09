"use client";
// MODULES //
import { useRef, useEffect, useState } from "react";
// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/careers/WorkingTeams.module.scss";

// IMAGES //
import dropdown_arrow from "../../../public/img/icons/dropdown_arrow.svg";
import teamsIcn01 from "../../../public/img/careers/teamsIcn01.svg";
import teamsIcn02 from "../../../public/img/careers/teamsIcn02.svg";
import teamsIcn03 from "../../../public/img/careers/teamsIcn03.svg";
// DATA //

/** WhatWeLook Section */
export default function WorkingTeams({ data }) {
	return (
		<section
			className={`${styles.workingTeams} pt_100`}
			id="EXPOSURE"
			data-name="EXPOSURE"
		>
			<div className="container">
				<div className={`${styles.workingTeamsHead} f_w_j m_b_40`}>
					<div className={`${styles.workingTeamsHeadItem}`}>
						<h2 className="text_xl font_primary f_w_s_b color_secondary pb_20">
							{/* Working with our teams */}
							{data?.earlyCareers?.workingWithOurTeams?.sectionTitle}
						</h2>
						<p className="text_reg color_dark_gray">
							{data?.earlyCareers?.workingWithOurTeams?.sectionDesc}
						</p>
					</div>
					<div className={`${styles.workingTeamsHeadItem}`}>
						<a href={data?.earlyCareers?.workingWithOurTeams?.buttonLink}>
							<Button color="primary" variant="filled" shape="rounded">
								{data?.earlyCareers?.workingWithOurTeams?.buttonText}
							</Button>
						</a>
					</div>
				</div>
				<div className={`${styles.workingTeamsGrid} f_w_j`}>
					{data?.earlyCareers?.workingWithOurTeams?.list?.map((item) => {
						return (
							<div className={`${styles.workingTeamsItem}`} key={item?.title}>
								<img src={item?.icon?.node?.mediaItemUrl} alt={item?.title} />
								<h4 className="font_primary f_w_m text_reg color_secondary pt_10 ">
									{item?.title}
								</h4>
								<p className="text_xs font_secondary color_dark_gray">{item?.desc}</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
