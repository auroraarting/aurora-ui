// Force SSR (like getServerSideProps)
export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

/* eslint-disable quotes */
// MODULES //

// COMPONENTS //

// SECTIONS //
import PressReleasesInsideWrap from "@/sections/company/press-releases/PressReleasesInsideWrap";

// PLUGINS //

// UTILS //

// STYLES //

// IMAGES //

// DATA //

// SERVICES //
import { getInsights, getInsightsInside } from "@/services/Insights.service";
import { getPressPageInsights } from "@/services/Press.service";

/** Fetch Meta Data */
export async function generateMetadata({ params }) {
	const data = await getInsightsInside(params.slug);
	const post = data?.data?.postBy;

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

/** Fetch  */
async function getData({ params }) {
	const [data, moreRelated, page] = await Promise.all([
		getInsightsInside(params.slug),
		getInsights(
			'first: 4, where: {categoryName: "media", dateQuery: {after: {year: 2023}}}'
		),
		getPressPageInsights(),
	]);
	const dataForBtn = { postFields: data?.data?.postBy?.postFields || {} };

	return {
		props: {
			data: data?.data?.postBy || {},
			moreRelated: moreRelated?.data?.posts?.nodes
				.filter((item) => item.slug != params.slug)
				.slice(0, 3),
			dataForBtn,
			page: page?.data?.page?.pressLanding,
		},
	};
}

/** PressInside Page */
export default async function PressInside({ params }) {
	const { props } = await getData({ params });

	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags
				Title={data?.title}
				Desc={""}
				OgImg={""}
				Url={`/company/press-releases/${data?.slug}`}
			/> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<PressReleasesInsideWrap {...props} />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
