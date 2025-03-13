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
import power from "../../../public/img/global-presence/power.svg";
import energy from "../../../public/img/global-presence/energy.svg";
import hydrogen from "../../../public/img/global-presence/hydrogen.svg";
import valuation from "../../../public/img/global-presence/valuation.svg";

// DATA //

/** WhichProducts Section */
export default function WhichProducts() {
	return (
		<section className={`${styles.WhichProducts}`}>
			<div className="container">
				<div className={`${styles.titleTxt} pb_30`}>
					<h2 className="text_xl font_primary f_w_m color_secondary">
						Which products are available
					</h2>
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
									imgIcons: energy.src,
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
									imgIcons: hydrogen.src,
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
									imgIcons: valuation.src,
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
