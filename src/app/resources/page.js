/* eslint-disable @next/next/no-html-link-for-pages */
// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

// MODULES //

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import InnerBanner from "@/components/InnerBanner";
import SoftwareCards from "@/components/SoftwareCards";
import Insights from "@/components/Insights";

// SECTIONS //
import HowWeHelpWrap from "@/sections/resources/ResourcesWrap";

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/resources/Resources.module.scss";

// IMAGES //
import dropdown_arrow from "/public/img/icons/dropdown_arrow.svg";

// DATA //

/** Meta Data */
export const metadata = {
	title: "Resources | Aurora",
	description: "Aurora",
};

export const revalidate = 60; // Revalidates every 60 seconds

/** Resources Page */
export default function Resources() {
	return (
		<div>
			{/* Metatags */}
			<MetaTags Title={"Resources"} Desc={""} OgImg={""} Url={"/resources"} />
			{/* Header */}
			{/* <Header /> */}
			{/* Page Content starts here */}
			<HowWeHelpWrap />
			{/* Page Content ends here */}
			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
