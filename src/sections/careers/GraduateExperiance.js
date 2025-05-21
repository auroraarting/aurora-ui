"use client";
// MODULES //
import Link from "next/link";
import { useEffect, useState } from "react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";
import Modal, { openModal } from "@/components/Modal";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/careers/GraduateExperiance.module.scss";

// IMAGES //
import profile_pic from "../../../public/img/careers/profile_pic.png";
import quate from "../../../public/img/careers/quate.svg";
import ContentFromCms from "@/components/ContentFromCms";

// DATA //

/** GraduateExperiance Section */
export default function GraduateExperiance({
	sectionName = "Graduate Experiences",
	id = "Graduate-Experiences",
	defaultData,
	title = "What’s it like to be a part of Team Aurora?",
}) {
	const [selectId, setSelectId] = useState();
	// useEffect(() => {
	// 	openModal("teamPop");
	// }, []);

	return (
		<>
			<section
				className={`${styles.TeamAurora} pb_50`}
				id={id}
				data-name={sectionName}
			>
				<div className="containerLarge">
					<div className={`${styles.title_wrap}`}>
						<h2 className="text_xl font_primary f_w_s_b color_secondary pb_20">
							{title}
						</h2>
						<div className={`${styles.bookBtn}`}>
							<Link href="/careers/our-team">
								<Button color="primary" variant="filled" shape="rounded">
									Our Teams
								</Button>
							</Link>
						</div>
					</div>
					<div className={`${styles.TeamBoxRow} ${styles.TeamBoxRowOne}`}>
						{defaultData?.map((item, ind) => {
							return (
								<div
									className={`${styles.teamItem} ${styles.teamItemOne}`}
									key={item?.name}
									onClick={() => {
										setSelectId(ind);
										openModal("teamPop");
									}}
								>
									<div className={`${styles.teamFlex} f_r_a_center`}>
										{item?.image?.node?.mediaItemUrl && (
											<div className={`${styles.teamLogo}`}>
												<img src={item?.image?.node?.mediaItemUrl} alt="logo" />
											</div>
										)}
										<div className={`${styles.teamDescription}`}>
											<h4 className="text_reg font_primary color_secondary f_w_m">
												{item?.name}
											</h4>
											<p className="text_xs color_dark_gray f_w_l">{item?.designation}</p>
										</div>
										<img src="/img/icons/plusIcon.png" />
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</section>
			<div className={`${styles.popup}`} data-lenis-prevent>
				<Modal id="teamPop">
					<div className={`${styles.card} d_f`}>
						<img
							className={`${styles.thumb}`}
							src={defaultData[selectId]?.popup?.thumb?.node?.mediaItemUrl}
							alt={"thumb"}
						/>
						<div className={`${styles.contentWrap} color_white`}>
							<div className={`${styles.head} color_white text_lg f_w_m`}>
								Graduate Experience: <br /> {defaultData[selectId]?.name}
							</div>
							<p className={`${styles.designation} text_xs`}>
								{defaultData[selectId]?.designation}
							</p>
							<div className={`${styles.line} m_tb_20`}></div>
							{defaultData[selectId]?.popup?.list?.map((item2) => {
								return (
									<div className={`${styles.list}`} key={item2.title}>
										<div className={`${styles.v_line}`}></div>
										<p className={`${styles.listTitle}`}>
											<img src="/img/icons/quoteIcon.svg" className={styles.quote} />{" "}
											{item2.title}
										</p>
										<div className={`${styles.listDesc} m_t_20`}>
											<img src="/img/icons/quoteIcon.svg" className={styles.quote} />{" "}
											<ContentFromCms>{item2?.desc}</ContentFromCms>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</Modal>
			</div>
		</>
	);
}
