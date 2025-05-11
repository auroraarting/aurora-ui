// MODULES //
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import InnerBanner from "@/components/InnerBanner";
import Insights from "@/components/Insights";
import EventSmarterEnergy from "@/components/EventSmarterEnergy";
import SoftwareCards from "@/components/SoftwareCards";
import AllVideos from "@/components/AllVideos";

// SECTIONS //
import InsightsTop from "@/sections/resources/aurora-insights/InsightsTop";
import InsightsListing from "@/sections/resources/aurora-insights/InsightsListing";

// PLUGINS //

// UTILS //
import { getMapJsonForAllRegions } from "@/utils";

// STYLES //
import styles from "@/styles/pages/resources/aurora-insights/AuroraInsights.module.scss";

// IMAGES //
import country_thumb from "@/../public/img/global-presence/country_thumb.jpg";

// DATA //

// SERVICES //
import { getInsights } from "@/services/InsightsPagination.service";

/** Fetch  */
export async function getServerSideProps(context) {
	const currentPage = parseInt(context.query.page) || 1;
	const postsPerPage = 9;

	let after = null;
	let data;
	let cursor;

	for (let i = 1; i <= currentPage; i++) {
		data = await getInsights({ first: postsPerPage, after });
		if (i < currentPage) {
			// Move to next page
			after = data.pageInfo.endCursor;
		}
	}

	// Now `data.nodes` contains the posts for the `currentPage`
	return {
		props: {
			posts: data.nodes,
			currentPage,
			hasNextPage: data.pageInfo.hasNextPage ?? false,
		},
	};
}

/** AuroraInsights Page */
export default function AuroraInsights({ posts, currentPage, hasNextPage }) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	// Handler for loading state during route change
	useEffect(() => {
		/** handleStart */
		const handleStart = () => setIsLoading(true);
		/** handleComplete */
		const handleComplete = () => setIsLoading(false);

		router.events.on("routeChangeStart", handleStart);
		router.events.on("routeChangeComplete", handleComplete);
		router.events.on("routeChangeError", handleComplete);

		return () => {
			router.events.off("routeChangeStart", handleStart);
			router.events.off("routeChangeComplete", handleComplete);
			router.events.off("routeChangeError", handleComplete);
		};
	}, [router]);

	/** handlePageChange */
	const handlePageChange = (page) => {
		if (page !== currentPage && page > 0) {
			router.push({ pathname: router.pathname, query: { page } });
		}
	};

	/** getPageNumbers */
	const getPageNumbers = (currentPage, hasNextPage) => {
		let startPage = Math.max(1, currentPage - 1);
		let endPage = startPage + 3;

		if (!hasNextPage && currentPage >= 4) {
			endPage = currentPage;
			startPage = endPage - 3;
		}

		return Array.from({ length: 4 }, (_, i) => startPage + i);
	};

	return (
		<div>
			{/* Metatags */}
			<MetaTags
				Title={"Aurora Insights"}
				Desc={""}
				OgImg={""}
				Url={"/aurora-insights"}
			/>

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.AuroraInsightsPage}>
				<div className={`${styles.topBg}`}>
					<InnerBanner
						bannerTitle="Lorem ipsum dolor sit amet consectetur."
						bannerDescription="Each year, our landmark events bring together international industry leaders, government officials and academics to engage in addressing the hottest energy topics."
						showContentOnly
					/>
				</div>
				<div>
					<InsightsTop />
				</div>
				<div className="pt_60 pb_100">
					<InsightsListing />

					{isLoading ? (
						<p className="text-center py-8 font-medium">Loading posts...</p>
					) : (
						<ul className="space-y-2">
							{posts.map((post, index) => (
								<li key={index}>
									<p>{post.title}</p>
								</li>
							))}
						</ul>
					)}

					<button
						onClick={() => handlePageChange(currentPage - 1)}
						disabled={currentPage === 1}
					>
						&lt;
					</button>

					{/* Dynamic Page Numbers */}
					{getPageNumbers(currentPage, hasNextPage).map((page) => (
						<button
							key={page}
							onClick={() => handlePageChange(page)}
							className={`w-8 h-8 rounded-full flex items-center justify-center ${
								currentPage === page ? "active" : ""
							}`}
						>
							{page}
						</button>
					))}

					{/* Next Arrow */}
					<button
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={!hasNextPage}
					>
						&gt;
					</button>
				</div>
				<div className="pb_100">
					<AllVideos />
				</div>
				<div className={`${styles.containerCustom} pb_100`}>
					<div className="container">
						<Insights isPowerBgVisible={true} />
					</div>
				</div>
				<div className="pb_100">
					<SoftwareCards />
				</div>
			</main>
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
