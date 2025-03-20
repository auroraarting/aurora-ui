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
import GlobalMap from "@/components/GlobalMap";

// SECTIONS //
import Map from "@/components/MapContainer";

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

// SERVICES //
import {
	getGlobalPresencePage,
	getRegions,
} from "@/services/GlobalPresence.service";

/** Fetch  */
export async function getServerSideProps() {
	// const regions = await getRegions();
	// const page = await getGlobalPresencePage();
	const [regions, page] = await Promise.all([
		getRegions(),
		getGlobalPresencePage(),
	]);

	return { props: { regions, page: page.data.page.globalPresence } };
}

/** GlobalPresence Page */
export default function GlobalPresence({ regions, page }) {
	const [data, setData] = useState();

	useEffect(() => {
		const regionsArr = regions?.data?.regions?.nodes?.map((item) => {
			let obj = {};

			obj.title = item.name;
			if (item.countries?.nodes.length > 0) {
				obj.children = (
					<div className={`${styles.CountryWrapper}`}>
						<div className={`${styles.CountryBox}`}>
							{item.countries?.nodes?.map((item2) => {
								return (
									<div className={`${styles.CountryItem}`} key={item2.slug}>
										<a href={`/global-presence/${item2.slug}`}>
											<img
												src={item2?.countries?.bannerSection?.image?.node?.sourceUrl}
												className="width_100 b_r_10"
												alt="img"
											/>
											<div className="f_j a_center pt_10">
												<h5 className="text_reg font_primary f_w_m color_secondary ">
													{item2.title}
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
								);
							})}
						</div>
					</div>
				);
			}
			return obj;
		});
		const mapJson = [];
		regions?.data?.regions?.nodes?.map((item) => {
			item.countries.nodes.map((item2) => {
				let obj = {
					// centerOfCountry: {
					// 	lat: parseFloat(item2.countries.map.countryPin.lat),
					// 	lng: parseFloat(item2.countries.map.countryPin.lng),
					// },
					centerOfCountry: { lat: 18.1307561, lng: 23.554042 },
					markers: item2.countries.map?.markers?.map((item3) => {
						let obj2 = {
							name: "",
							lat: "",
							lng: "",
							url: "",
							hoverImg: "",
							icon: item3.icon.node.sourceUrl,
						};

						if (item3?.mapThumbnail?.node?.sourceUrl) {
							obj2.hoverImg = item3.mapThumbnail.node.sourceUrl;
						}

						if (item3.category.nodes.length > 0) {
							let node = item3.category.nodes[0];
							obj2.name = node.title;
							obj2.lat = parseFloat(node.banner.map.lat);
							obj2.lng = parseFloat(node.banner.map.lng);
							obj2.url = `/${node.contentType.node.name}/${node.slug}`;
						}

						return obj2;
					}),
					zoom: item2.countries.map.zoom,
					name: item2.title,
				};

				mapJson.push(obj);
			});
		});

		setData({ regionsArr, mapJson, page });
	}, []);

	console.log(data);

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
			{data && (
				<main className={styles.GlobalPresencePage}>
					<InnerBanner
						bannerTitle={data.page.title}
						bannerDescription={data.page.description}
						showContentOnly
					/>

					<GlobalMap
						locationJson={data.mapJson}
						marqueeText={data.page.mapMarquee}
					/>

					<section className={`${styles.CountryMain} ptb_100`}>
						<div className="container">
							<div className={`${styles.accordian_main}`}>
								<AccordianCommon
									fontStyle={"text_lg"}
									fontWeight={"f_w_s_b"}
									fontFamily={"font_primary"}
									fontColor={"color_secondary"}
									items={data.regionsArr}
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
			)}
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
