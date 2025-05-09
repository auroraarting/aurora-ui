// MODULES //
import { useEffect, useState } from "react";

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import InnerBanner from "@/components/InnerBanner";
import GlobalMap from "@/components/GlobalMap";
import EosIntegratedSystem from "@/components/EosIntegratedSystem";
import SoftwareCards from "@/components/SoftwareCards";
import Insights from "@/components/Insights";
import IframeModal from "@/components/IframeModal";

// SECTIONS //
import OurHistory from "@/sections/company/about/OurHistory";
import OurEdge from "@/sections/company/about/OurEdge";
import AboutLeadership from "@/sections/company/about/AboutLeadership";
import Commitment from "@/sections/company/about/Commitment";
import Counter from "@/sections/careers/Counter";

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/company/About.module.scss";

// IMAGES //

// DATA //

// SERVICES //
import { getLifeAtAurora } from "@/services/Careers.service";
import { getAboutPage } from "@/services/About.service";
import { getInsightsCategories } from "@/services/Insights.service";

/** Fetch  */
export async function getServerSideProps() {
	const [data, categoriesForSelect] = await Promise.all([
		getAboutPage(),
		getInsightsCategories(),
	]);
	let obj = {
		data: { ...data.data.page.about, offices: data.data.offices.nodes },
	};
	delete obj.data.about;

	let tempMapJson = {
		zoom: 9,
		name: "Global",
		centerOfCountry: {
			lat: 18.1307561,
			lng: 23.554042,
		},
		markers: [],
	};

	data.offices?.map((item) => {
		let obj = {
			name: item.title,
			lat: item.offices.map.lat,
			lng: item.offices.map.lng,
			url: "/careers/life-at-aurora",
			hoverImg: item.offices.thumbnail.node.sourceUrl,
			// icon:
			// 	"https://aurora.mystagingwebsite.com/wp-content/uploads/2025/03/serviceIcon.png",
		};

		tempMapJson.markers.push(obj);
	});
	return {
		props: {
			...obj,
			mapJson: tempMapJson,
			countries: categoriesForSelect?.data?.countries?.nodes || [],
		},
	};
}

/** About Page */
export default function About({ data, countries }) {
	const [mapJson, setMapJson] = useState();

	useEffect(() => {
		let tempMapJson = {
			zoom: 9,
			name: "Global",
			centerOfCountry: {
				lat: 18.1307561,
				lng: 23.554042,
			},
			markers: [],
		};

		data.offices?.map((item) => {
			let obj = {
				name: item.title,
				lat: item.offices.map.lat,
				lng: item.offices.map.lng,
				url: "/company/about",
				hoverImg: item.offices.thumbnail.node.sourceUrl,
				unique: Math.random(),
				// icon:
				// 	"https://aurora.mystagingwebsite.com/wp-content/uploads/2025/03/serviceIcon.png",
			};

			tempMapJson.markers.push(obj);
		});

		setMapJson(tempMapJson);
	}, []);

	return (
		<div>
			{/* Metatags */}
			<MetaTags Title={"About"} Desc={""} OgImg={""} Url={"/about"} />

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.AboutPage}>
				<div className={`${styles.topBg}`}>
					<InnerBanner
						bannerTitle={data?.banner?.title}
						bannerDescription={data?.banner?.description}
						desktopImage={data?.banner?.dekstopimage?.node?.sourceUrl}
						mobileImage={data?.banner?.mobileimage?.node?.sourceUrl}
						vimeoid={data?.banner?.videoLink}
					/>
				</div>
				{data?.history?.sectionTitle && (
					<div className="pt_100">
						<OurHistory data={data?.history} />
					</div>
				)}
				{data?.ourEdge?.sectionTitle && (
					<div className={`${styles.OurEdgeMain} pt_100`}>
						<OurEdge data={data?.ourEdge} />
					</div>
				)}
				{mapJson && (
					<div className="dark_bg">
						<GlobalMap
							locationJson={[mapJson]}
							marqueeText={data?.map?.marqueetext}
						/>
					</div>
				)}
				<div>
					<Counter
						data={{ stats: { ...data.stats, offices: data.offices.length } }}
					/>
				</div>
				<div className={`${styles.EosMain} pt_100 pb_60`}>
					<EosIntegratedSystem />
				</div>
				<div className="ptb_100">
					<SoftwareCards />
				</div>
				{data?.leaders?.sectionTitle && (
					<div className="pb_100">
						<AboutLeadership data={data?.leaders} countries={countries} />
					</div>
				)}
				<div className="pb_100">
					<Insights isPowerBgVisible={true} />
				</div>
				<div className="pb_100">
					<Commitment />
				</div>
			</main>
			<IframeModal />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
