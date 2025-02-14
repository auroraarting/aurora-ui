// MODULES //

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";

// SECTIONS //
import SoftwareBanner from "@/sections/softwares/SoftwareBanner";
import SoftwareMarket from "@/sections/softwares/SoftwareMarket";

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/softwares/Software.module.scss";

// IMAGES //

// DATA //

/** Chronos Page */
export default function SoftwarePage() {
	return (
		<div>
			{/* Metatags */}
			<MetaTags Title={"Chronos"} Desc={""} OgImg={""} Url={"/chronos"} />

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.SoftwarePage}>
				<SoftwareBanner />
				<SoftwareMarket />
			</main>
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
