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

// SECTIONS //
import TransactionsBanner from "@/sections/how-we-help/TransactionsBanner";
import TransactionSolutions from "@/sections/how-we-help/TransactionSolutions";
import SolutionsChallenge from "@/sections/how-we-help/SolutionsChallenge";

// PLUGINS //
import { Link, scroller } from "react-scroll";

// UTILS //

// STYLES //
import styles from "@/styles/pages/how-we-help/Transactions.module.scss";

// IMAGES //
import desktop_banner from "@/../public/img/financial-sector/desktop_banner.jpg";

// DATA //

/** Transactions Page */
export default function Transactions() {
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
				Get Started
			</Button>
		</div>,
	];
	return (
		<div>
			{/* Metatags */}
			<MetaTags
				Title={"Transactions"}
				Desc={""}
				OgImg={""}
				Url={"/transactions"}
			/>

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.TransactionsPage}>
				{/* <SectionsHeader data={headerArray} /> */}
				<TransactionsBanner />
				<TrustedLeaders />
				<TestimonialFeedback />
				<div className="pb_100">
					<TransactionSolutions />
				</div>
				<Insights
					isFormVisible={isFormVisible}
					setIsFormVisible={setIsFormVisible}
				/>
				<SolutionsChallenge />
			</main>
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
