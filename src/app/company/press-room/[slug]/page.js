// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
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

export const revalidate = 60; // Revalidates every 60 seconds

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

/** generateStaticParams  */
export async function generateStaticParams() {
	const data = await await getInsights(
		'first: 9999, where: {categoryName: "media", dateQuery: {after: {year: 2023}}}'
	);
	return data.data.posts.nodes.map((item) => ({
		slug: item.slug,
	}));
}

/** Fetch  */
async function getData({ slug }) {
	const [data, moreRelated, page] = await Promise.all([
		await getInsightsInside(slug),
		await getInsights(
			'first: 4, where: {categoryName: "media", dateQuery: {after: {year: 2023}}}'
		),
		await getPressPageInsights(),
	]);
	const dataForBtn = { postFields: data?.data?.postBy?.postFields || {} };

	return {
		props: {
			data: data?.data?.postBy || {},
			moreRelated: moreRelated?.data?.posts?.nodes
				.filter((item) => item.slug != slug)
				.slice(0, 3),
			dataForBtn,
			page: page?.data?.page?.pressLanding,
		},
	};
}

/** PressInside Page */
export default async function PressInside({ params }) {
	const { slug } = await params;
	const { props } = await getData({ slug });

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
