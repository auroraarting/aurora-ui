// MODULES //
import { useEffect, useState } from "react";

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import Button from "@/components/Buttons/Button";
import InnerBanner from "@/components/InnerBanner";
import ServicesCircle from "@/components/ServicesCircle";
// SECTIONS //
import SectionsHeader from "@/components/SectionsHeader";
import WhatWeLook from "@/sections/careers/WhatWeLook";
import EventsInsideBanner from "@/sections/events/EventsInsideBanner";
import AboutCountries from "@/sections/careers/AboutCountries";
import CareerSeries from "@/sections/careers/CareerSeries";
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
import WorkingTeams from "@/sections/careers/WorkingTeams";
import SmarterEnergy from "@/components/SmarterEnergy";

// DATA //

// SERVICES //
import { getLifeAtAurora } from "@/services/Careers.service";

/** Fetch  */
export async function getServerSideProps() {
	const [data] = await Promise.all([getLifeAtAurora()]);
	let obj = {
		data: { ...data.data.page.lifeAtAurora, offices: data.data.offices.nodes },
	};
	delete obj.data.lifeAtAurora;
	return { props: { ...obj } };
}

/** EarlyCareers Page */
export default function EarlyCareers({ data }) {
	console.log(data, " datadata");

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
			<Header />

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
				<div className="SmarterEnergy">
					<SmarterEnergy data={data?.keyAdvantages} />
				</div>
				<div>
					<CareerSeries />
				</div>
				<div className={`${styles.EarlyMain}`}>
					<EarlyCareers />
				</div>
			</main>
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
