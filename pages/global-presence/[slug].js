// MODULES //
import { useState } from "react";

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import Button from "@/components/Buttons/Button";
import SectionsHeader from "@/components/SectionsHeader";
import InnerBanner from "@/components/InnerBanner";
import Insights from "@/components/Insights";
import TrustedLeaders from "@/components/TrustedLeaders";
import TestimonialFeedback from "@/components/TestimonialFeedback";
import ServicesCircle from "@/components/ServicesCircle";
import EosIntegratedSystem from "@/components/EosIntegratedSystem";

// SECTIONS //
import ProductSlider from "@/sections/global-presence/ProductSlider";
import Introduction from "@/sections/global-presence/Introduction";
import WhichProducts from "@/sections/global-presence/WhichProducts";
import PublicWebinar from "@/sections/global-presence/PublicWebinar";
import SoftwareMarket from "@/sections/softwares/SoftwareMarket";

// PLUGINS //
import { Link, scroller } from "react-scroll";

// UTILS //
import { getMapJsonForCountries, getMapJsonForProducts } from "@/utils";

// STYLES //
import styles from "@/styles/pages/global-presence/Australia.module.scss";

// IMAGES //
import desktop_banner from "@/../public/img/global-presence/desktop_banner.jpg";

// DATA //

// SERVICES //
import {
	getCountryInside,
	getRegions,
} from "@/services/GlobalPresence.service";

import {
	getCountryInside as getCountryInsideWithLanguages,
	getRegions as getRegionsWithLanguages,
} from "@/services/GlobalPresenceLanguages.service";

/** Fetch  */
export async function getServerSideProps({ params, query }) {
	const language = query.language;
	let data, countryBy, mapJson;

	if (language && language === "jp") {
		// Fetch Japanese data
		[data] = await Promise.all([getCountryInsideWithLanguages(params.slug)]);
		countryBy = data?.data?.countryBy?.translations?.[0];
		mapJson = getMapJsonForCountries(countryBy?.countries?.map || []);
	} else {
		// Default fetch
		[data] = await Promise.all([getCountryInside(params.slug)]);
		countryBy = data?.data?.countryBy;
		mapJson = getMapJsonForCountries(countryBy?.countries?.map || []);
	}

	// Return 404 if no valid data
	if (!countryBy) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			data: countryBy,
			mapJson,
		},
	};
}

/** Australia Page */
export default function Australia({ data, mapJson }) {
	const [isFormVisible, setIsFormVisible] = useState(false); // Form hidden by default

	/** scrollToSection */
	const scrollToSection = (id) => {
		scroller.scrollTo(id, {
			duration: 500,
			smooth: true,
			offset: -100,
			spy: true,
			onEnd: () => console.log("Scrolling finished!"), // ❌ Not available directly
		});

		setTimeout(() => {
			setIsFormVisible(true);
			console.log("Scrolling finished!");
		}, 500);
	};

	const headerArray = [
		{ name: "Expertise", id: "#expertise" },
		{ name: "Available Regions", id: "#availableregions" },
		{ name: "Why Aurora", id: "#whyaurora" },
		{ name: "Clients", id: "#clients" },
		<div key="btn" to="Insights" onClick={() => scrollToSection("Insights")}>
			<Button color="primary" variant="filled" shape="rounded">
				Book a Demo
			</Button>
		</div>,
	];

	return (
		<div>
			{/* Metatags */}
			<MetaTags
				Title={data.title}
				Desc={""}
				OgImg={""}
				Url={`/global-presense/${data.slug}`}
			/>

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.AustraliaPage}>
				<div>
					<InnerBanner
						bannerTitle={
							data.countries.bannerSection.title ||
							"Lorem ipsum dolor sit amet consectetur."
						}
						bannerDescription={
							data.countries.bannerSection.description ||
							"Lorem ipsum dolor sit amet consectetur. Elementum ullamcorper nec sodales mi. Tellus imperdiet volutpat dui ipsum massa. In tincidunt tortor elit suspendisse arcu massa fusce. Urna lectus ullamcorper est eu quis lectus tortor nam."
						}
						btnTxt="Get in Touch"
						desktopImage={
							data.countries.bannerSection?.image?.node?.sourceUrl ||
							desktop_banner.src
						}
						mobileImage={
							data.countries.bannerSection.mobileImage?.node?.sourceUrl ||
							desktop_banner.src
						}
					/>
				</div>
				<div className="pb_40">
					<ProductSlider data={data.countries.announcement.slide} />
				</div>
				<SectionsHeader data={headerArray} />
				<Introduction data={data.countries.introduction} />
				<div className="pb_100">
					<WhichProducts data={data.countries.map} />
				</div>
				<ServicesCircle data={data.countries.keyAdvantages} />
				<div className="ptb_100">
					<SoftwareMarket
						sectionTitle="Energy intelligence across every key market"
						mapJson={mapJson}
					/>
				</div>
				<div className="pb_100">
					<TrustedLeaders data={data.countries.ourClients} />
				</div>
				<div className="pb_100">
					<TestimonialFeedback data={data.countries.ourClients} />
				</div>
				<div className="pb_100">
					<PublicWebinar />
				</div>

				<div className={`${styles.insightBg} pb_100 pt_30`}>
					<div className={`${styles.boxBg}`}>
						<div className="pb_100">
							<Insights
								isFormVisible={isFormVisible}
								setIsFormVisible={setIsFormVisible}
								isPowerBgVisible={true}
								isInsightsBlogsVisible={true}
							/>
						</div>
					</div>
					<EosIntegratedSystem />
				</div>
			</main>
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
