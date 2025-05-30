"use client";

// MODULES //

// COMPONENTS //
import TrustedLeaders from "@/components/TrustedLeaders";
import TestimonialFeedback from "@/components/TestimonialFeedback";
import Insights from "@/components/Insights";
import EosIntegratedSystem from "@/components/EosIntegratedSystem";
import IntegratedSystem from "@/components/IntegratedSystem";
import ServicesCircleWhite from "@/components/ServicesCircleWhite";
import IframeModal from "@/components/IframeModal";
import Bundles from "@/components/Bundles";

// SECTIONS //

// PLUGINS //

// UTILS //
import {
	dynamicInsightsBtnProps,
	getMapJsonForProducts,
	removeDuplicatesByKeys,
} from "@/utils";

// STYLES //
import styles from "@/styles/pages/product/Products.module.scss";
import TransactionSolutions from "@/sections/how-we-help/TransactionSolutions";
import InnerBanner from "@/components/InnerBanner";
import GlobalMap from "@/components/GlobalMap";

// IMAGES //

// DATA //

// SERVICES //
import { getProductPage } from "@/services/Products.service";
import { getRegions } from "@/services/GlobalPresence.service";
import { getBundlesSection } from "@/services/Bundles.service";
import {
	getInsights,
	getInsightsCategories,
} from "@/services/Insights.service";

/** Meta Data */
export const metadata = {
	title: "Products | Aurora",
	description: "Aurora",
};

/** Products Page */
export default function ProductListingWrapper({
	data,
	products,
	testimonials,
	clientLogos,
	mapJson,
	bundles,
	countries,
	insights,
}) {
	const dataForBtn = {
		postFields: data,
	};

	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags Title={"Products"} Desc={""} OgImg={""} Url={"/products"} /> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.ProductsPage}>
				{/* <ProductListingWrapper /> */}
				<InnerBanner
					bannerTitle={data?.banner?.title}
					bannerDescription={data?.banner?.description}
					showContentOnly
				/>
				<div>
					<TransactionSolutions data={products.nodes} slugPage="products" />
				</div>
				<GlobalMap locationJson={mapJson} marqueeText={data.mapMarquee} />
				{/* <div className="ptb_100">
					<SoftwareMarket />
				</div> */}
				<ServicesCircleWhite data={data.keyAdvantages} />
				{clientLogos?.selectLogos?.nodes?.length > 0 && (
					<div className="pb_50 pt_100 ">
						<TrustedLeaders data={clientLogos} />
					</div>
				)}
				{testimonials?.testimonials?.nodes?.length > 0 && (
					<div className="pb_100">
						<TestimonialFeedback data={testimonials} />
					</div>
				)}
				<div className="pt_100 dark_bg relative">
					<img
						className={`${styles.bgGradient} bgGradientEos`}
						src="/img/eos-bg-gradient.png"
					/>
					<div className="pb_100">
						<EosIntegratedSystem />
					</div>
					<Bundles data={bundles} />
				</div>
				<div className={`${styles.insightBg} pt_30`}>
					<div className={`${styles.boxBg}`}>
						<div className="pb_100">
							<Insights
								formSectionTitle={data?.insights?.sectionTitle}
								formSectionDesc={data?.insights?.sectionDesc}
								isPowerBgVisible={true}
								isInsightsBlogsVisible={true}
								defaultList={insights}
								countries={countries}
								formSectionBtnText={
									dynamicInsightsBtnProps(dataForBtn, "insightsSectionButton").btntext
								}
								formdata={dynamicInsightsBtnProps(dataForBtn, "insightsSectionButton")}
							/>
						</div>
					</div>
					{/* <EosIntegratedSystem /> */}
				</div>
				{/* <div className="ptb_100">
					<IntegratedSystem />
				</div> */}
			</main>
			<IframeModal />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
