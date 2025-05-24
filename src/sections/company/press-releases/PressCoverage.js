"use client";
// MODULES //
import { useEffect } from "react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/company/press-releases/PressCoverage.module.scss";

// IMAGES //
import mail from "/public/img/icons/mail.svg";
import tel_icon from "/public/img/icons/tel_icon.svg";

// DATA //

/** TopMedia Section */
export default function PressCoverage({ data }) {
	return (
		<section className={`${styles.PressCoverage} bg_secondary ptb_100 `}>
			<div className="container">
				<h3 className="text_md color_white f_w_s_b font_primary pb_30">
					{data?.sectionTitle}
				</h3>
				<p className={`${styles.desc}  color_silver_gray`}>{data?.sectionDesc}</p>
				<div className={`${styles.cardsWrap}`}>
					{data?.list?.map((item) => {
						return (
							<div className={`${styles.mediaTeamBoxItem}`} key={item?.name}>
								{item?.country && (
									<h4 className="text_md color_white f_w_m font_primary ">
										{item?.country}
									</h4>
								)}
								{item?.name && (
									<h4 className="text_reg color_white f_w_m font_primary ">
										{item?.name}
									</h4>
								)}
								{item?.designation && (
									<p className="text_xs color_platinum_gray pb_20">
										{item?.designation}
									</p>
								)}
								{item?.emails?.map((item2) => {
									return (
										<p
											key={item2?.text}
											className={`${styles.labelTxt} text_reg color_white f_r_a_center pb_10`}
										>
											<img src={mail.src} alt="icon" />
											<a href={`mailTo:${item2?.text}`}>{item2?.text}</a>
										</p>
									);
								})}
								{item?.phone?.map((item2) => {
									return (
										<p
											className={`${styles.labelTxt} text_reg color_white f_r_a_center`}
											key={item2?.text}
										>
											<img src={tel_icon.src} alt="icon" />
											<a href={`tel:${item2?.text}`}>{item2?.text}</a>
										</p>
									);
								})}
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
