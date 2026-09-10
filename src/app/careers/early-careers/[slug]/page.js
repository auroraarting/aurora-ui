// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
export const dynamic = "force-static"; // Use when data is highly cacheable
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
import {
	getEarlyCareersInside,
	getEarlyCareersListing,
} from "@/services/rest/EarlyCareers.service";
import { getOffices } from "@/services/rest/Offices.service";
import { getPageSeo } from "@/services/rest/Seo.service";

// DATA //

// Statically generated, then refreshed on demand only: the REST services tag
// every fetch (see services/rest/tags.js) and WordPress invalidates those tags
// through /api/revalidate. There is deliberately no `export const revalidate`
// here — a TTL would regenerate this page on a timer whether or not anything
// changed.

/** generateMetadata  */
export async function generateMetadata({ params }) {
	// The REST SEO service takes an endpoint and a slug rather than a GraphQL
	// fragment, and returns the `seo` object directly.
	const meta = await getPageSeo("early-career", params.slug);
	const seo = meta?.seo;

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
	const earlyCareers = await getEarlyCareersListing();
	return earlyCareers.map((item) => ({ slug: item?.slug }));
}

/** EarlyCareers Page */
export default async function EarlyCareers({ params }) {
	const { slug } = await params;

	// The getInsightsCategories call that used to sit here fetched six option
	// lists for a `countries` value this page assigned and never rendered.
	const [data, list, offices] = await Promise.all([
		getEarlyCareersInside(slug),
		getEarlyCareersListing({ first: 10 }),
		getOffices(),
	]);

	// 🚫 Redirect to 404 if status is DRAFT or data is null
	if (!data || data?.status === "DRAFT") {
		notFound(); // shows Next.js 404 page
	}

	const otherList = list?.filter((item) => item.slug !== slug);
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
