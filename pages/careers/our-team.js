// MODULES //
import { useEffect, useState } from "react";

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import InnerBanner from "@/components/InnerBanner";
import Button from "@/components/Buttons/Button";
import Insights from "@/components/Insights";
import IntegratedSystem from "@/components/IntegratedSystem";

// SECTIONS //

// PLUGINS //
import { Link, scroller } from "react-scroll";

// UTILS //

// STYLES //
import styles from "@/styles/pages/careers/ourTeam.module.scss";

// IMAGES //
import country_thumb from "@/../public/img/global-presence/country_thumb.jpg";
import available_regions from "@/../public/img/global-presence/available_regions.jpg";

// DATA //
import locationJson from "@/data/globalMap.json";

// SERVICES //
import { getLifeAtAurora } from "@/services/Careers.service";
import DepartmentList from "@/sections/careers/DepartmentList";

/** Fetch  */
export async function getServerSideProps() {
	const [data] = await Promise.all([getLifeAtAurora()]);
	let obj = {
		data: { ...data.data.page.lifeAtAurora, offices: data.data.offices.nodes },
	};
	delete obj.data.lifeAtAurora;
	return { props: { ...obj } };
}

/** LifeAtAurora Page */
export default function LifeAtAurora() {
	return (
		<div>
			{/* Metatags */}
			<MetaTags
				Title={"Our Team"}
				Desc={""}
				OgImg={""}
				Url={"/careers/our-team"}
			/>

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.ourTeamPage}>
				<InnerBanner
					bannerTitle={"Lorem ipsum dolor sit amet consectetur."}
					bannerDescription={
						"Lorem ipsum dolor sit amet consectetur. Elementum ullamcorper nec sodales mi. Tellus imperdiet volutpat dui ipsum massa. In tincidunt tortor elit suspendisse arcu massa fusce. Urna lectus ullamcorper est eu quis lectus tortor nam."
					}
					showContentOnly
				/>
				<div>
					<DepartmentList />
				</div>
				<div className={`${styles.containerCustom} ptb_100`}>
					<div className="container">
						<Insights isPowerBgVisible={true} />
					</div>
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
