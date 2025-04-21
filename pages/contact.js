// MODULES //

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import Button from "@/components/Buttons/Button";
import AccordianCommon from "@/components/AccordianCommon";
import InnerBanner from "@/components/InnerBanner";
import SoftwareCards from "@/components/SoftwareCards";

// SECTIONS //

// PLUGINS //

// STYLES //
import styles from "@/styles/pages/Contact.module.scss";

// UTILS //

// IMAGES //
import call_icon from "../public/img/icons/call_icon.svg";
import location from "../public/img/icons/location.svg";
import country_thumb from "@/../public/img/global-presence/country_thumb.jpg";
import hoverBg from "@/../public/img/contact/hoverBg.png";

// DATA //

/** Contact Page */
export default function ContactPage() {
	return (
		<div>
			{/* Metatags */}
			<MetaTags Title={"Contact"} Desc={""} OgImg={""} Url={"/contact"} />

			{/* Header */}
			{/* <Header /> */}

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
								<iframe
									src="../../../img/softwares/form.html"
									className={`${styles.form_img}`}
									title="Form"
								></iframe>
							</div>
						</div>
					</div>
				</div>
				<section className={`${styles.CountryMain} pb_100`}>
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
														<img
															src={hoverBg.src}
															className={`${styles.hoverBg} width_100 b_r_10`}
															alt="img"
														/>
														<div className={`${styles.countryImg}`}>
															<img
																src={country_thumb.src}
																className="width_100 b_r_10"
																alt="img"
															/>
														</div>
														<div className="f_j a_center pt_10">
															<h5 className="text_reg font_primary f_w_m color_secondary ">
																India
															</h5>
															<Button color="secondary" variant="underline" size="xs">
																View Map
															</Button>
														</div>
														<p
															className={`${styles.address} d_f color_dark_gray text_xs pt_10`}
														>
															<img src={location.src} className="" alt="img" />
															<span>
																St Aldates Chambers, 109-113 St Aldates, Oxford, OX1 1DS, UK
															</span>
														</p>
														<a
															href="tel:+441865952700"
															className={`${styles.address} d_f color_dark_gray text_xs pt_10`}
														>
															<img src={call_icon.src} className="" alt="img" />
															<span>+44 1865 952700</span>
														</a>
													</div>
													<div className={`${styles.CountryItem}`}>
														<img
															src={hoverBg.src}
															className={`${styles.hoverBg} width_100 b_r_10`}
															alt="img"
														/>
														<div className={`${styles.countryImg}`}>
															<img
																src={country_thumb.src}
																className="width_100 b_r_10"
																alt="img"
															/>
														</div>
														<div className="f_j a_center pt_10">
															<h5 className="text_reg font_primary f_w_m color_secondary ">
																India
															</h5>
															<Button color="secondary" variant="underline" size="xs">
																View Map
															</Button>
														</div>
														<p
															className={`${styles.address} d_f color_dark_gray text_xs pt_10`}
														>
															<img src={location.src} className="" alt="img" />
															<span>
																St Aldates Chambers, 109-113 St Aldates, Oxford, OX1 1DS, UK
															</span>
														</p>
														<a
															href="tel:+441865952700"
															className={`${styles.address} d_f color_dark_gray text_xs pt_10`}
														>
															<img src={call_icon.src} className="" alt="img" />
															<span>+44 1865 952700</span>
														</a>
													</div>
													<div className={`${styles.CountryItem}`}>
														<img
															src={hoverBg.src}
															className={`${styles.hoverBg} width_100 b_r_10`}
															alt="img"
														/>
														<div className={`${styles.countryImg}`}>
															<img
																src={country_thumb.src}
																className="width_100 b_r_10"
																alt="img"
															/>
														</div>
														<div className="f_j a_center pt_10">
															<h5 className="text_reg font_primary f_w_m color_secondary ">
																India
															</h5>
															<Button color="secondary" variant="underline" size="xs">
																View Map
															</Button>
														</div>
														<p
															className={`${styles.address} d_f color_dark_gray text_xs pt_10`}
														>
															<img src={location.src} className="" alt="img" />
															<span>
																St Aldates Chambers, 109-113 St Aldates, Oxford, OX1 1DS, UK
															</span>
														</p>
														<a
															href="tel:+441865952700"
															className={`${styles.address} d_f color_dark_gray text_xs pt_10`}
														>
															<img src={call_icon.src} className="" alt="img" />
															<span>+44 1865 952700</span>
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
														<img
															src={hoverBg.src}
															className={`${styles.hoverBg} width_100 b_r_10`}
															alt="img"
														/>
														<div className={`${styles.countryImg}`}>
															<img
																src={country_thumb.src}
																className="width_100 b_r_10"
																alt="img"
															/>
														</div>
														<div className="f_j a_center pt_10">
															<h5 className="text_reg font_primary f_w_m color_secondary ">
																India
															</h5>
															<Button color="secondary" variant="underline" size="xs">
																View Map
															</Button>
														</div>
														<p
															className={`${styles.address} d_f color_dark_gray text_xs pt_10`}
														>
															<img src={location.src} className="" alt="img" />
															<span>
																St Aldates Chambers, 109-113 St Aldates, Oxford, OX1 1DS, UK
															</span>
														</p>
														<a
															href="tel:+441865952700"
															className={`${styles.address} d_f color_dark_gray text_xs pt_10`}
														>
															<img src={call_icon.src} className="" alt="img" />
															<span>+44 1865 952700</span>
														</a>
													</div>
													<div className={`${styles.CountryItem}`}>
														<img
															src={hoverBg.src}
															className={`${styles.hoverBg} width_100 b_r_10`}
															alt="img"
														/>
														<div className={`${styles.countryImg}`}>
															<img
																src={country_thumb.src}
																className="width_100 b_r_10"
																alt="img"
															/>
														</div>
														<div className="f_j a_center pt_10">
															<h5 className="text_reg font_primary f_w_m color_secondary ">
																India
															</h5>
															<Button color="secondary" variant="underline" size="xs">
																View Map
															</Button>
														</div>
														<p
															className={`${styles.address} d_f color_dark_gray text_xs pt_10`}
														>
															<img src={location.src} className="" alt="img" />
															<span>
																St Aldates Chambers, 109-113 St Aldates, Oxford, OX1 1DS, UK
															</span>
														</p>
														<a
															href="tel:+441865952700"
															className={`${styles.address} d_f color_dark_gray text_xs pt_10`}
														>
															<img src={call_icon.src} className="" alt="img" />
															<span>+44 1865 952700</span>
														</a>
													</div>
													<div className={`${styles.CountryItem}`}>
														<img
															src={hoverBg.src}
															className={`${styles.hoverBg} width_100 b_r_10`}
															alt="img"
														/>
														<div className={`${styles.countryImg}`}>
															<img
																src={country_thumb.src}
																className="width_100 b_r_10"
																alt="img"
															/>
														</div>
														<div className="f_j a_center pt_10">
															<h5 className="text_reg font_primary f_w_m color_secondary ">
																India
															</h5>
															<Button color="secondary" variant="underline" size="xs">
																View Map
															</Button>
														</div>
														<p
															className={`${styles.address} d_f color_dark_gray text_xs pt_10`}
														>
															<img src={location.src} className="" alt="img" />
															<span>
																St Aldates Chambers, 109-113 St Aldates, Oxford, OX1 1DS, UK
															</span>
														</p>
														<a
															href="tel:+441865952700"
															className={`${styles.address} d_f color_dark_gray text_xs pt_10`}
														>
															<img src={call_icon.src} className="" alt="img" />
															<span>+44 1865 952700</span>
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
														<img
															src={hoverBg.src}
															className={`${styles.hoverBg} width_100 b_r_10`}
															alt="img"
														/>
														<div className={`${styles.countryImg}`}>
															<img
																src={country_thumb.src}
																className="width_100 b_r_10"
																alt="img"
															/>
														</div>
														<div className="f_j a_center pt_10">
															<h5 className="text_reg font_primary f_w_m color_secondary ">
																India
															</h5>
															<Button color="secondary" variant="underline" size="xs">
																View Map
															</Button>
														</div>
														<p
															className={`${styles.address} d_f color_dark_gray text_xs pt_10`}
														>
															<img src={location.src} className="" alt="img" />
															<span>
																St Aldates Chambers, 109-113 St Aldates, Oxford, OX1 1DS, UK
															</span>
														</p>
														<a
															href="tel:+441865952700"
															className={`${styles.address} d_f color_dark_gray text_xs pt_10`}
														>
															<img src={call_icon.src} className="" alt="img" />
															<span>+44 1865 952700</span>
														</a>
													</div>
													<div className={`${styles.CountryItem}`}>
														<img
															src={hoverBg.src}
															className={`${styles.hoverBg} width_100 b_r_10`}
															alt="img"
														/>
														<div className={`${styles.countryImg}`}>
															<img
																src={country_thumb.src}
																className="width_100 b_r_10"
																alt="img"
															/>
														</div>
														<div className="f_j a_center pt_10">
															<h5 className="text_reg font_primary f_w_m color_secondary ">
																India
															</h5>
															<Button color="secondary" variant="underline" size="xs">
																View Map
															</Button>
														</div>
														<p
															className={`${styles.address} d_f color_dark_gray text_xs pt_10`}
														>
															<img src={location.src} className="" alt="img" />
															<span>
																St Aldates Chambers, 109-113 St Aldates, Oxford, OX1 1DS, UK
															</span>
														</p>
														<a
															href="tel:+441865952700"
															className={`${styles.address} d_f color_dark_gray text_xs pt_10`}
														>
															<img src={call_icon.src} className="" alt="img" />
															<span>+44 1865 952700</span>
														</a>
													</div>
													<div className={`${styles.CountryItem}`}>
														<img
															src={hoverBg.src}
															className={`${styles.hoverBg} width_100 b_r_10`}
															alt="img"
														/>
														<div className={`${styles.countryImg}`}>
															<img
																src={country_thumb.src}
																className="width_100 b_r_10"
																alt="img"
															/>
														</div>
														<div className="f_j a_center pt_10">
															<h5 className="text_reg font_primary f_w_m color_secondary ">
																India
															</h5>
															<Button color="secondary" variant="underline" size="xs">
																View Map
															</Button>
														</div>
														<p
															className={`${styles.address} d_f color_dark_gray text_xs pt_10`}
														>
															<img src={location.src} className="" alt="img" />
															<span>
																St Aldates Chambers, 109-113 St Aldates, Oxford, OX1 1DS, UK
															</span>
														</p>
														<a
															href="tel:+441865952700"
															className={`${styles.address} d_f color_dark_gray text_xs pt_10`}
														>
															<img src={call_icon.src} className="" alt="img" />
															<span>+44 1865 952700</span>
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
				<div className="pb_100">
					<SoftwareCards />
				</div>
			</main>
			{/* Page Content ends here */}

			{/* Footer */}
			<Footer />
		</div>
	);
}
