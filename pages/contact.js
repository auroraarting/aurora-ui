// MODULES //

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import Button from "@/components/Buttons/Button";
import AccordianCommon from "@/components/AccordianCommon";
import InnerBanner from "@/components/InnerBanner";

// SECTIONS //

// PLUGINS //

// STYLES //
import styles from "@/styles/pages/Contact.module.scss";

// UTILS //

// IMAGES //
import close from "../public/img/icons/close.png";
import country_thumb from "@/../public/img/global-presence/country_thumb.jpg";
import slider_arrow from "../public/img/icons/slider_arrow.svg";

// DATA //

/** Contact Page */
export default function ContactPage() {
	return (
		<div>
			{/* Metatags */}
			<MetaTags Title={"Contact"} Desc={""} OgImg={""} Url={"/contact"} />

			{/* Header */}
			<Header />

			{/* Page Content starts here */}
			<main className={styles.ContactPage}>
				<div className={`${styles.topBg} ptb_100`}>
					<InnerBanner
						bannerTitle="Lorem ipsum dolor sit amet consectetur"
						bannerDescription="Lorem ipsum dolor sit amet consectetur. Elit massa a ut malesuada. Tincidunt pellentesque euismod morbi elit in tempor in. Ut elit in diam ut a mattis."
						showContentOnly
					/>
					<div className="container">
						<div className={`${styles.formFlex} f_j`}>
							<div className={`${styles.form_title}`}>
								<h2 className="text_lg font_primary f_w_s_b color_white pb_20">
									Have a question?
								</h2>
								<p className="text_reg color_silver_gray">
									Get in touch, we look forward to hearing from you.
								</p>
							</div>
							<div className={`${styles.formBox}`}>
								{/* <img
										src={form_img.src}
										className={`${styles.form_img}`}
										alt="form_img"
									/> */}
								<iframe
									src="../../../img/softwares/form.html"
									className={`${styles.form_img}`}
									title="Form"
								></iframe>
							</div>
						</div>
					</div>
				</div>
				<section className={`${styles.CountryMain} ptb_100`}>
					<div className="container">
						<div className={`${styles.accordian_main}`}>
							<h2 className="text_xl font_primary f_w_s_b color_secondary pb_20">
								Our Presence
							</h2>
							<AccordianCommon
								fontStyle={"text_lg"}
								fontWeight={"f_w_s_b"}
								fontFamily={"font_primary"}
								fontColor={"color_secondary"}
								items={[
									{
										title: "Asia",
										children: (
											<div className={`${styles.CountryWrapper}`}>
												<div className={`${styles.CountryBox}`}>
													<div className={`${styles.CountryItem}`}>
														<a href="">
															<img
																src={country_thumb.src}
																className="width_100 b_r_10"
																alt="img"
															/>
															<div className="f_j a_center pt_10">
																<h5 className="text_reg font_primary f_w_m color_secondary ">
																	India
																</h5>
																<span>
																	<img
																		src={slider_arrow.src}
																		className={`${styles.icon}`}
																		alt="arrow"
																	/>
																</span>
															</div>
														</a>
													</div>
													<div className={`${styles.CountryItem}`}>
														<a href="">
															<img
																src={country_thumb.src}
																className="width_100 b_r_10"
																alt="img"
															/>
															<div className="f_j a_center pt_10">
																<h5 className="text_reg font_primary f_w_m color_secondary ">
																	Japan
																</h5>
																<span>
																	<img
																		src={slider_arrow.src}
																		className={`${styles.icon}`}
																		alt="arrow"
																	/>
																</span>
															</div>
														</a>
													</div>
													<div className={`${styles.CountryItem}`}>
														<a href="">
															<img
																src={country_thumb.src}
																className="width_100 b_r_10"
																alt="img"
															/>
															<div className="f_j a_center pt_10">
																<h5 className="text_reg font_primary f_w_m color_secondary ">
																	Korea
																</h5>
																<span>
																	<img
																		src={slider_arrow.src}
																		className={`${styles.icon}`}
																		alt="arrow"
																	/>
																</span>
															</div>
														</a>
													</div>
													<div className={`${styles.CountryItem}`}>
														<a href="">
															<img
																src={country_thumb.src}
																className="width_100 b_r_10"
																alt="img"
															/>
															<div className="f_j a_center pt_10">
																<h5 className="text_reg font_primary f_w_m color_secondary ">
																	Philippines
																</h5>
																<span>
																	<img
																		src={slider_arrow.src}
																		className={`${styles.icon}`}
																		alt="arrow"
																	/>
																</span>
															</div>
														</a>
													</div>
												</div>
											</div>
										),
									},
									{
										title: "Australia",
										children: (
											<div className={`${styles.CountryWrapper}`}>
												<div className={`${styles.CountryBox}`}>
													<div className={`${styles.CountryItem}`}>
														<a href="">
															<img
																src={country_thumb.src}
																className="width_100 b_r_10"
																alt="img"
															/>
															<div className="f_j a_center pt_10">
																<h5 className="text_reg font_primary f_w_m color_secondary ">
																	India
																</h5>
																<span>
																	<img
																		src={slider_arrow.src}
																		className={`${styles.icon}`}
																		alt="arrow"
																	/>
																</span>
															</div>
														</a>
													</div>
													<div className={`${styles.CountryItem}`}>
														<a href="">
															<img
																src={country_thumb.src}
																className="width_100 b_r_10"
																alt="img"
															/>
															<div className="f_j a_center pt_10">
																<h5 className="text_reg font_primary f_w_m color_secondary ">
																	Japan
																</h5>
																<span>
																	<img
																		src={slider_arrow.src}
																		className={`${styles.icon}`}
																		alt="arrow"
																	/>
																</span>
															</div>
														</a>
													</div>
													<div className={`${styles.CountryItem}`}>
														<a href="">
															<img
																src={country_thumb.src}
																className="width_100 b_r_10"
																alt="img"
															/>
															<div className="f_j a_center pt_10">
																<h5 className="text_reg font_primary f_w_m color_secondary ">
																	Korea
																</h5>
																<span>
																	<img
																		src={slider_arrow.src}
																		className={`${styles.icon}`}
																		alt="arrow"
																	/>
																</span>
															</div>
														</a>
													</div>
													<div className={`${styles.CountryItem}`}>
														<a href="">
															<img
																src={country_thumb.src}
																className="width_100 b_r_10"
																alt="img"
															/>
															<div className="f_j a_center pt_10">
																<h5 className="text_reg font_primary f_w_m color_secondary ">
																	Philippines
																</h5>
																<span>
																	<img
																		src={slider_arrow.src}
																		className={`${styles.icon}`}
																		alt="arrow"
																	/>
																</span>
															</div>
														</a>
													</div>
												</div>
											</div>
										),
									},
									{
										title: "Europe",
										children: (
											<div className={`${styles.CountryWrapper}`}>
												<div className={`${styles.CountryBox}`}>
													<div className={`${styles.CountryItem}`}>
														<a href="">
															<img
																src={country_thumb.src}
																className="width_100 b_r_10"
																alt="img"
															/>
															<div className="f_j a_center pt_10">
																<h5 className="text_reg font_primary f_w_m color_secondary ">
																	India
																</h5>
																<span>
																	<img
																		src={slider_arrow.src}
																		className={`${styles.icon}`}
																		alt="arrow"
																	/>
																</span>
															</div>
														</a>
													</div>
													<div className={`${styles.CountryItem}`}>
														<a href="">
															<img
																src={country_thumb.src}
																className="width_100 b_r_10"
																alt="img"
															/>
															<div className="f_j a_center pt_10">
																<h5 className="text_reg font_primary f_w_m color_secondary ">
																	Japan
																</h5>
																<span>
																	<img
																		src={slider_arrow.src}
																		className={`${styles.icon}`}
																		alt="arrow"
																	/>
																</span>
															</div>
														</a>
													</div>
													<div className={`${styles.CountryItem}`}>
														<a href="">
															<img
																src={country_thumb.src}
																className="width_100 b_r_10"
																alt="img"
															/>
															<div className="f_j a_center pt_10">
																<h5 className="text_reg font_primary f_w_m color_secondary ">
																	Korea
																</h5>
																<span>
																	<img
																		src={slider_arrow.src}
																		className={`${styles.icon}`}
																		alt="arrow"
																	/>
																</span>
															</div>
														</a>
													</div>
													<div className={`${styles.CountryItem}`}>
														<a href="">
															<img
																src={country_thumb.src}
																className="width_100 b_r_10"
																alt="img"
															/>
															<div className="f_j a_center pt_10">
																<h5 className="text_reg font_primary f_w_m color_secondary ">
																	Philippines
																</h5>
																<span>
																	<img
																		src={slider_arrow.src}
																		className={`${styles.icon}`}
																		alt="arrow"
																	/>
																</span>
															</div>
														</a>
													</div>
												</div>
											</div>
										),
									},
								]}
							/>
						</div>
					</div>
				</section>
			</main>
			{/* Page Content ends here */}

			{/* Footer */}
			<Footer />
		</div>
	);
}
