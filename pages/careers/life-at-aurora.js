// MODULES //
import { useEffect, useState } from "react";

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import InnerBanner from "@/components/InnerBanner";
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //
import { Link, scroller } from "react-scroll";

// UTILS //

// STYLES //
import styles from "@/styles/pages/careers/LifeAtAurora.module.scss";

// IMAGES //
import country_thumb from "@/../public/img/global-presence/country_thumb.jpg";

// DATA //
import locationJson from "@/data/globalMap.json";

/** LifeAtAurora Page */
export default function LifeAtAurora() {
	return (
		<div>
			{/* Metatags */}
			<MetaTags
				Title={"Life At Aurora"}
				Desc={""}
				OgImg={""}
				Url={"/life-at-aurora"}
			/>

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.LifeAtAuroraPage}>
				<InnerBanner
					bannerTitle="Lorem ipsum dolor sit amet consectetur."
					bannerDescription="Lorem ipsum dolor sit amet consectetur. Elementum ullamcorper nec sodales mi. Tellus imperdiet volutpat dui ipsum massa. In tincidunt tortor elit suspendisse arcu massa fusce. Urna lectus ullamcorper est eu quis lectus tortor nam."
					videoSrc="../../img/softwares/frame_video.mp4"
				/>
			</main>
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
