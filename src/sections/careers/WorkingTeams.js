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
export default function WorkingTeams() {
	return (
		<section className={`${styles.workingTeams} ptb_100`}>
			<div className="container">
				<div className={`${styles.workingTeamsHead} f_w_j m_b_20`}>
					<div className={`${styles.workingTeamsHeadItem}`}>
						<h2 className="text_xl font_primary f_w_s_b color_secondary pb_10">
							Working with our teams
						</h2>
						<p className="text_reg color_dark_gray">
							Throughout our Graduate Analyst Programme, you will complete three
							rotations, gaining hands-on experience with different teams across the
							organisation.
						</p>
					</div>
					<div className={`${styles.workingTeamsHeadItem}`}>
						<div>
							<Button color="primary" variant="filled" shape="rounded">
								Explore Our Teams
							</Button>
						</div>
					</div>
				</div>
				<div className={`${styles.workingTeamsGrid} f_w_j`}>
					<div className={`${styles.workingTeamsItem}`}>
						<img src={teamsIcn01.src} alt="" />
						<h4 className="font_primary f_w_m text_reg color_secondary pt_10 ">
							Advisory
						</h4>
						<p className="text_xs font_secondary color_dark_gray l_h_4">
							Our advice is fully bespoke, helping inform strategic decisions and
							providing the high levels of interaction required to facilitate some of
							the largest transactions in the energy sector. The nature of work is
							diverse, spanning different types of clients, technologies, and policy
							topics.
						</p>
					</div>
					<div className={`${styles.workingTeamsItem}`}>
						<img src={teamsIcn02.src} alt="" />
						<h4 className="font_primary f_w_m text_reg color_secondary pt_10">
							Research
						</h4>
						<p className="text_xs font_secondary color_dark_gray l_h_4">
							The Research team forecasts the key power and commodity markets globally
							for over 800 subscribers, including clients from banks, funds,
							governments, and grid companies. Our reports focus on a variety of topics
							including renewables, battery storage, grid networks, thermal power,
							hydrogen, and commodities.
						</p>
					</div>
					<div className={`${styles.workingTeamsItem}`}>
						<img src={teamsIcn03.src} alt="" />
						<h4 className="font_primary f_w_m text_reg color_secondary pt_10">
							Commercial
						</h4>
						<p className="text_xs font_secondary color_dark_gray l_h_4">
							Our Sales and Account Management team build and maintain strong client
							networks and collaborate with colleagues across the globe, leading sales
							opportunities from initial calls to contract negotiation and supporting
							ongoing client account management to understand and satisfy their needs.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
