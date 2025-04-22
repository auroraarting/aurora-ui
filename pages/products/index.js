// MODULES //
import { useEffect, useState } from "react";

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import ServicesCircle from "@/components/ServicesCircle";
import TrustedLeaders from "@/components/TrustedLeaders";
import TestimonialFeedback from "@/components/TestimonialFeedback";
import Insights from "@/components/Insights";
import EosIntegratedSystem from "@/components/EosIntegratedSystem";
import IntegratedSystem from "@/components/IntegratedSystem";
import ServicesCircleWhite from "@/components/ServicesCircleWhite";

// SECTIONS //
import ProductListingWrapper from "@/sections/products/ProductListingWrapper";
import SoftwareMarket from "@/sections/softwares/SoftwareMarket";

// PLUGINS //
import { Link, scroller } from "react-scroll";

// UTILS //
import {
	getClientLogosForAllProducts,
	getMapJsonForProducts,
	getTestimonialsForAllProducts,
	removeDuplicatesByKeys,
} from "@/utils";

// STYLES //
import styles from "@/styles/pages/product/Products.module.scss";
import TransactionSolutions from "@/sections/how-we-help/TransactionSolutions";
import InnerBanner from "@/components/InnerBanner";
import GlobalMap from "@/components/GlobalMap";

// IMAGES //

// DATA //
import locationJson from "@/data/globalMap.json";

// SERVICES //
import { getProductPage } from "@/services/Products.service";
import { getRegions } from "@/services/GlobalPresence.service";

/** Fetch */
export async function getServerSideProps() {
	const [data, regions] = await Promise.all([getProductPage(), getRegions()]);
	const products = data.data.products;
	const mapJson = getMapJsonForProducts(regions);

	let testimonials = {
		testimonials: {
			nodes: [],
		},
	};
	let clientLogos = {
		selectLogos: {
			nodes: [],
		},
	};

	products?.nodes?.map((item) => {
		// testimonials
		testimonials.testimonials.nodes = removeDuplicatesByKeys(
			[
				...testimonials.testimonials.nodes,
				...(item.products.ourClient.testimonials?.nodes || []),
			],
			["id"]
		);
		clientLogos.selectLogos.nodes = removeDuplicatesByKeys(
			[
				...clientLogos.selectLogos.nodes,
				...(item.products.ourClient.selectLogos?.nodes || []),
			],
			["id"]
		);
	});
	// const clientLogos = getClientLogosForAllProducts(data.data?.clientsLogos);
	// const testimonials = getTestimonialsForAllProducts(data.data.testimonials);

	return {
		props: {
			data: {
				...data.data.page.productLanding,
			},
			products,
			testimonials,
			clientLogos,
			regions,
			mapJson,
		},
	};
}

/** Products Page */
export default function Products({
	data,
	products,
	testimonials,
	clientLogos,
	mapJson,
}) {
	return (
		<div>
			{/* Metatags */}
			<MetaTags Title={"Products"} Desc={""} OgImg={""} Url={"/products"} />

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
				<div className="ptb_100">
					<TrustedLeaders data={clientLogos} />
				</div>
				<div className="pb_100">
					<TestimonialFeedback data={testimonials} />
				</div>
				<div className={`${styles.insightBg} pb_100 pt_30`}>
					<div className={`${styles.boxBg}`}>
						<div className="pb_100">
							<Insights isInsightsBlogsVisible={true} />
						</div>
					</div>
					<EosIntegratedSystem />
				</div>
				<div className="ptb_100">
					<IntegratedSystem />
				</div>
			</main>
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
