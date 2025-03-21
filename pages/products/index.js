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

// SECTIONS //
import ProductListingWrapper from "@/sections/products/ProductListingWrapper";
import SoftwareMarket from "@/sections/softwares/SoftwareMarket";

// PLUGINS //
import { Link, scroller } from "react-scroll";

// UTILS //

// STYLES //
import styles from "@/styles/pages/Products.module.scss";
import TransactionSolutions from "@/sections/how-we-help/TransactionSolutions";
import InnerBanner from "@/components/InnerBanner";
import GlobalMap from "@/components/GlobalMap";

// IMAGES //

// DATA //
import locationJson from "@/data/globalMap.json";

/** Products Page */
export default function Products() {
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
					bannerTitle="Lorem ipsum dolor sit amet consectetur."
					bannerDescription="Lorem ipsum dolor sit amet consectetur. Odio vel tortor lectus sit sagittis enim eu sed sed.. Sed pulvinar vestibulum lorem tristique vulputate bibendum.. Accumsan in sed."
					showContentOnly
				/>
				<div>
					<TransactionSolutions />
				</div>
				<GlobalMap locationJson={locationJson} />
				{/* <div className="ptb_100">
					<SoftwareMarket />
				</div> */}
				<ServicesCircle />
				<div className="ptb_100">
					<TrustedLeaders />
				</div>
				<div className="pb_100">
					<TestimonialFeedback />
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
