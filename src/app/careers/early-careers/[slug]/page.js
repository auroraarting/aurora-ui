// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

/* eslint-disable quotes */

// Renders here outlast Vercel's 15s default function budget (the layout alone
// spends ~11s on WPGraphQL — see services/UpstreamRequest.js). Without this,
// every ISR regeneration is killed mid-render, so a revalidated page has
// nothing to replace its stale HTML with and the edit never appears.
// 300s is the Pro + Fluid compute ceiling.
export const maxDuration = 300;

// MODULES //

// COMPONENTS //
import { notFound } from "next/navigation";

// SECTIONS //
import EarlyCareersInsideWrap from "@/sections/careers/EarlyCareersInsideWrap";

// PLUGINS //

// UTILS //

// STYLES //

// IMAGES //

// DATA //

// SERVICES //
import { getInsightsCategories } from "@/services/Insights.service";
import {
	getEarlyCareersInside,
	getEarlyCareersListing,
} from "@/services/EarlyCareers.service";
import { getOffices } from "@/services/Offices.service";
import { getPageSeo } from "@/services/Seo.service";

// DATA //


/** generateMetadata  */
export async function generateMetadata({ params }) {
	const meta = await getPageSeo(`earlyCareerBy(slug: "${params.slug}")`);
	const seo = meta?.data?.earlyCareerBy?.seo;

	return {
		title: seo?.title || "Default Title",
		description: seo?.metaDesc || "",
		keywords: seo?.metaKeywords || "",
		alternates: {
			canonical: `https://auroraer.com/careers/early-careers/${params.slug}`, // 👈 canonical URL
		},
		openGraph: {
			images: [
				{
					url: "https://auroraer.com/img/og-image.jpg",
				},
			],
		},
	};
}

/** generateStaticParams  */
export async function generateStaticParams() {
	const earlyCareers = await getEarlyCareersListing("first: 9999");
	return (
		earlyCareers?.data?.earlyCareers?.nodes?.map((item) => ({
			slug: item?.slug,
		})) || []
	);
}

/** EarlyCareers Page */
export default async function EarlyCareers({ params }) {
	const { slug } = await params;

	const [dataFetch, categoriesForSelect, list, officesFetch] = await Promise.all(
		[
			getEarlyCareersInside(slug),
			getInsightsCategories(),
			getEarlyCareersListing("first: 10"),
			getOffices(),
		],
	);

	const countries = categoriesForSelect.data.countries.nodes;
	const data = dataFetch.data.earlyCareerBy;

	// 🚫 Redirect to 404 if status is DRAFT or data is null
	if (!data || data?.status === "DRAFT") {
		notFound(); // shows Next.js 404 page
	}

	const otherList = list.data.earlyCareers.nodes?.filter(
		(item) => item.slug !== slug,
	);
	const offices = officesFetch.data.offices.nodes;
	const dataForBtn = { postFields: data?.earlyCareers || {} };

	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags
				Title={data?.title}
				Desc={""}
				OgImg={""}
				Url={`https://auroraer.com/careers/early-careers/${data?.slug}`}
			/> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<EarlyCareersInsideWrap
				data={data}
				otherList={otherList}
				offices={offices}
				dataForBtn={dataForBtn}
			/>
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
