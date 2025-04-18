// MODULES //

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import GlobalMap from "@/components/GlobalMap";
import TrustedLeaders from "@/components/TrustedLeaders";
import TestimonialFeedback from "@/components/TestimonialFeedback";

// SECTIONS //
import HomeBanner from "@/sections/home/HomeBanner";
import HomeResources from "@/sections/home/HomeResources";
import HomeEvents from "@/sections/home/HomeEvents";
import HomeTalentMeets from "@/sections/home/HomeTalentMeets";

// PLUGINS //

// UTILS //
import { getMapJsonForAllRegions } from "@/utils";

// STYLES //
import styles from "@/styles/pages/Home.module.scss";

// IMAGES //

// DATA //

// SERVICES //
import { getRegions } from "@/services/GlobalPresence.service";
import { getHomePage } from "@/services/Home.service";

/** Fetch  */
export async function getServerSideProps() {
	const [regions, data] = await Promise.all([getRegions(), getHomePage()]);
	const mapJson = getMapJsonForAllRegions(regions);
	return {
		props: {
			data: data.data.page.home || {},
			mapJson,
		},
	};
}

/** Home Page */
export default function HomePage({ mapJson, data }) {
	return (
		<div>
			{/* Metatags */}
			<MetaTags Title={"Home"} Desc={"Home Desc"} OgImg={""} Url={"/"} />

			{/* Header */}
			<Header />

			{/* Page Content starts here */}
			<main className={`${styles.HomePage}`}>
				<HomeBanner />
				{data?.ourClient?.selectLogos && (
					<div className="ptb_100">
						<TrustedLeaders data={data.ourClient} />
					</div>
				)}
				{data?.ourClient?.testimonials && (
					<div className="pb_100">
						<TestimonialFeedback data={data.ourClient} />
					</div>
				)}
				<GlobalMap locationJson={mapJson} />
				<div className="ptb_100">
					<HomeResources />
				</div>
				<div className="pb_100">
					<HomeEvents />
				</div>
				<div className="">
					<HomeTalentMeets />
				</div>
			</main>
			{/* Page Content ends here */}

			{/* Footer */}
			<Footer />
		</div>
	);
}
