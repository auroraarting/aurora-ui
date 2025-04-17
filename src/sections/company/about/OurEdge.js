// MODULES //
import { useEffect, useState, useRef } from "react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";

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
export default function OurEdge() {
	return (
		<section className={`${styles.OurEdge}`}>
			<div className="container">
				<div className={`${styles.OurEdgeFlex} f_w_j`}>
					<div className={`${styles.title_wrap}`}>
						<div className={`${styles.titleBox}`}>
							<h2 className="text_xl font_primary f_w_s_b color_secondary pb_20">
								Our edge
							</h2>
							<p className="text_reg color_dark_gray pb_20">
								Aurora works with leading finance, energy, utilities, and development
								organisations. Our expertise provides the insights needed to
							</p>
						</div>
					</div>
					<div className={`${styles.OurEdgeHistory}`}>
						<div className={`${styles.OurItem}`}>
							<div className={`${styles.OurEdgeBox} f_w_j`}>
								<div className={`${styles.iconBox}`}>
									<span className="f_r_aj_center">
										<img src={trusted.src} className={`${styles.icons} `} alt="icon" />
									</span>
								</div>
								<div className={`${styles.contentBox}`}>
									<h4 className="text_md f_w_m font_primary pb_20">
										Trusted energy analysts
									</h4>
									<p className="text_reg color_dark_gray">
										Our large team of power market experts produce critical analytics to
										almost all major market participants in Europe and Australia, and in
										the last 5 years we have been commercial/market advisor for more than
										200 transactions, totalling over €30bn.
									</p>
								</div>
							</div>
						</div>
						<div className={`${styles.OurItem}`}>
							<div className={`${styles.OurEdgeBox} f_w_j`}>
								<div className={`${styles.iconBox}`}>
									<span className="f_r_aj_center">
										<img src={rigorous.src} className={`${styles.icons} `} alt="icon" />
									</span>
								</div>
								<div className={`${styles.contentBox}`}>
									<h4 className="text_md f_w_m font_primary pb_20">
										Rigorous quantified insights
									</h4>
									<p className="text_reg color_dark_gray">
										Our in-house energy modelling suite forms the foundations of our
										expertise, continuously building its sophistication to reflect the
										ever-changing energy market complexities. Utilising the best
										methodologies ensures robust mapping of industry and market drivers
										and interaction, reliably removing many future uncertainties.
									</p>
								</div>
							</div>
						</div>
						<div className={`${styles.OurItem}`}>
							<div className={`${styles.OurEdgeBox} f_w_j`}>
								<div className={`${styles.iconBox}`}>
									<span className="f_r_aj_center">
										<img src={wholesale.src} className={`${styles.icons} `} alt="icon" />
									</span>
								</div>
								<div className={`${styles.contentBox}`}>
									<h4 className="text_md f_w_m font_primary pb_20">
										Wholesale market experts
									</h4>
									<p className="text_reg color_dark_gray">
										Our specialist country teams take pride in their detailed
										understanding of local regulations and market dynamics. This enables
										us to be at the forefront of tailored research in market developments,
										policy interpretation, and topical power market issues.
									</p>
								</div>
							</div>
						</div>
						<div className={`${styles.OurItem}`}>
							<div className={`${styles.OurEdgeBox} f_w_j`}>
								<div className={`${styles.iconBox}`}>
									<span className="f_r_aj_center">
										<img src={proximity.src} className={`${styles.icons} `} alt="icon" />
									</span>
								</div>
								<div className={`${styles.contentBox}`}>
									<h4 className="text_md f_w_m font_primary pb_20">
										Proximity drives insight
									</h4>
									<p className="text_reg color_dark_gray">
										Interaction and debate across a breadth of market participants helps
										us produce robust and transparent analysis, with forecasts grounded in
										reality. Close interaction with government gives us unmatched
										understanding of policy direction. Our unique events assemble senior
										decision makers from all major market participants and policy.
									</p>
								</div>
							</div>
						</div>
						<div className={`${styles.OurItem}`}>
							<div className={`${styles.OurEdgeBox} f_w_j`}>
								<div className={`${styles.iconBox}`}>
									<span className="f_r_aj_center">
										<img src={innovative.src} className={`${styles.icons} `} alt="icon" />
									</span>
								</div>
								<div className={`${styles.contentBox}`}>
									<h4 className="text_md f_w_m font_primary pb_20">
										Innovative market analysis
									</h4>
									<p className="text_reg color_dark_gray">
										We were first to model the GB capacity market, fully integrated with
										the wholesale market, to capture all interdependencies. We pioneered
										P10/P90 capture price analysis to assess and measure merchant risks in
										renewables. In our latest developments, our revolutionary software
										Amun provides site-specific wind valuation at the click of a button.
									</p>
								</div>
							</div>
						</div>
						<div className={`${styles.OurItem}`}>
							<div className={`${styles.OurEdgeBox} f_w_j`}>
								<div className={`${styles.iconBox}`}>
									<span className="f_r_aj_center">
										<img
											src={independent.src}
											className={`${styles.icons} `}
											alt="icon"
										/>
									</span>
								</div>
								<div className={`${styles.contentBox}`}>
									<h4 className="text_md f_w_m font_primary pb_20">
										Independent strategic challengers
									</h4>
									<p className="text_reg color_dark_gray">
										We bring hard evidence, unquestionable data and critical thinking to
										decision-making and wider debate. Our analysis influences major policy
										decisions on capacity market design, coal-exit and timeline decisions,
										interconnector de-rating, CfD design and funding, carbon pricing and
										much more.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
