// MODULES //
import { useState } from "react";

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import TestimonialFeedback from "@/components/TestimonialFeedback";
import SectionsHeader from "@/components/SectionsHeader";
import Button from "@/components/Buttons/Button";
import TrustedLeaders from "@/components/TrustedLeaders";
import Insights from "@/components/Insights";
import ServicesCircle from "@/components/ServicesCircle";
import SolutionsChallenge from "@/components/SolutionsChallenge";
import GlobalMap from "@/components/GlobalMap";
import EosIntegratedSystem from "@/components/EosIntegratedSystem";

// SECTIONS //
import TransactionsBanner from "@/sections/how-we-help/TransactionsBanner";
import TransactionSolutions from "@/sections/how-we-help/TransactionSolutions";
import GloballyBankableInsights from "@/sections/softwares/GloballyBankableInsights";

// PLUGINS //
import { Link, scroller } from "react-scroll";

// UTILS //
import {
	getMapJsonForAllRegions,
	getMapJsonForCountries,
	getMapJsonForProducts,
} from "@/utils";

// STYLES //
import styles from "@/styles/pages/how-we-help/Transactions.module.scss";

// IMAGES //
import desktop_banner from "@/../public/img/financial-sector/desktop_banner.jpg";

// SERVICES //
import {
	getHowWeHelps,
	getSingleHowWeHelp,
} from "@/services/HowWeHelp.service";
import { getRegions } from "@/services/GlobalPresence.service";

// DATA //

/** Fetch  */
export async function getServerSideProps({ params }) {
	const [data, services, regions] = await Promise.all([
		getSingleHowWeHelp(params.slug),
		getHowWeHelps(),
		getRegions(),
	]);
	const mapJson = getMapJsonForAllRegions(regions);

	return {
		props: {
			data: data.data.howwehelpBy,
			services: services.data.howWeHelps.nodes,
			mapJson,
			regions,
		},
	};
}

/** Transactions Page */
export default function Transactions({ data, services, mapJson }) {
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

	return (
		<div>
			{/* Metatags */}
			<MetaTags
				Title={data?.title}
				Desc={""}
				OgImg={""}
				Url={`/how-we-help/${data?.slug}`}
			/>

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.TransactionsPage}>
				<TransactionsBanner data={data?.howWeHelpInside?.banner} />
				<SectionsHeader
					customHtml={
						<div key="btn" to="Insights" onClick={() => scrollToSection("Insights")}>
							<Button color="primary" variant="filled" shape="rounded">
								Get Transaction Support
							</Button>
						</div>
					}
				/>
				<div>
					<GloballyBankableInsights isMultiple={true} />
				</div>
				<div className="ptb_100">
					<TrustedLeaders
						data={data?.howWeHelpInside?.ourClient}
						sectionTitle={data?.howWeHelpInside?.ourClient?.title}
					/>
				</div>
				<div className="pb_100">
					<TestimonialFeedback data={data?.howWeHelpInside?.ourClient} />
				</div>
				<div>
					<ServicesCircle data={data?.howWeHelpInside?.keyAdvantages} />
				</div>
				<div>
					<GlobalMap
						className="dark_bg"
						locationJson={mapJson}
						marqueeText={data?.howWeHelpInside?.availableRegions?.marqueeText}
					/>
				</div>
				{!services.length && (
					<div className="pb_100">
						<TransactionSolutions
							slugPage="how-we-help"
							data={services}
							keyValue="howWeHelpInside"
						/>
					</div>
				)}
				<div className="ptb_100 dark_bg">
					<EosIntegratedSystem />
				</div>
				<div className="pb_100">
					<Insights
						isFormVisible={isFormVisible}
						setIsFormVisible={setIsFormVisible}
						isPowerBgVisible={true}
						isInsightsBlogsVisible={true}
					/>
				</div>
				<div className="pb_100">
					<SolutionsChallenge />
				</div>
			</main>
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
