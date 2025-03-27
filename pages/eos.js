// MODULES //
import { useEffect, useState } from "react";

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";

// SECTIONS //
import EosBanner from "@/sections/eos/EosBanner";

// PLUGINS //
import { Link, scroller } from "react-scroll";

// UTILS //

// STYLES //
import styles from "@/styles/pages/Eos.module.scss";

// IMAGES //

// DATA //

/** EOS Page */
export default function EOSPage() {
	return (
		<div>
			{/* Metatags */}
			<MetaTags Title={"EOS"} Desc={""} OgImg={""} Url={"/eos"} />

			{/* Header */}
			{/* <Header /> */}

			{/* Page eos starts here */}
			<main className={styles.EOSPage}>
				<div>
					<EosBanner />
				</div>
			</main>
			{/* Page eos ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
