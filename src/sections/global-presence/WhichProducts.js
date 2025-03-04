// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";
import AccordianCommon from "@/components/AccordianCommon";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/global-presence/WhichProducts.module.scss";

// IMAGES //
import chronos from "../../../public/img/global-presence/chronos.png";
import slider_arrow from "../../../public/img/icons/slider_arrow.svg";
import power from "../../../public/img/global-presence/power.svg";
import portfolio from "../../../public/img/softwares/portfolio.svg";
import asset from "../../../public/img/softwares/asset.svg";
import strategy from "../../../public/img/softwares/strategy.svg";

// DATA //

/** WhichProducts Section */
export default function WhichProducts() {
	return (
		<section className={`${styles.WhichProducts}`}>
			<div className="container">
				<div className={`${styles.common_queries_faq}`}>
					<div className={`${styles.accordian_main}`}>
						<AccordianCommon
							fontStyle={"text_md"}
							fontWeight={"f_w_m"}
							fontFamily={"font_primary"}
							fontColor={"color_secondary"}
							items={[
								{
									title: "Power & Renewables Service",
									imgIcons: power.src,
									children: (
										<div className={`${styles.content_wrap}`}>
											<p className="text_reg color_dark_gray">
												Robust, transparent analysis, widely used and trusted amongst major
												market participants and bankable forecasts.
											</p>
											<div className={`${styles.bookBtn} pt_20`}>
												<Button color="secondary" variant="underline">
													Know more
												</Button>
											</div>
										</div>
									),
								},
								{
									title: "Flexible Energy Service",
									imgIcons: power.src,
									children: (
										<div className={`${styles.content_wrap}`}>
											<p className="text_reg color_dark_gray">
												Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam.
											</p>
											<div className={`${styles.bookBtn} pt_20`}>
												<Button color="secondary" variant="underline">
													Know more
												</Button>
											</div>
										</div>
									),
								},
								{
									title: "Hydrogen Service",
									imgIcons: power.src,
									children: (
										<div className={`${styles.content_wrap}`}>
											<p className="text_reg color_dark_gray">
												Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam.
											</p>
											<div className={`${styles.bookBtn} pt_20`}>
												<Button color="secondary" variant="underline">
													Know more
												</Button>
											</div>
										</div>
									),
								},
								{
									title: "Amun – Wind Valuation Software",
									imgIcons: power.src,
									children: (
										<div className={`${styles.content_wrap}`}>
											<p className="text_reg color_dark_gray">
												Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam.
											</p>
											<div className={`${styles.bookBtn} pt_20`}>
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
		</section>
	);
}
