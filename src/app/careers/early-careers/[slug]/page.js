// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
export const dynamic = "force-static"; // Use when data is highly cacheable
// ❌ Remove: export const fetchCache = "force-no-store";

/* eslint-disable quotes */
// MODULES //

// COMPONENTS //

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

export const revalidate = 60; // Revalidates every 60 seconds

/** generateMetadata  */
export async function generateMetadata({ params }) {
	const meta = await getPageSeo(`earlyCareerBy(slug: "${params.slug}")`);
	const seo = meta?.data?.earlyCareerBy?.seo;

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

/** generateStaticParams  */
export async function generateStaticParams() {
	const earlyCareers = await getEarlyCareersListing("first: 99999");
	return earlyCareers.data.earlyCareers.nodes.map((item) => ({
		slug: item.slug,
	}));
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
		]
	);

	const countries = categoriesForSelect.data.countries.nodes;
	const data = dataFetch.data.earlyCareerBy;
	const otherList = list.data.earlyCareers.nodes?.filter(
		(item) => item.slug !== slug
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
				Url={`/careers/early-careers/${data?.slug}`}
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
