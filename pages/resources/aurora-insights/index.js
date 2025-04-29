/* eslint-disable quotes */
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
import { buildQueryFromContext, objectToGraphQLArgs } from "@/utils";

// STYLES //
import styles from "@/styles/pages/resources/aurora-insights/AuroraInsights.module.scss";

// IMAGES //
import country_thumb from "@/../public/img/global-presence/country_thumb.jpg";

// DATA //

// SERVICES //
import {
	getInsights,
	getInsightsCategories,
	getInsightsPath,
} from "@/services/Insights.service";

/** Fetch  */
export async function getStaticProps() {
	const [data, categoriesForSelect, list] = await Promise.all([
		getInsights(
			'first: 9999, where: {categoryName: "case-studies,commentary,market-reports"}'
		),
		getInsightsCategories(),
		getInsights('first: 3, where: {categoryName: ""}'),
	]);
	const otherList = list?.data?.posts?.nodes;

	return {
		props: {
			pagination: data.data?.posts?.pageInfo || {},
			data: data?.data?.posts?.nodes || [],
			tags: categoriesForSelect.data.tags.nodes,
			categories: categoriesForSelect.data.categories.nodes,
			countries: categoriesForSelect.data.countries.nodes,
			products: categoriesForSelect.data.products.nodes,
			softwares: categoriesForSelect.data.softwares.nodes,
			services: categoriesForSelect.data.services.nodes,
			otherList,
		},
		revalidate: 10,
	};
}

/** AuroraInsights Page */
export default function AuroraInsights({
	pagination,
	data,
	tags,
	categories,
	countries,
	products,
	softwares,
	services,
	otherList,
}) {
	console.log(data, "data");
	const [original, setOriginal] = useState(data);
	// console.log("data", {
	// 	pagination,
	// 	data,
	// 	tags,
	// 	categories,
	// 	countries,
	// 	products,
	// 	softwares,
	// 	services,
	// });

	return (
		<div>
			{/* Metatags */}
			<MetaTags Title={"Aurora Insights"} Url={"/resources/aurora-insights"} />

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
					<InsightsTop data={data?.[0]} />
				</div>
				<div className="pt_60 pb_100">
					<InsightsListing
						data={data?.slice(1, data.length)}
						pagination={pagination}
						countries={countries}
						products={products}
						softwares={softwares}
						services={services}
						setOriginal={setOriginal}
						original={original}
						productService={[
							{
								category: "Product",
								options: products?.map((item) => item.title),
							},
							{
								category: "Software",
								options: softwares?.map((item) => item.title),
							},
							{
								category: "Service",
								options: services?.map((item) => item.title),
							},
						]}
					/>
				</div>
				<div className="pb_100">
					<AllVideos />
				</div>
				<div className={`${styles.containerCustom} pb_100`}>
					<div className="container">
						<Insights
							isPowerBgVisible={true}
							defaultList={otherList}
							countries={countries}
						/>
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
