// MODULES //
import { useState } from "react";

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import TestimonialFeedback from "@/components/TestimonialFeedback";
import SectionsHeader from "@/components/SectionsHeader";
import InnerBanner from "@/components/InnerBanner";
import Button from "@/components/Buttons/Button";
import TrustedLeaders from "@/components/TrustedLeaders";
import TransactionSolutions from "@/sections/how-we-help/TransactionSolutions";
import GlobalMap from "@/components/GlobalMap";

// SECTIONS //
import GloballyBankableInsights from "@/sections/softwares/GloballyBankableInsights";

// PLUGINS //
import { Link, scroller } from "react-scroll";

// UTILS //

// STYLES //
import styles from "@/styles/pages/softwares/SoftwareLanding.module.scss";

// IMAGES //
import desktop_banner from "@/../public/img/banner/desktop_banner.jpg";
import available_regions from "@/../public/img/global-presence/available_regions.jpg";
import Insights from "@/components/Insights";
import EosIntegratedSystem from "@/components/EosIntegratedSystem";

// DATA //
import locationJson from "@/data/globalMap.json";

/** Chronos Page */
export default function Softwares() {
	const [isFormVisible, setIsFormVisible] = useState(false); // Form hidden by default

	return (
		<div>
			{/* Metatags */}
			<MetaTags Title={"Softwares"} Desc={""} OgImg={""} Url={"/softwares"} />

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.SoftwareLanding}>
				<InnerBanner
					bannerTitle="Lorem ipsum dolor sit amet consectetur."
					bannerDescription="Lorem ipsum dolor sit amet consectetur. Odio vel tortor lectus sit sagittis enim eu sed sed.. Sed pulvinar vestibulum lorem tristique vulputate bibendum.. Accumsan in sed."
					showContentOnly
				/>
				<div>
					<TransactionSolutions />
				</div>
				<div>
					<GloballyBankableInsights />
				</div>
				<GlobalMap locationJson={locationJson} />
				<div className="ptb_100">
					<TrustedLeaders />
				</div>
				<div className="pb_100">
					<TestimonialFeedback />
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
			</main>
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
