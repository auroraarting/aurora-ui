"use client";
// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";
import AccordianCommon from "@/components/AccordianCommon";
import ContentFromCms from "./ContentFromCms";
import Modal, { openModal } from "./Modal";

// SECTIONS //

// PLUGINS //

// UTILS //
import formatDate, { slugify } from "@/utils";

// STYLES //
import styles from "@/styles/components/SmarterEnergy.module.scss";

// IMAGES //
import transaction from "../../public/img/softwares/transaction.svg";
import portfolio from "../../public/img/softwares/portfolio.svg";
import asset from "../../public/img/softwares/asset.svg";
import strategy from "../../public/img/softwares/strategy.svg";

import grey_calendar from "/public/img/icons/grey_calendar.svg";
import grey_location from "/public/img/icons/grey_location.svg";
import grey_clock from "/public/img/icons/grey_clock.svg";

// DATA //

/** SmarterEnergy Section */
export default function SmarterEnergy({ data, sectionName }) {
	if (!data?.title) return <></>;

	const tempAccordian = [
		{
			title: "Transaction Support",
			imgIcons: transaction.src,
			children: (
				<div className={`${styles.content_wrap}`}>
					<p className="text_reg color_dark_gray">
						Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam.
					</p>
					<div className={`${styles.bookBtn} pt_30`}>
						<Button color="secondary" variant="underline">
							Know more
						</Button>
					</div>
				</div>
			),
		},
		{
			title: "Portfolio Valuation",
			imgIcons: portfolio.src,
			children: (
				<div className={`${styles.content_wrap}`}>
					<p className="text_reg color_dark_gray">
						Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam.
					</p>
					<div className={`${styles.bookBtn} pt_30`}>
						<Button color="secondary" variant="underline">
							Know more
						</Button>
					</div>
				</div>
			),
		},
		{
			title: "Asset Citing & Optimisation",
			imgIcons: asset.src,
			children: (
				<div className={`${styles.content_wrap}`}>
					<p className="text_reg color_dark_gray">
						Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam.
					</p>
					<div className={`${styles.bookBtn} pt_30`}>
						<Button color="secondary" variant="underline">
							Know more
						</Button>
					</div>
				</div>
			),
		},
		{
			title: "Strategy",
			imgIcons: strategy.src,
			children: (
				<div className={`${styles.content_wrap}`}>
					<p className="text_reg color_dark_gray">
						Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam.
					</p>
					<div className={`${styles.bookBtn} pt_30`}>
						<Button color="secondary" variant="underline">
							Know more
						</Button>
					</div>
				</div>
			),
		},
	];

	/** accordianData  */
	const accordianData = () => {
		/** keyVal  */
		const keyVal = () => {
			if (data?.accordian) return "accordian";
			if (data?.expertiseAccordion) return "expertiseAccordion";
		};
		if (data?.[keyVal()])
			return data?.[keyVal()]?.map((item, ind) => {
				return {
					title: item?.accordionTitle || item?.title,
					imgIcons: item?.icon?.node?.sourceUrl,
					children: (
						<>
							<div className={`${styles.content_wrap}`}>
								<p className="text_reg color_dark_gray">
									{item?.accordionDescription ||
										item?.accordionDesc ||
										item?.description}
								</p>
								{item?.buttonLink && (
									<a href={item?.buttonLink} className={`${styles.bookBtn} pt_30`}>
										<Button color="secondary" variant="underline">
											Know more
										</Button>
									</a>
								)}
								{item?.popup?.title && (
									<div
										onClick={() => openModal(`popupAccordian${ind}`)}
										className={`${styles.bookBtn} pt_30`}
									>
										<Button color="secondary" variant="underline">
											Know more
										</Button>
									</div>
								)}
							</div>
							{item?.popup?.title && (
								<Modal id={`popupAccordian${ind}`}>
									<div className={`${styles.popup} color_white`}>
										<p
											className={`${styles.title} color_white text_lg f_w_s_b font_primary`}
										>
											{item?.popup?.title}
										</p>
										<div
											className={`${styles.desc} color_white font_secondary text_reg pt_30`}
										>
											<ContentFromCms>{item?.popup?.desc}</ContentFromCms>
										</div>
										<div className={`${styles.accordian_main}`}>
											{item?.popup?.list?.map((item2, ind2) => {
												return (
													<div key={item2?.category + ind2} className={`${styles.listItem}`}>
														<div className={`${styles.category} f_w_s_b text_xs`}>
															{item2?.category}
														</div>
														<div className={`${styles.date} f_w_s_b text_xxs`}>
															<img src={grey_calendar.src} />
															{formatDate(item2?.date)}
														</div>
														<div className={`${styles.time} f_w_s_b text_xxs`}>
															<img src={grey_clock.src} />
															{item2?.time}
														</div>
														<div className={`${styles.address} f_w_s_b text_xxs`}>
															<img src={grey_location.src} />
															{item2?.address}
														</div>
													</div>
												);
											})}
											{item?.popup?.list2?.length > 0 && (
												<AccordianCommon
													fontStyle={"text_md"}
													fontWeight={"f_w_m"}
													fontFamily={"font_primary"}
													fontColor={"color_white"}
													items={item?.popup?.list2?.map((item2, ind2) => {
														return {
															title: item2?.title,
															// imgIcons: item?.icon?.node?.sourceUrl,
															children: (
																<div className={`${styles.content_wrap2}`}>
																	<div className="text_reg color_white">
																		<ContentFromCms>{item2?.desc}</ContentFromCms>
																	</div>
																</div>
															),
														};
													})}
												/>
											)}
										</div>
									</div>
								</Modal>
							)}
						</>
					),
				};
			});
		return tempAccordian;
	};

	return (
		<section
			className={`${styles.SmarterEnergy} ptb_100`}
			id={sectionName ? slugify(sectionName) : "expertise"}
			data-name={sectionName || "Expertise"}
		>
			<div className="container">
				<div className={`${styles.common_queries_flex} f_w_j`}>
					<div className={`${styles.title_wrap}`}>
						<h2 className="text_xl font_primary f_w_s_b color_secondary pb_20">
							{data?.title}
						</h2>
						<p className="text_reg color_dark_gray">{data?.description}</p>
					</div>
					<div className={`${styles.common_queries_faq}`}>
						<div className={`${styles.accordian_main}`}>
							<AccordianCommon
								fontStyle={"text_md"}
								fontWeight={"f_w_m"}
								fontFamily={"font_primary"}
								fontColor={"color_secondary"}
								items={accordianData()}
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
