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

// STYLES //
import styles from "@/styles/components/TheApplicationProcess.module.scss";

// IMAGES //
import transaction from "../../public/img/softwares/transaction.svg";
import portfolio from "../../public/img/softwares/portfolio.svg";
import asset from "../../public/img/softwares/asset.svg";
import strategy from "../../public/img/softwares/strategy.svg";

// DATA //

/** TheApplicationProcess Section */
export default function TheApplicationProcess({ data }) {
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
		if (data?.accordian)
			return data?.accordian?.map((item, ind) => {
				return {
					title: item?.title,
					imgIcons: item?.icon?.node?.mediaItemUrl,
					children: (
						<div className={`${styles.content_wrap}`}>
							<p className="text_reg color_dark_gray">{item?.description}</p>
							{item?.buttonLink && (
								<a href={item?.buttonLink} className={`${styles.bookBtn} pt_30`}>
									<Button color="secondary" variant="underline">
										Know more
									</Button>
								</a>
							)}
						</div>
					),
				};
			});
		if (data?.expertiseAccordion)
			return data?.expertiseAccordion?.map((item, ind) => {
				return {
					title: item?.accordionTitle,
					imgIcons: item?.icon?.node?.mediaItemUrl,
					children: (
						<div className={`${styles.content_wrap}`}>
							<p className="text_reg color_dark_gray">
								{item?.accordionDescription || item?.accordionDesc}
							</p>
							{item?.buttonLink && (
								<a href={item?.buttonLink} className={`${styles.bookBtn} pt_30`}>
									<Button color="secondary" variant="underline">
										Know more
									</Button>
								</a>
							)}
						</div>
					),
				};
			});
		return tempAccordian;
	};

	/** accordianData  */
	const accordianData2 = () => {
		return data?.applicationTips?.list?.map((item, ind) => {
			return {
				title: item?.title,
				// imgIcons: item?.icon?.node?.mediaItemUrl,
				children: (
					<div className={`${styles.content_wrap}`}>
						<div className="text_reg color_white">
							<ContentFromCms>{item?.desc}</ContentFromCms>
						</div>
					</div>
				),
			};
		});
	};

	return (
		<section
			className={`${styles.SmarterEnergy} ptb_100`}
			id="expertise"
			data-name="Expertise"
		>
			<div className="container">
				<div className={`${styles.common_queries_flex} f_w_j`}>
					<div className={`${styles.title_wrap}`}>
						<h2 className="text_xl font_primary f_w_s_b color_secondary pb_20">
							{data?.title}
						</h2>
						<p className="text_reg color_dark_gray">{data?.description}</p>
						<div onClick={() => openModal("application-tips")} className="m_t_20">
							<Button color="primary" variant="filled" shape="rounded">
								Application Tips
							</Button>
						</div>
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
			<Modal id="application-tips">
				<div className={`${styles.popup} color_white`}>
					<p className={`${styles.title} color_white text_lg f_w_s_b font_primary`}>
						Application Tips
					</p>
					<div
						className={`${styles.desc} color_white font_secondary text_reg pt_30`}
					>
						<ContentFromCms>{data?.applicationTips?.desc}</ContentFromCms>
					</div>
					<div className={`${styles.accordian_main}`}>
						<AccordianCommon
							fontStyle={"text_md color_white"}
							fontWeight={"f_w_m"}
							fontFamily={"font_primary"}
							fontColor={"color_white"}
							fontContentColor={"color_white"}
							items={accordianData2()}
						/>
					</div>
				</div>
			</Modal>
		</section>
	);
}
