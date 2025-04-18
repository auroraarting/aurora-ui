// MODULES //
import { useEffect, useState } from "react";

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import Button from "@/components/Buttons/Button";
import GlobalMap from "@/components/GlobalMap";
import TrustedLeaders from "@/components/TrustedLeaders";
import TestimonialFeedback from "@/components/TestimonialFeedback";
import ServicesCircle from "@/components/ServicesCircle";
import SmarterEnergy from "@/components/SmarterEnergy";
import Insights from "@/components/Insights";
import SectionsHeader from "@/components/SectionsHeader";
import EventSmarterEnergy from "@/components/EventSmarterEnergy";
import SoftwareCards from "@/components/SoftwareCards";

// SECTIONS //
import EosBanner from "@/sections/eos/EosBanner";
import GloballyBankableInsights from "@/sections/softwares/GloballyBankableInsights";

// PLUGINS //
import { Link, scroller } from "react-scroll";

// UTILS //
import {
	filterMarkersBySlug,
	getMapJsonForAllRegions,
	getMapJsonForCountries,
	getMapJsonForProducts,
} from "@/utils";

// STYLES //
import styles from "@/styles/pages/Eos.module.scss";

// IMAGES //

// DATA //
import locationJson from "@/data/globalMap.json";
import CuttingEdgeModels from "@/sections/eos/CuttingEdgeModels";

// SERVICES //
import { getRegions } from "@/services/GlobalPresence.service";
import { getEosPage } from "@/services/Eos.service";

/** Fetch  */
export async function getServerSideProps() {
	const [data, regions] = await Promise.all([getEosPage(), getRegions()]);
	const mapJson = getMapJsonForAllRegions(regions);
	return { props: { data: data.data.page.eos, mapJson } };
}

/** EOS Page */
export default function EOSPage({ data, mapJson }) {
	console.log(data);
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
			<MetaTags Title={"EOS"} Desc={""} OgImg={""} Url={"/eos"} />

			{/* Header */}
			<Header />

			{/* Page eos starts here */}
			<main className={styles.EOSPage}>
				<div>
					<EosBanner
						bannerTitle={data?.banner?.title}
						bannerDescription={data?.banner?.description}
						btnTxt={data?.banner?.buttonText}
						btnLink={data?.banner?.buttonLink}
						desktopImage={data?.banner?.desktopThumbnail?.node?.sourceUrl}
						mobileImage={data?.banner?.mobileThumbnail?.node?.sourceUrl}
						videoSrc={data?.banner?.vimeoLink}
						vimeoid={data?.banner?.vimeoLink}
						logo={data?.banner?.logo?.node?.sourceUrl}
					/>
				</div>
				<SectionsHeader data={headerArray} />
				<GlobalMap locationJson={mapJson} />
				{/* <div className="ptb_100">
					<SoftwareMarket />
				</div> */}
				<div>
					<SmarterEnergy data={data.expertise} />
				</div>
				<ServicesCircle data={data.keyAdvantages} />
				{data.trustedModels.sectionTitle && (
					<div className="pt_100">
						<CuttingEdgeModels data={data.trustedModels} />
					</div>
				)}
				{data.ourClient.selectLogos && (
					<div className="ptb_100">
						<TrustedLeaders data={data.ourClient} />
					</div>
				)}
				{data.ourClient.testimonials && (
					<div className="pb_100">
						<TestimonialFeedback data={data.ourClient} />
					</div>
				)}
				<div className={`${styles.insightBg} pt_30`}>
					<div>
						<div className="pb_100">
							<Insights
								isFormVisible={isFormVisible}
								setIsFormVisible={setIsFormVisible}
								isPowerBgVisible={true}
								isInsightsBlogsVisible={true}
							/>
						</div>
					</div>
					{/* <div className={`${styles.boxBg} pb_100`}>
						<EventSmarterEnergy />
					</div> */}
				</div>
				<div className="ptb_100">
					<SoftwareCards />
				</div>
			</main>
			{/* Page eos ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
