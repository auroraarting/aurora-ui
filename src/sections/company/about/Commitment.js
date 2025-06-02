"use client";
// MODULES //
import { useEffect, useState, useRef } from "react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

// UTILS //
import { dynamicInsightsBtnProps } from "@/utils";

// STYLES //
import styles from "@/styles/sections/company/about/Commitment.module.scss";

// IMAGES //
import commitment_banner from "/public/img/commit-1.jpg";
import commitment_banner2 from "/public/img/commit-2.jpg";

import dropdown_arrow from "../../../../public/img/icons/dropdown_arrow.svg";
import ContentFromCms from "@/components/ContentFromCms";

// DATA //

/** Commitment Section */
export default function Commitment({ data }) {
	return (
		<section className={`${styles.Commitment}`}>
			<div className="containerLarge">
				<div className={`${styles.flex}`}>
					{data?.map((item) => {
						return (
							<div className={`${styles.commitmentWapper}`} key={item?.title}>
								<picture>
									<img
										src={item?.backgroundImage?.node?.mediaItemUrl}
										className={`${styles.commitmentImg} width_100`}
										alt={item?.title}
									/>
								</picture>
								<div className={`${styles.CardsDesc}`}>
									<h2 className="text_lg font_primary f_w_s_b color_secondary pb_20">
										{item?.title}
									</h2>
									<p className="text_reg color_dark_gray">
										<ContentFromCms>{item?.desc}</ContentFromCms>
									</p>
									<a
										href={item?.pdf?.node?.mediaItemUrl}
										rel="noreferrer"
										target="_blank"
										className={`${styles.btn_box}`}
									>
										<span>
											<img src={dropdown_arrow.src} alt="icon" />
										</span>
										<a>
											<Button color="primary" variant="filled" shape="rounded">
												{item?.buttonText}
											</Button>
										</a>
									</a>
								</div>
							</div>
						);
					})}
					{/* <div className={`${styles.commitmentWapper}`}>
						<picture>
							<img
								src={commitment_banner.src}
								className={`${styles.commitmentImg} width_100`}
								alt="Banner Image"
							/>
						</picture>
						<div className={`${styles.CardsDesc}`}>
							<h2 className="text_lg font_primary f_w_s_b color_secondary pb_20">
								Commitment to sustainability
							</h2>
							<p className="text_reg color_dark_gray">
								We are committed to playing a pivotal role in guiding the energy sector
								towards a sustainable future. Our mission is to ease the energy
								transition through rigorous quantitative analysis, providing the
								insights and tools necessary for informed decision-making.
							</p>
							<div className={`${styles.btn_box}`}>
								<span>
									<img src={dropdown_arrow.src} alt="icon" />
								</span>
								<a href="/pdf/2025-ESG-Report.pdf" rel="noreferrer" target="_blank">
									<Button color="primary" variant="filled" shape="rounded">
										ESG Factsheet
									</Button>
								</a>
							</div>
						</div>
					</div>
					<div className={`${styles.commitmentWapper}`}>
						<picture>
							<img
								src={commitment_banner2.src}
								className={`${styles.commitmentImg} width_100`}
								alt="Banner Image"
							/>
						</picture>
						<div className={`${styles.CardsDesc}`}>
							<h2 className="text_lg font_primary f_w_s_b color_secondary pb_20">
								Gender Pay Gap 2024
							</h2>
							<p className="text_reg color_dark_gray">
								We’re proud to share our first Gender Pay Gap Report for the 2024
								period. It reflects our continued commitment to fostering a diverse and
								equitable workplace.
							</p>
							<div className={`${styles.btn_box}`}>
								<span>
									<img src={dropdown_arrow.src} alt="icon" />
								</span>
								<a
									href="/pdf/Gender-Pay-Gap-Report-2024.pdf"
									rel="noreferrer"
									target="_blank"
								>
									<Button color="primary" variant="filled" shape="rounded">
										Gender Pay Gap Report
									</Button>
								</a>
							</div>
						</div>
					</div> */}
				</div>
			</div>
		</section>
	);
}
