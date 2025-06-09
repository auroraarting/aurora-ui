// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

// MODULES //

// COMPONENTS //
import InnerBanner from "@/components/InnerBanner";
import IntegratedSystem from "@/components/IntegratedSystem";
import SmarterEnergy from "@/components/SmarterEnergy";
import IframeModal from "@/components/IframeModal";
import ServicesCircleWhite from "@/components/ServicesCircleWhite";
import SectionsHeader from "@/components/SectionsHeader";
import Button from "@/components/Buttons/Button";

// SECTIONS //
import CareerCountryCard from "@/sections/careers/CareerCountryCard";
import AllVideos from "@/components/AllVideos";
import GraduateExperiance from "@/sections/careers/GraduateExperiance";
import ConnectWithUs from "@/sections/careers/ConnectWithUs";
import EarlyCareersWrap from "@/sections/careers/EarlyCareersWrap";

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/careers/early-careers/EarlyCareers.module.scss";

// IMAGES //

// DATA //

// SERVICES //
import {
	getEarlyCareersListing,
	getEarlyCareersPage,
} from "@/services/EarlyCareers.service";
import { getInsightsCategories } from "@/services/Insights.service";
import { getOffices } from "@/services/Offices.service";

export const revalidate = 60; // Revalidates every 60 seconds

/** Meta Data */
export const metadata = {
	title: "Early Careers | Aurora",
	description: "Aurora",
};

/** EarlyCareers Page */
export default async function EarlyCareers() {
	const [dataFetch, pageFetch, categoriesForSelect, officesFetch] =
		await Promise.all([
			await getEarlyCareersListing("first: 99999"),
			await getEarlyCareersPage(),
			await getInsightsCategories(),
			await getOffices(),
		]);

	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags
				Title={"Early Careers"}
				Desc={""}
				OgImg={""}
				Url={"/careers/early-careers"}
			/> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<EarlyCareersWrap
				dataFetch={dataFetch}
				pageFetch={pageFetch}
				categoriesForSelect={categoriesForSelect}
				officesFetch={officesFetch}
			/>
			{/* Page Content ends here */}
		</div>
	);
}
