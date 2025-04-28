/* eslint-disable quotes */
// MODULES //
import { useEffect, useState } from "react";

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import Button from "@/components/Buttons/Button";
import InnerBanner from "@/components/InnerBanner";
import ServicesCircle from "@/components/ServicesCircle";
import SmarterEnergy from "@/components/SmarterEnergy";
import IntegratedSystem from "@/components/IntegratedSystem";
import Insights from "@/components/Insights";
// SECTIONS //
import SectionsHeader from "@/components/SectionsHeader";
import WhatWeLook from "@/sections/careers/WhatWeLook";
import EventsInsideBanner from "@/sections/events/EventsInsideBanner";
import AboutCountries from "@/sections/careers/AboutCountries";
import AllVideos from "@/components/AllVideos";
import WorkingTeams from "@/sections/careers/WorkingTeams";
import ConnectWithUs from "@/sections/careers/ConnectWithUs";
import EarlyCareersInside from "@/sections/careers/EarlyCareersInside";
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
import styles from "@/styles/pages/careers/early-careers/EarlyCareers.module.scss";

// IMAGES //
import desktop_banner from "@/../public/img/careers/early_careers/desktop_banner.jpg";
import IconStrategy from "@/../public/img/softwares/Icon-Strategy.svg";

// DATA //

// SERVICES //
import { getLifeAtAurora } from "@/services/Careers.service";
import {
	getInsights,
	getInsightsCategories,
} from "@/services/Insights.service";

/** Fetch  */
export async function getServerSideProps() {
	const [data] = await Promise.all([getLifeAtAurora()]);
	let obj = {
		data: { ...data.data.page.lifeAtAurora, offices: data.data.offices.nodes },
	};
	delete obj.data.lifeAtAurora;
	const [categoriesForSelect, list] = await Promise.all([
		getInsightsCategories(),
		getInsights('first: 3, where: {categoryName: ""}'),
	]);
	const otherList = list?.data?.posts?.nodes;
	const countries = categoriesForSelect.data.countries.nodes;
	return { props: { ...obj, otherList, countries } };
}

/** EarlyCareers Page */
export default function EarlyCareers({ data, otherList, countries }) {
	//console.log(data, " datadata");

	const [isFormVisible, setIsFormVisible] = useState(false); // Form hidden by default
	// DATA //

	const services = {
		sectionTitle: "What you can expect",
		description:
			"During our Berlin Graduate Analyst Programme, our graduates have opportunities for growth and development, including:",
		// buttonText: "Learn More",
		buttonLink: "/about",
		advantages: [
			{ title: "Strategy", description: "Strong strategic planning" },
			{ title: "Innovation", description: "Cutting-edge solutions" },
			{ title: "Support", description: "24/7 Customer support" },
		],
	};

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
	const localData = {
		accordian: [
			{
				title: "Digital Strategy",
				description: "We build comprehensive strategies that scale your business.",
				icon: {
					node: {
						sourceUrl: "/icons/digital-strategy.svg",
					},
				},
				buttonLink: "/services/digital-strategy",
			},
			{
				title: "UI/UX Design",
				description: "User-centered design to create engaging interfaces.",
				icon: {
					node: {
						sourceUrl: "/icons/ui-ux.svg",
					},
				},
				buttonLink: "/services/ui-ux",
			},
		],
	};

	return (
		<div>
			{/* Metatags */}
			<MetaTags
				Title={"Early Careers"}
				Desc={""}
				OgImg={""}
				Url={"/careers/early-careers"}
			/>

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.EarlyCareers}>
				<div className="pt_100">
					<EventsInsideBanner />
				</div>
				{/* <div>
					<SectionsHeader />
				</div> */}
				<div>
					<WhatWeLook />
				</div>
				<div>
					<ServicesCircle data={services} />
				</div>
				<div>
					<WorkingTeams />
				</div>
				<div>
					<AboutCountries />
				</div>
				<div>
					<SmarterEnergy data={data.keyAdvantages} />
				</div>
				<div className="SmarterEnergy">
					<SmarterEnergy />
				</div>
				<div className="ptb_100 dark_bg">
					<AllVideos />
				</div>
				<div>
					<SmarterEnergy data={data.keyAdvantages} />
				</div>
				<div className={`${styles.EarlyMain} pt_100`}>
					<div className={`${styles.containerCustom}`}>
						<div className="container">
							<Insights
								isPowerBgVisible={true}
								defaultList={otherList}
								countries={countries}
							/>
						</div>
					</div>
					<div className="pt_100">
						<EarlyCareersInside />
					</div>
				</div>
				<div className="pt_100">
					<ConnectWithUs />
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
