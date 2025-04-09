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

// STYLES //
import styles from "@/styles/pages/product/ProductInside.module.scss";

// IMAGES //

// DATA //
import locationJson from "@/data/globalMap.json";

// SERVICES //
import { getProductBySlug } from "@/services/Products.service";

/** Fetch  */
export async function getServerSideProps({ params }) {
	const [data] = await Promise.all([getProductBySlug(params.slug)]);
	return { props: { data: data.data.productBy } };
}

/** ProductInside Page */
export default function ProductInside({ data }) {
	console.log(data);
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
				Title={"Product Inside"}
				Desc={""}
				OgImg={""}
				Url={"/product-inside"}
			/>

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.ProductInsidePage}>
				<div>
					<ProductBanner />
				</div>
				<SectionsHeader data={headerArray} />
				<div className="ptb_100">
					<MarketIntelligence />
				</div>
				<GlobalMap locationJson={locationJson} />
				{/* <div className="ptb_100">
					<SoftwareMarket />
				</div> */}
				<div className="ptb_100">
					<TrustedLeaders />
				</div>
				<div className="pb_100">
					<TestimonialFeedback />
				</div>
				<ServicesCircle />
				<div>
					<GloballyBankableInsights />
				</div>
				<div>
					<SmarterEnergy />
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
