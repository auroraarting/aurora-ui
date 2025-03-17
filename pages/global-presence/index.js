// MODULES //
import { useEffect, useState } from "react";

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import InnerBanner from "@/components/InnerBanner";
import IntegratedSystem from "@/components/IntegratedSystem";
import Button from "@/components/Buttons/Button";
import AccordianCommon from "@/components/AccordianCommon";
import EosIntegratedSystem from "@/components/EosIntegratedSystem";

// SECTIONS //
import Map from "@/sections/global-presence/Map";

// PLUGINS //
import { Link, scroller } from "react-scroll";
import Marquee from "react-fast-marquee";

// UTILS //

// STYLES //
import styles from "@/styles/pages/global-presence/GlobalPresence.module.scss";

// IMAGES //
import country_thumb from "@/../public/img/global-presence/country_thumb.jpg";
import available_regions from "@/../public/img/global-presence/available_regions.jpg";
import slider_arrow from "../../public/img/icons/slider_arrow.svg";

// DATA //
import locationJson from "@/data/globalMap.json";

/** GlobalPresence Page */
export default function GlobalPresence() {
	const [visibleLocations, setVisibleLocations] = useState([]);
	const [visibleCountry, setVisibleCountry] = useState(""); // Stores the currently visible country
	const [mapCenter, setMapCenter] = useState(locationJson[0]?.centerOfCountry);
	const [valueOfSelect, setValueOfSelect] = useState(0);
	const [map, setMap] = useState(null);

	/** changeMapCenter */
	const changeMapCenter = (country) => {
		setMapCenter(locationJson[country.index]?.centerOfCountry);
		map.setZoom(locationJson[country.index]?.zoom || 4);
	};

	useEffect(() => {
		if (visibleCountry === "") {
			return;
		}
		const index = locationJson.findIndex((item) => item.name === visibleCountry);
		setValueOfSelect(index);
	}, [visibleCountry]);

	return (
		<div>
			{/* Metatags */}
			<MetaTags
				Title={"Global Presence"}
				Desc={""}
				OgImg={""}
				Url={"/global-presence"}
			/>

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.GlobalPresencePage}>
				<InnerBanner
					bannerTitle="Empowering markets globally"
					bannerDescription="Lorem ipsum dolor sit amet consectetur. Odio vel tortor lectus sit sagittis enim eu sed sed.. Sed pulvinar vestibulum lorem tristique vulputate bibendum.. Accumsan in sed."
					showContentOnly
				/>

				<section className={`${styles.globalMap} section_spacing`}>
					{/* <img src={available_regions.src} className="width_100" alt="img" /> */}
					{/* <div className="container"> */}
					<Marquee className="pb_40" speed={100}>
						<span className={`${styles.title} color_white text_xxl`}>
							{" Energy intelligence across every key market"}
						</span>
					</Marquee>

					<Map
						mapCenter={mapCenter}
						setVisibleLocations={setVisibleLocations}
						setVisibleCountry={setVisibleCountry}
						setValueOfSelect={setValueOfSelect}
						valueOfSelect={valueOfSelect}
						map={map}
						setMap={setMap}
						defaultZoom={2.2}
					/>
					{/* </div> */}
				</section>

				<section className={`${styles.CountryMain} ptb_100`}>
					<div className="container">
						<div className={`${styles.accordian_main}`}>
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

				<div className={`${styles.insightBg} ptb_80`}>
					<div className={`${styles.boxBg}`}></div>
					<EosIntegratedSystem />
				</div>
				<div className="ptb_100">
					<IntegratedSystem />
				</div>
			</main>
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
