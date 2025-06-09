// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
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

// DATA //

export const revalidate = 60; // Revalidates every 60 seconds

/** Fetch Meta Data */
export async function generateMetadata({ params }) {
	const data = await getEarlyCareersInside(params.slug);
	const post = data?.data?.earlyCareerBy;

	return {
		title: post?.title || "Default Title",
		description: post?.excerpt || "Default description",
		openGraph: {
			title: post?.title,
			// description: post?.excerpt,
			// url: `https://your-domain.com/company/press-releases/${post?.slug}`,
			images: [
				{
					url:
						post?.featuredImage?.node?.mediaItemUrl ||
						"https://www-production.auroraer.com/img/og-image.jpg",
					width: 1200,
					height: 630,
					alt: post?.title,
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
