"use client";
// MODULES //
import { useEffect, useState, useRef } from "react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";
import ContentFromCms from "@/components/ContentFromCms";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/company/about/OurEdge.module.scss";

// IMAGES //
import trusted from "../../../../public/img/company/about/trusted.png";
import rigorous from "../../../../public/img/company/about/rigorous.png";
import wholesale from "../../../../public/img/company/about/wholesale.png";
import proximity from "../../../../public/img/company/about/proximity.png";
import innovative from "../../../../public/img/company/about/innovative.png";
import independent from "../../../../public/img/company/about/independent.png";

// DATA //

/** OurEdge Section */
export default function OurEdge({ data }) {
	return (
		<section className={`${styles.OurEdge}`}>
			<div className="container">
				<div className={`${styles.OurEdgeFlex} f_w_j`}>
					<div className={`${styles.title_wrap}`}>
						<div className={`${styles.titleBox}`}>
							<h2 className="text_xl font_primary f_w_s_b color_secondary pb_20">
								{data?.sectionTitle}
							</h2>
							<div className="text_reg color_dark_gray pb_20">
								<ContentFromCms>{data?.description}</ContentFromCms>
							</div>
						</div>
					</div>
					<div className={`${styles.OurEdgeHistory}`}>
						{data?.list?.map((item, ind) => {
							return (
								<div className={`${styles.OurItem}`} key={ind}>
									<div className={`${styles.OurEdgeBox} f_w_j`}>
										<div className={`${styles.iconBox}`}>
											<span className="f_r_aj_center">
												<img
													src={item?.logo?.node?.mediaItemUrl}
													className={`${styles.icons} `}
													alt="icon"
												/>
											</span>
										</div>
										<div className={`${styles.contentBox}`}>
											<h4 className="text_md f_w_m font_primary pb_20">{item?.title}</h4>
											<div className="text_reg color_dark_gray">
												<ContentFromCms>{item?.description}</ContentFromCms>
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
