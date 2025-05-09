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
import IframeModal from "@/components/IframeModal";

// SECTIONS //
import ProductSlider from "@/sections/global-presence/ProductSlider";
import Introduction from "@/sections/global-presence/Introduction";
import WhichProducts from "@/sections/global-presence/WhichProducts";
import PublicWebinar from "@/sections/global-presence/PublicWebinar";
import SoftwareMarket from "@/sections/softwares/SoftwareMarket";

// PLUGINS //
import { Link, scroller } from "react-scroll";

// UTILS //
import {
	dynamicInsightsBtnProps,
	getMapJsonForCountries,
	getMapJsonForProducts,
} from "@/utils";

// STYLES //
import styles from "@/styles/pages/global-presence/Australia.module.scss";

// IMAGES //
import desktop_banner from "@/../public/img/global-presence/desktop_banner.jpg";

// DATA //

// SERVICES //
import {
	getCountryInside,
	getRegions,
} from "@/services/GlobalPresence.service";

import {
	getCountryInside as getCountryInsideWithLanguages,
	getRegions as getRegionsWithLanguages,
} from "@/services/GlobalPresenceLanguages.service";

/** Fetch  */
export async function getServerSideProps({ params, query }) {
	const language = query.language;
	let data, countryBy, mapJson;

	if (language && language === "jp") {
		// Fetch Japanese data
		[data] = await Promise.all([getCountryInsideWithLanguages(params.slug)]);
		countryBy = data?.data?.countryBy?.translations?.[0];
		mapJson = getMapJsonForCountries(countryBy?.countries?.map || []);
	} else {
		// Default fetch
		[data] = await Promise.all([getCountryInside(params.slug)]);
		countryBy = data?.data?.countryBy;
		mapJson = getMapJsonForCountries(countryBy?.countries?.map || []);
	}

	// Return 404 if no valid data
	if (!countryBy) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			data: countryBy,
			mapJson,
		},
	};
}

/** Australia Page */
export default function Australia({ data, mapJson }) {
	const [isFormVisible, setIsFormVisible] = useState(false); // Form hidden by default
	const dataForBtn = { postFields: data?.countries || {} };

	console.log("data", dataForBtn);

	return (
		<div>
			{/* Metatags */}
			<MetaTags
				Title={data.title}
				Desc={""}
				OgImg={""}
				Url={`/global-presense/${data.slug}`}
			/>

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.AustraliaPage}>
				<div>
					<InnerBanner
						bannerTitle={data.countries.bannerSection.title}
						bannerDescription={data.countries.bannerSection.description}
						// btnTxt="Get in Touch"
						desktopImage={data.countries.bannerSection?.image?.node?.sourceUrl}
						mobileImage={data.countries.bannerSection.mobileImage?.node?.sourceUrl}
						dynamicBtn={dynamicInsightsBtnProps(dataForBtn, "topSectionsButton")}
					/>
				</div>
				<div className="pb_40">
					<ProductSlider data={data.countries.announcement.slide} />
				</div>
				<SectionsHeader
					customHtml={
						dynamicInsightsBtnProps(dataForBtn, "middleSectionsButton").btnText && (
							<div {...dynamicInsightsBtnProps(dataForBtn, "middleSectionsButton")}>
								<Button color="primary" variant="filled" shape="rounded">
									{dynamicInsightsBtnProps(dataForBtn, "middleSectionsButton").btnText}
								</Button>
							</div>
						)
					}
				/>
				<Introduction data={data.countries.introduction} />
				<div className="pb_100">
					<WhichProducts data={data.countries.map} />
				</div>
				<ServicesCircle
					data={data.countries.keyAdvantages}
					customHtml={
						dynamicInsightsBtnProps(dataForBtn, "keyAdvantageSectionsButton")
							.btnText && (
							<div
								{...dynamicInsightsBtnProps(dataForBtn, "keyAdvantageSectionsButton")}
								className="pt_40"
							>
								<Button color="primary" variant="filled" shape="rounded">
									{
										dynamicInsightsBtnProps(dataForBtn, "keyAdvantageSectionsButton")
											.btnText
									}
								</Button>
							</div>
						)
					}
				/>
				<div className="ptb_100">
					<SoftwareMarket
						sectionTitle="Energy intelligence across every key market"
						mapJson={mapJson}
						customHtml={
							dynamicInsightsBtnProps(dataForBtn, "keyAdvantageSectionsButton")
								.btnText && (
								<div
									{...dynamicInsightsBtnProps(dataForBtn, "keyAdvantageSectionsButton")}
									className=""
								>
									<Button color="primary" variant="filled" shape="rounded">
										{
											dynamicInsightsBtnProps(dataForBtn, "keyAdvantageSectionsButton")
												.btnText
										}
									</Button>
								</div>
							)
						}
					/>
				</div>
				<div className="pb_100">
					<TrustedLeaders data={data.countries.ourClients} />
				</div>
				<div className="pb_100">
					<TestimonialFeedback data={data.countries.ourClients} />
				</div>
				<div className="pb_100">
					<PublicWebinar />
				</div>

				<div className={`${styles.insightBg} pb_100 pt_30`}>
					<div className={`${styles.boxBg}`}>
						<div className="pb_100">
							<Insights
								isFormVisible={isFormVisible}
								setIsFormVisible={setIsFormVisible}
								isPowerBgVisible={true}
								isInsightsBlogsVisible={true}
								formSectionBtnText={
									dynamicInsightsBtnProps(dataForBtn, "insightsSectionsButton").btnText
								}
								formdata={dynamicInsightsBtnProps(dataForBtn, "insightsSectionsButton")}
							/>
						</div>
					</div>
					<EosIntegratedSystem />
				</div>
			</main>
			<IframeModal />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
