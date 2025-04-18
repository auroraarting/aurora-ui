// MODULES //

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import GlobalMap from "@/components/GlobalMap";

// SECTIONS //
import HomeBanner from "@/sections/home/HomeBanner";

// PLUGINS //

// UTILS //
import { getMapJsonForAllRegions } from "@/utils";

// STYLES //
import styles from "@/styles/pages/Home.module.scss";

// IMAGES //

// DATA //

// SERVICES //
import { getRegions } from "@/services/GlobalPresence.service";

/** Fetch  */
export async function getServerSideProps() {
	const [regions] = await Promise.all([getRegions()]);
	const mapJson = getMapJsonForAllRegions(regions);
	return {
		props: {
			mapJson,
		},
	};
}

/** Home Page */
export default function HomePage({ mapJson }) {
	return (
		<div>
			{/* Metatags */}
			<MetaTags Title={"Home"} Desc={"Home Desc"} OgImg={""} Url={"/"} />

			{/* Header */}
			<Header />

			{/* Page Content starts here */}
			<main className={`${styles.HomePage}`}>
				<HomeBanner />
				<GlobalMap locationJson={mapJson} />
			</main>
			{/* Page Content ends here */}

			{/* Footer */}
			<Footer />
		</div>
	);
}
