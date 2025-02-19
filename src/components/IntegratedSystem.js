// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";
import AccordianCommon from "@/components/AccordianCommon";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/components/IntegratedSystem.module.scss";

// IMAGES //
import system_one from "../../public/img/softwares/system_one.jpg";
import amun_logo from "../../public/img/softwares/amun_logo.png";
import hover_arrow from "../../public/img/softwares/hover_arrow.svg";

// DATA //

/** IntegratedSystem Section */
export default function IntegratedSystem() {
	return (
		<section className={`${styles.IntegratedSystem} pb_100`}>
			<div className="container">
				<div className={`${styles.integratedSystemFlex} f_w_j`}>
					<div className={`${styles.title_wrap}`}>
						<h2 className="text_xl font_primary f_w_s_b color_secondary pb_20">
							Integrated system, endless possibilities
						</h2>
						<p className="text_reg color_dark_gray">
							Chronos is just one part of Aurora’s EOS Platform, a software designed to
							tackle every energy challenge. From scenario modelling to bespoke
							advisory services, we’re your partner in progress.
						</p>
						<div className={`${styles.bookBtn} pt_30`}>
							<Button color="secondary" variant="filled" shape="rounded">
								Explore More
							</Button>
						</div>
					</div>
					<div className={`${styles.integratedImgMain}`}>
						<div className={`${styles.integratedImgBox} f_w`}>
							<div className={`${styles.itemBox}`}>
								<img
									src={system_one.src}
									className={`${styles.imgOne} b_r_t_l`}
									alt="img"
								/>
							</div>
							<div className={`${styles.itemBox}`}>
								<img src={amun_logo.src} className={`${styles.centerLogo}`} alt="img" />
								<div className={`${styles.hoverBox}`}>
									<a href="#" className="text_xs text_uppercase f_w_m">
										Know More
										<img src={hover_arrow.src} className="" alt="img" />
									</a>
								</div>
							</div>
							<div className={`${styles.itemBox}`}>
								<img
									src={system_one.src}
									className={`${styles.imgOne} b_r_t_r`}
									alt="img"
								/>
							</div>
							<div className={`${styles.itemBox}`}>
								<img src={amun_logo.src} className={`${styles.centerLogo}`} alt="img" />
								<div className={`${styles.hoverBox}`}>
									<a href="#" className="text_xs text_uppercase f_w_m">
										Know More
										<img src={hover_arrow.src} className="" alt="img" />
									</a>
								</div>
							</div>
							<div className={`${styles.itemBox}`}>
								<img src={system_one.src} className={`${styles.imgOne}`} alt="img" />
							</div>
							<div className={`${styles.itemBox}`}>
								<img src={amun_logo.src} className={`${styles.centerLogo}`} alt="img" />
								<div className={`${styles.hoverBox}`}>
									<a href="#" className="text_xs text_uppercase f_w_m">
										Know More
										<img src={hover_arrow.src} className="" alt="img" />
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
