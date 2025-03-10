// MODULES //
import { useState } from "react";

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import Button from "@/components/Buttons/Button";
import SectionsHeader from "@/components/SectionsHeader";
import InnerBanner from "@/components/InnerBanner";
import Insights from "@/components/Insights";
import TrustedLeaders from "@/components/TrustedLeaders";
import TestimonialFeedback from "@/components/TestimonialFeedback";
import ServicesCircle from "@/components/ServicesCircle";
import EosIntegratedSystem from "@/components/EosIntegratedSystem";

// SECTIONS //
import ProductSlider from "@/sections/global-presence/ProductSlider";
import Introduction from "@/sections/global-presence/Introduction";
import WhichProducts from "@/sections/global-presence/WhichProducts";
import PublicWebinar from "@/sections/global-presence/PublicWebinar";
import SoftwareMarket from "@/sections/softwares/SoftwareMarket";

// PLUGINS //
import { Link, scroller } from "react-scroll";

// UTILS //

// STYLES //
import styles from "@/styles/pages/global-presence/GlobalPresence.module.scss";

// IMAGES //
import country_thumb from "@/../public/img/global-presence/country_thumb.jpg";

// DATA //

/** GlobalPresence Page */
export default function GlobalPresence() {
	return (
		<div>
			{/* Metatags */}
			<MetaTags
				Title={"Global Presence"}
				Desc={""}
				OgImg={""}
				Url={"/global-presence"}
			/>

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.GlobalPresencePage}>
				<InnerBanner
					bannerTitle="Empowering markets globally"
					bannerDescription="Lorem ipsum dolor sit amet consectetur. Odio vel tortor lectus sit sagittis enim eu sed sed.. Sed pulvinar vestibulum lorem tristique vulputate bibendum.. Accumsan in sed."
					showContentOnly
				/>
				<section className={`${styles.CountryMain}`}>
					<div className="container">
						<div className={`${styles.CountryWrapper} pb_60`}>
							<div className={`${styles.CountryTitle}`}>
								<h3 className="text_lg font_primary f_w_s_b color_secondary">Asia</h3>
							</div>
							{/* <div className={`${styles.CountryBox}`}>
								<div className={`${styles.CountryItem}`}>
									<img src={country_thumb.src} className="width_100 b_r_10" alt="img" />
									<h5 className="text_reg font_primary f_w_m color_secondary pt_10">
										India
									</h5>
								</div>
								<div className={`${styles.CountryItem}`}>
									<img src={country_thumb.src} className="width_100 b_r_10" alt="img" />
									<h5 className="text_reg font_primary f_w_m color_secondary pt_10">
										Japan
									</h5>
								</div>
								<div className={`${styles.CountryItem}`}>
									<img src={country_thumb.src} className="width_100 b_r_10" alt="img" />
									<h5 className="text_reg font_primary f_w_m color_secondary pt_10">
										Korea
									</h5>
								</div>
								<div className={`${styles.CountryItem}`}>
									<img src={country_thumb.src} className="width_100 b_r_10" alt="img" />
									<h5 className="text_reg font_primary f_w_m color_secondary pt_10">
										Philippines
									</h5>
								</div>
							</div> */}
						</div>
						{/* <div className={`${styles.CountryWrapper} pb_60`}>
							<div className={`${styles.CountryTitle}`}>
								<h3 className="text_lg font_primary f_w_s_b color_secondary">Asia</h3>
							</div>
							<div className={`${styles.CountryBox}`}>
								<div className={`${styles.CountryItem}`}>
									<img src={country_thumb.src} className="width_100 b_r_10" alt="img" />
									<h5 className="text_reg font_primary f_w_m color_secondary pt_10">
										India
									</h5>
								</div>
								<div className={`${styles.CountryItem}`}>
									<img src={country_thumb.src} className="width_100 b_r_10" alt="img" />
									<h5 className="text_reg font_primary f_w_m color_secondary pt_10">
										Japan
									</h5>
								</div>
								<div className={`${styles.CountryItem}`}>
									<img src={country_thumb.src} className="width_100 b_r_10" alt="img" />
									<h5 className="text_reg font_primary f_w_m color_secondary pt_10">
										Korea
									</h5>
								</div>
								<div className={`${styles.CountryItem}`}>
									<img src={country_thumb.src} className="width_100 b_r_10" alt="img" />
									<h5 className="text_reg font_primary f_w_m color_secondary pt_10">
										Philippines
									</h5>
								</div>
							</div>
						</div> */}
					</div>
				</section>
			</main>
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
