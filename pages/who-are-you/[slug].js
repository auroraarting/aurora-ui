// MODULES //
import { useState } from "react";

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import TestimonialFeedback from "@/components/TestimonialFeedback";
import SectionsHeader from "@/components/SectionsHeader";
import InnerBanner from "@/components/InnerBanner";
import Button from "@/components/Buttons/Button";
import TrustedLeaders from "@/components/TrustedLeaders";
import SmarterEnergy from "@/components/SmarterEnergy";
import Insights from "@/components/Insights";
import IntegratedSystem from "@/components/IntegratedSystem";
import GlobalMap from "@/components/GlobalMap";
import EosIntegratedSystem from "@/components/EosIntegratedSystem";

// SECTIONS //
import SoftwareMarket from "@/sections/softwares/SoftwareMarket";
import GloballyBankableInsights from "@/sections/softwares/GloballyBankableInsights";

// PLUGINS //
import { Link, scroller } from "react-scroll";

// UTILS //
import { getMapJsonForAllRegions } from "@/utils";

// STYLES //
import styles from "@/styles/pages/who-are-you/FinancialSector.module.scss";

// IMAGES //
import desktop_banner from "@/../public/img/financial-sector/desktop_banner.jpg";

// DATA //
import locationJson from "@/data/globalMap.json";

// SERVICES //
import {
	getSingleWhoAreYou,
	getWhoAreYous,
} from "@/services/WhoAreYou.service";
import { getRegions } from "@/services/GlobalPresence.service";

/** Fetch  */
export async function getServerSideProps({ params }) {
	const [data, services, regions] = await Promise.all([
		getSingleWhoAreYou(params.slug),
		getWhoAreYous(),
		getRegions(),
	]);
	const mapJson = getMapJsonForAllRegions(regions);

	return {
		props: {
			data: data.data.whoareyouBy,
			services: services.data.howWeHelps.nodes,
			mapJson,
			regions,
		},
	};
}

/** FinancialSector Page */
export default function Advisory({ data, services, mapJson, regions }) {
	console.log(data, "data");
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
				Get Started
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
				Url={`/who-are-you/${data.slug}`}
			/>

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.FinancialSectorPage}>
				<div className="pb_60">
					<InnerBanner
						// bannerTitle="Energy solutions for those who see beyond the grid"
						// bannerDescription="Aurora empowers industries with tailored energy intelligence, helping decision-makers drive impact, manage risks, and seize opportunities in a rapidly changing energy landscape."
						// btnTxt="Connect Now"
						// desktopImage={desktop_banner.src}
						// mobileImage={desktop_banner.src}

						bannerTitle={data.whoAreYous.banner.title}
						bannerDescription={data.whoAreYous.banner.description}
						desktopImage={data.whoAreYous.banner.desktopThumbnail.node.sourceUrl}
						mobileImage={data.whoAreYous.banner.mobileThumbnail.node.sourceUrl}
						vimeoid={data.whoAreYous.banner.videoLink}
						btnTxt="Connect Now"
					/>
				</div>
				<SectionsHeader data={headerArray} />
				<SmarterEnergy data={data.whoAreYous.expertise} />
				<div>
					<GlobalMap
						className="dark_bg"
						locationJson={mapJson}
						marqueeText={data?.whoAreYous?.availableRegions?.marqueeText}
					/>
				</div>
				<div>
					<GloballyBankableInsights isMultiple={true} />
				</div>

				<div className="ptb_100">
					<TrustedLeaders data={data.whoAreYous.ourClient} />
				</div>
				<div className="pb_100">
					<TestimonialFeedback data={data.whoAreYous.ourClient} />
				</div>
				<div className="ptb_100 dark_bg">
					<EosIntegratedSystem />
				</div>
				<div className="pb_100">
					<Insights
						isFormVisible={isFormVisible}
						setIsFormVisible={setIsFormVisible}
						isPowerBgVisible={true}
						isInsightsBlogsVisible={true}
					/>
				</div>
				<div className="pb_100">
					<IntegratedSystem />
				</div>
			</main>
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
