/* eslint-disable quotes */
// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
export const dynamic = "force-static"; // Use when data is highly cacheable
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
import { getPageSeo } from "@/services/Seo.service";

export const revalidate = 30; // Revalidates every 60 seconds

/** generateMetadata  */
export async function generateMetadata() {
	const meta = await getPageSeo(
		'page(id: "early-careers-landing", idType: URI)'
	);
	const seo = meta?.data?.page?.seo;

	return {
		title: seo?.title || "Default Title",
		description: seo?.metaDesc || "Default description",
		keywords: seo?.metaKeywords || "Default description",
		openGraph: {
			images: [
				{
					url: "https://auroraer.com/img/og-image.jpg",
				},
			],
		},
	};
}

/** EarlyCareers Page */
export default async function EarlyCareers() {
	const [dataFetch, pageFetch, categoriesForSelect, officesFetch] =
		await Promise.all([
			getEarlyCareersListing("first: 99999"),
			getEarlyCareersPage(),
			getInsightsCategories(),
			getOffices(),
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
