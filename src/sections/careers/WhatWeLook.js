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
export default function WhatWeLook({ data }) {
	return (
		<section className={`${styles.whatWeLook}  ptb_100`}>
			<div className="container">
				<div className={`${styles.whatWeLookFlx} f_w_j`}>
					<div className={`${styles.whatWeLookItem}`}>
						<div className={`${styles.title_wrap}`}>
							<h2 className="text_xl font_primary f_w_s_b color_secondary pb_20">
								{data?.earlyCareers?.expertise?.title}
							</h2>
							<p className="text_reg color_dark_gray">
								{data?.earlyCareers?.expertise?.description}
							</p>
						</div>
					</div>
					<div className={`${styles.whatWeLookItem}`}>
						<div className={`${styles.list_wrap}`}>
							<ul>
								{data?.earlyCareers?.expertise?.expertiseAccordion?.map((item) => {
									return (
										<li
											key={item?.accordionTitle}
											className="font_primary f_w_m text_reg color_secondary pb_20"
										>
											{item?.accordionTitle}
										</li>
									);
								})}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
