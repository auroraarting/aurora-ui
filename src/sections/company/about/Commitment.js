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
				</div>
			</div>
		</section>
	);
}
