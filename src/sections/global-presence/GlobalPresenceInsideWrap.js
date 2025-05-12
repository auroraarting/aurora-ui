"use client";
// MODULES //

// COMPONENTS //
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

// UTILS //
import { dynamicInsightsBtnProps, getMapJsonForCountries } from "@/utils";

// STYLES //
import styles from "@/styles/pages/global-presence/Australia.module.scss";

// IMAGES //

// DATA //

// SERVICES //
/** Australia Page */
export default function GlobalPresenceInsideWrap({ data, mapJson }) {
	const dataForBtn = { postFields: data?.countries || {} };
	console.log("data", dataForBtn);

	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags
				Title={data.title}
				Desc={""}
				OgImg={""}
				Url={`/global-presense/${data.slug}`}
			/> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.AustraliaPage}>
				<div>
					<InnerBanner
						bannerTitle={data.countries.bannerSection.title}
						bannerDescription={data.countries.bannerSection.description}
						// btnTxt="Get in Touch"
						desktopImage={data.countries.bannerSection?.image?.node?.mediaItemUrl}
						mobileImage={data.countries.bannerSection.mobileImage?.node?.mediaItemUrl}
						dynamicBtn={dynamicInsightsBtnProps(dataForBtn, "topSectionsButton")}
					/>
				</div>
				<div className="pb_40">
					<ProductSlider data={data.countries.announcement.slide} />
				</div>
				<SectionsHeader
					customHtml={
						dynamicInsightsBtnProps(dataForBtn, "middleSectionsButton").btntext && (
							<div {...dynamicInsightsBtnProps(dataForBtn, "middleSectionsButton")}>
								<Button color="primary" variant="filled" shape="rounded">
									{dynamicInsightsBtnProps(dataForBtn, "middleSectionsButton").btntext}
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
								isPowerBgVisible={true}
								isInsightsBlogsVisible={true}
								formSectionBtnText={
									dynamicInsightsBtnProps(dataForBtn, "insightsSectionsButton").btntext
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
