"use client";
// MODULES //
import { useEffect, useState } from "react";

// COMPONENTS //
import MetaTags from "@/components/MetaTags";
import InnerBanner from "@/components/InnerBanner";
import IntegratedSystem from "@/components/IntegratedSystem";
import AccordianCommon from "@/components/AccordianCommon";
import EosIntegratedSystem from "@/components/EosIntegratedSystem";
import GlobalMap from "@/components/GlobalMap";
import IframeModal from "@/components/IframeModal";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/global-presence/GlobalPresence.module.scss";

// IMAGES //
import slider_arrow from "/public/img/icons/slider_arrow.svg";

// DATA //

// SERVICES //

/** GlobalPresence Page */
export default function GlobalPresenceWrap({
	regions,
	page,
	mapJson,
	regionsArr,
}) {
	const [data, setData] = useState({ regionsArr, mapJson, page });

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
			{data && (
				<main className={styles.GlobalPresencePage}>
					<InnerBanner
						bannerTitle={data.page.title}
						bannerDescription={data.page.description}
						showContentOnly
					/>

					<GlobalMap locationJson={mapJson} marqueeText={data.page.mapMarquee} />

					<section className={`${styles.CountryMain} ptb_100`}>
						<div className="container">
							<div className={`${styles.accordian_main}`}>
								{data.regionsArr && (
									<AccordianCommon
										fontStyle={"text_lg"}
										fontWeight={"f_w_s_b"}
										fontFamily={"font_primary"}
										fontColor={"color_secondary"}
										items={data.regionsArr}
									/>
								)}
							</div>
						</div>
					</section>

					<div className={`${styles.insightBg} ptb_80`}>
						<div className={`${styles.boxBg}`}></div>
						<EosIntegratedSystem />
					</div>
					<div className="ptb_100">
						<IntegratedSystem />
					</div>
				</main>
			)}
			<IframeModal />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
