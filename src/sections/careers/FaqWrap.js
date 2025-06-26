"use client";
// MODULES //
import { useEffect, useState } from "react";

// COMPONENTS //

import MetaTags from "@/components/MetaTags";
import InnerBanner from "@/components/InnerBanner";

// SECTIONS //
import CareerFaq from "@/sections/careers/CareerFaq";

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/careers/Faq.module.scss";

// IMAGES //

// DATA //

// SERVICES //

/** Faq Page Wrap */
export default function FaqWrap({ page }) {
	const [activeTab, setActiveTab] = useState(0);
	/** */
	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};
	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags Title={"Faq"} Desc={""} OgImg={""} Url={"/careers/faq"} /> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.Faq}>
				<InnerBanner
					bannerTitle={page?.banner?.title}
					bannerDescription={page?.banner?.desc}
					showContentOnly
				/>

				<section className={`${styles.tabMain} pb_100`}>
					<div className="container">
						<div className={`${styles.tabFlex} f_w_j`}>
							<div className={`${styles.category}`}>
								<div className={`${styles.switchBox}`}>
									{page?.categories?.map((item, ind) => {
										return (
											<div
												key={item.title}
												className={`${styles.listTxt} ${
													activeTab === ind ? styles.active : ""
												}`}
												onClick={() => handleTabClick(ind)}
											>
												<p className="text_xs f_w_m font_primary ">{item.title}</p>
											</div>
										);
									})}
								</div>
							</div>
							<div className={`${styles.tabContent}`}>
								<div className={`${styles.categoryContent} `}>
									<CareerFaq data={page?.categories?.[activeTab]?.faq} />
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
