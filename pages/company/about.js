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

/** Fetch  */
export async function getServerSideProps() {
	const [data] = await Promise.all([getLifeAtAurora()]);
	let obj = {
		data: { ...data.data.page.lifeAtAurora, offices: data.data.offices.nodes },
	};
	delete obj.data.lifeAtAurora;
	return { props: { ...obj } };
}

/** About Page */
export default function About({ data }) {
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
				url: "/careers/life-at-aurora",
				hoverImg: item.offices.thumbnail.node.sourceUrl,
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
						bannerTitle="latest press releases & media contacts"
						bannerDescription="Lorem ipsum dolor sit amet consectetur. Elit massa a ut malesuada. Tincidunt pellentesque euismod morbi elit in tempor in. Ut elit in diam ut a mattis."
						btnTxt="Lorem Ipsum"
						vimeoid="1071368007"
					/>
				</div>
				<div className="pt_100">
					<OurHistory />
				</div>
				<div className={`${styles.OurEdgeMain} pt_100`}>
					<OurEdge />
				</div>
				<div className="dark_bg">
					{mapJson && (
						<GlobalMap
							locationJson={[mapJson]}
							marqueeText={data?.globalMap?.marqueetext}
						/>
					)}
				</div>
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
				<div className="pb_100">
					<AboutLeadership />
				</div>
				<div className="pb_100">
					<Insights isPowerBgVisible={true} />
				</div>
				<div className="pb_100">
					<Commitment />
				</div>
			</main>
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
