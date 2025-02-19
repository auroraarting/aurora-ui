// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";
import AccordianCommon from "@/components/AccordianCommon";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/components/SmarterEnergy.module.scss";

// IMAGES //
import transaction from "../../public/img/softwares/transaction.svg";
import portfolio from "../../public/img/softwares/portfolio.svg";
import asset from "../../public/img/softwares/asset.svg";
import strategy from "../../public/img/softwares/strategy.svg";

// DATA //

/** SmarterEnergy Section */
export default function SmarterEnergy() {
	return (
		<section className={`${styles.SmarterEnergy} ptb_100`}>
			<div className="container">
				<div className={`${styles.common_queries_flex} f_w_j`}>
					<div className={`${styles.title_wrap}`}>
						<h2 className="text_xl font_primary f_w_s_b color_secondary pb_20">
							Smarter energy solutions start here
						</h2>
						<p className="text_reg color_dark_gray">
							Gain unparalleled expertise in renewable energy analytics. Our team
							delivers data and insights designed to navigate complexities, manage
							risks, and unlock opportunities tailored to your sector.
						</p>
					</div>
					<div className={`${styles.common_queries_faq}`}>
						<div className={`${styles.accordian_main}`}>
							<AccordianCommon
								fontStyle={"text_md"}
								fontWeight={"f_w_m"}
								fontFamily={"font_primary"}
								fontColor={"color_secondary"}
								items={[
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
								]}
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
