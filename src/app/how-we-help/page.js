/* eslint-disable @next/next/no-html-link-for-pages */
// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

// MODULES //

// COMPONENTS //
// import MetaTags from "@/components/MetaTags";
import SoftwareCards from "@/components/SoftwareCards";
import Insights from "@/components/Insights";
import IframeModal from "@/components/IframeModal";

// SECTIONS //
import HowWeHelpWrap from "@/sections/how-we-help/HowWeHelpWrap";

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/how-we-help/HowWeHelp.module.scss";

// IMAGES //
import dropdown_arrow from "/public/img/icons/dropdown_arrow.svg";

// DATA //

/** Meta Data */
export const metadata = {
	title: "How We Help | Aurora",
	description: "Aurora",
};

/** HowWeHelp Page */
export default function HowWeHelp() {
	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags Title={"How We Help"} Desc={""} OgImg={""} Url={"/how-we-help"} /> */}

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
