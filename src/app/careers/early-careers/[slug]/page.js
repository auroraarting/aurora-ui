// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

/* eslint-disable quotes */
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
import { getEarlyCareersListing } from "@/services/EarlyCareers.service";
import { getEarlyCareersInside } from "@/services/rest/EarlyCareers.service";
import { getOffices } from "@/services/rest/Offices.service";
import { getPageSeo } from "@/services/rest/Seo.service";

// DATA //

// No page-level timer: content refreshes when WordPress calls /api/revalidate
// with the tags it changed. The fetches keep a 24h safety net for a webhook that
// never arrives (see services/cacheTags.js).

/** generateMetadata  */
export async function generateMetadata({ params }) {
	const meta = await getPageSeo({ postType: "early-career", slug: params.slug });
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
