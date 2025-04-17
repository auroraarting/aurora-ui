// MODULES //
import { useEffect, useState } from "react";

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import InnerBanner from "@/components/InnerBanner";

// SECTIONS //
import OurHistory from "@/sections/company/about/OurHistory";
import OurEdge from "@/sections/company/about/OurEdge";

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/company/About.module.scss";

// IMAGES //

// DATA //

/** About Page */
export default function About() {
	return (
		<div>
			{/* Metatags */}
			<MetaTags Title={"About"} Desc={""} OgImg={""} Url={"/about"} />

			{/* Header */}
			<Header />

			{/* Page Content starts here */}
			<main className={styles.AboutPage}>
				<div className={`${styles.topBg}`}>
					<InnerBanner
						bannerTitle="latest press releases & media contacts"
						bannerDescription="Lorem ipsum dolor sit amet consectetur. Elit massa a ut malesuada. Tincidunt pellentesque euismod morbi elit in tempor in. Ut elit in diam ut a mattis."
						vimeoid="1071368007"
					/>
				</div>
				<div className="pt_100">
					<OurHistory />
				</div>
				<div className={`${styles.OurEdgeMain} pt_100`}>
					<OurEdge />
				</div>
			</main>
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
