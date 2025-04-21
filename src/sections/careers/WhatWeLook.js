// MODULES //
import { useRef, useEffect, useState } from "react";
// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/careers/whatWeLook.module.scss";

// IMAGES //
import dropdown_arrow from "../../../public/img/icons/dropdown_arrow.svg";
// DATA //

/** WhatWeLook Section */
export default function WhatWeLook() {
	return (
		<section className={`${styles.whatWeLook}  ptb_100`}>
			<div className="container">
				<div className={`${styles.whatWeLookFlx} f_w_j`}>
					<div className={`${styles.whatWeLookItem}`}>
						<div className={`${styles.title_wrap}`}>
							<h2 className="text_xl font_primary f_w_s_b color_secondary pb_20">
								What we look for
							</h2>
							<p className="text_reg color_dark_gray">
								If you are a final-year undergraduate, postgraduate, or recent graduate
								with a strong academic record and meet the requirements below, you could
								be the right fit for us!
							</p>
						</div>
					</div>
					<div className={`${styles.whatWeLookItem}`}>
						<div className={`${styles.list_wrap}`}>
							<ul>
								<li className="font_primary f_w_m text_reg color_secondary pb_20">
									An ability to collect, analyse, and interpret complex information
								</li>
								<li className="font_primary f_w_m text_reg color_secondary pb_20">
									An ability to communicate and collaborate with a wide range of people
								</li>
								<li className="font_primary f_w_m text_reg color_secondary pb_20">
									Evidence of quantitative skills
								</li>
								<li className="font_primary f_w_m text_reg color_secondary pb_20">
									Evidence of effective teamwork
								</li>
								<li className="font_primary f_w_m text_reg color_secondary pb_20">
									Motivation for driving the green energy transition
								</li>
								<li className="font_primary f_w_m text_reg color_secondary pb_20">
									Evidence of fluency in English (required)
								</li>
								<li className="font_primary f_w_m text_reg color_secondary">
									Fluency in German, Dutch, or Polish (highly-valued)
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
