/* eslint-disable @next/next/no-html-link-for-pages */
// Force SSR (like getServerSideProps)
export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

// MODULES //

// COMPONENTS //
import MetaTags from "@/components/MetaTags";
import SoftwareCards from "@/components/SoftwareCards";

// SECTIONS //
import Insights from "@/components/Insights";
import WhoAreYouWrap from "@/sections/who-are-you/WhoAreYouWrap";

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/who-are-you/WhoAreYou.module.scss";

// IMAGES //
import dropdown_arrow from "/public/img/icons/dropdown_arrow.svg";

// DATA //

/** Meta Data */
export const metadata = {
	title: "Who Are You | Aurora",
	description: "Aurora",
};

/** WhoAreYou Page */
export default function WhoAreYou() {
	return (
		<div>
			{/* Metatags */}
			<MetaTags Title={"Who Are You"} Desc={""} OgImg={""} Url={"/who-are-you"} />

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<WhoAreYouWrap />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
