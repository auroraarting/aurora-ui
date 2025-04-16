// MODULES //
import { useEffect, useState } from "react";

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import Button from "@/components/Buttons/Button";
import ServicesCircle from "@/components/ServicesCircle";
import TrustedLeaders from "@/components/TrustedLeaders";
import TestimonialFeedback from "@/components/TestimonialFeedback";
import Insights from "@/components/Insights";
import EosIntegratedSystem from "@/components/EosIntegratedSystem";
import IntegratedSystem from "@/components/IntegratedSystem";
import GlobalMap from "@/components/GlobalMap";
import SectionsHeader from "@/components/SectionsHeader";
import SmarterEnergy from "@/components/SmarterEnergy";

// SECTIONS //
import ProductBanner from "@/sections/products/ProductBanner";
import MarketIntelligence from "@/sections/products/MarketIntelligence";
import GloballyBankableInsights from "@/sections/softwares/GloballyBankableInsights";

// PLUGINS //
import { Link, scroller } from "react-scroll";

// UTILS //
import { filterMarkersBySlug, getMapJsonForProducts } from "@/utils";

// STYLES //
import styles from "@/styles/pages/product/ProductInside.module.scss";

// IMAGES //

// DATA //
import locationJson from "@/data/globalMap.json";

// SERVICES //
import { getProductBySlug } from "@/services/Products.service";
import { getRegions } from "@/services/GlobalPresence.service";

/** Fetch  */
export async function getServerSideProps({ params }) {
	const [data, regions] = await Promise.all([
		getProductBySlug(params.slug),
		getRegions(),
	]);
	const mapJson = getMapJsonForProducts(
		filterMarkersBySlug(regions, params.slug)
	);

	return {
		props: {
			data: data.data.productBy,
			mapJson,
		},
	};
}

/** ProductInside Page */
export default function ProductInside({ data, mapJson }) {
	console.log(mapJson);
	const [isFormVisible, setIsFormVisible] = useState(false); // Form hidden by default

	/** scrollToSection */
	const scrollToSection = (id) => {
		scroller.scrollTo(id, {
			duration: 500,
			smooth: true,
			offset: -100,
			spy: true,
			onEnd: () => console.log("Scrolling finished!"), // ❌ Not available directly
		});

		setTimeout(() => {
			setIsFormVisible(true);
			console.log("Scrolling finished!");
		}, 500);
	};

	const headerArray = [
		{ name: "Expertise", id: "#expertise" },
		{ name: "Available Regions", id: "#availableregions" },
		{ name: "Why Aurora", id: "#whyaurora" },
		{ name: "Clients", id: "#clients" },
		<div key="btn" to="Insights" onClick={() => scrollToSection("Insights")}>
			<Button color="primary" variant="filled" shape="rounded">
				Book a Demo
			</Button>
		</div>,
	];

	return (
		<div>
			{/* Metatags */}
			<MetaTags
				Title={data.title}
				Desc={""}
				OgImg={""}
				Url={`/products/${data.slug}`}
			/>

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.ProductInsidePage}>
				<div>
					<ProductBanner />
				</div>
				<SectionsHeader
					data={headerArray}
					customHtml={
						<div key="btn" to="Insights" onClick={() => scrollToSection("Insights")}>
							<Button color="primary" variant="filled" shape="rounded">
								Book a Demo
							</Button>
						</div>
					}
				/>
				<div className="ptb_100">
					<MarketIntelligence data={data.products.introduction} />
				</div>
				<GlobalMap locationJson={mapJson} marqueeText={data.products.map.marquee} />
				{/* <div className="ptb_100">
					<SoftwareMarket />
				</div> */}
				<div className="ptb_100">
					<TrustedLeaders data={data.products.ourClient} />
				</div>
				<div className="pb_100">
					<TestimonialFeedback data={data.products.ourClient} />
				</div>
				<ServicesCircle data={data.products.keyAdvantages} />
				<div>
					<GloballyBankableInsights data={data.products.whyAurora} />
				</div>
				<div>
					<SmarterEnergy data={data.products.expertise} />
				</div>

				<div className={`${styles.insightBg} pb_100 pt_30`}>
					<div className={`${styles.boxBg}`}>
						<div className="pb_100">
							<Insights
								isFormVisible={isFormVisible}
								setIsFormVisible={setIsFormVisible}
								isPowerBgVisible={true}
								isInsightsBlogsVisible={true}
							/>
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
