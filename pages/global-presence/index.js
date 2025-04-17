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
import { getMapJsonForAllRegions } from "@/utils";

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
	const mapJson = getMapJsonForAllRegions(regions);

	return { props: { regions, page: page.data.page.globalPresence, mapJson } };
}

/** GlobalPresence Page */
export default function GlobalPresence({ regions, page, mapJson }) {
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
												src={item2?.featuredImage?.node?.sourceUrl}
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

		setData({ regionsArr, mapJson, page });
	}, []);

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
			<Header />

			{/* Page Content starts here */}
			{data && (
				<main className={styles.GlobalPresencePage}>
					<InnerBanner
						bannerTitle={data.page.title}
						bannerDescription={data.page.description}
						showContentOnly
					/>

					<GlobalMap locationJson={mapJson} marqueeText={data.page.mapMarquee} />

					<section className={`${styles.CountryMain} ptb_100`}>
						<div className="container">
							<div className={`${styles.accordian_main}`}>
								{data.regionsArr && (
									<AccordianCommon
										fontStyle={"text_lg"}
										fontWeight={"f_w_s_b"}
										fontFamily={"font_primary"}
										fontColor={"color_secondary"}
										items={data.regionsArr}
									/>
								)}
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
