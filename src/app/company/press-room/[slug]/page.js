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
import {
	getInsights,
	getInsightsInside,
} from "@/services/rest/Insights.service";
import { getPressPageInsights } from "@/services/rest/Press.service";

// Statically generated, then refreshed on demand only: the REST services tag
// every fetch (see services/rest/tags.js) and WordPress invalidates those tags
// through /api/revalidate. There is deliberately no `export const revalidate`
// here — a TTL would regenerate this page on a timer whether or not anything
// changed.

/** Fetch Meta Data */
export async function generateMetadata({ params }) {
	// getInsightsInside now returns the node directly.
	const post = await getInsightsInside(params.slug);

	return {
		title: post?.title || "Default Title",
		description: post?.excerpt || "",
		alternates: {
			canonical: `https://auroraer.com/company/press-room/${params.slug}`, // 👈 canonical URL
		},
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
	const posts = await getInsights({
		first: 20,
		categories: ["media"],
		afterYear: 2023,
	});
	return posts.map((item) => ({
		slug: item.slug,
	}));
}

/** Fetch  */
async function getData({ slug }) {
	// The Promise.all here had four entries and destructured three, so the
	// fourth — a second call for the same page — was fetched and thrown away.
	const [data, moreRelated, page] = await Promise.all([
		getInsightsInside(slug),
		getInsights({ first: 4, categories: ["media"], afterYear: 2023 }),
		getPressPageInsights(),
	]);
	const dataForBtn = { postFields: data?.postFields || {} };

	return {
		props: {
			data: data || {},
			moreRelated: moreRelated
				.filter((item) => item.slug != slug)
				.slice(0, 3),
			dataForBtn,
			page,
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
				Url={`https://auroraer.com/company/press-releases/${data?.slug}`}
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
