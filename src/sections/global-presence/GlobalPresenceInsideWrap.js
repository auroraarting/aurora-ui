"use client";
// MODULES //
import { useEffect } from "react";
import { useContextProvider } from "@/context/GlobalContext";

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
export default function GlobalPresenceInsideWrap({
	data,
	mapJson,
	insightsList,
	countries,
	events,
	webinars,
}) {
	const { setShowLanguages } = useContextProvider();
	const dataForBtn = { postFields: data?.countries || {} };

	useEffect(() => {
		console.log(data?.translations);
		if (data?.translations?.length >= 1) {
			setShowLanguages(true);
		}
		console.log(data, "data");
		return () => {
			setShowLanguages(false);
		};
	}, []);

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
						bannerTitle={data?.countries?.bannerSection?.title}
						bannerDescription={data?.countries?.bannerSection?.description}
						// btnTxt="Get in Touch"
						desktopImage={data?.countries?.bannerSection?.image?.node?.mediaItemUrl}
						mobileImage={
							data?.countries?.bannerSection?.mobileImage?.node?.mediaItemUrl
						}
						dynamicBtn={dynamicInsightsBtnProps(dataForBtn, "topSectionsButton")}
					/>
				</div>
				<div className="">
					<ProductSlider data={data?.countries?.announcement?.slide} />
				</div>
				<SectionsHeader
					customHtml={
						dynamicInsightsBtnProps(dataForBtn, "middleSectionsButton")?.btntext && (
							<div {...dynamicInsightsBtnProps(dataForBtn, "middleSectionsButton")}>
								<Button color="primary" variant="filled" shape="rounded">
									{dynamicInsightsBtnProps(dataForBtn, "middleSectionsButton")?.btntext}
								</Button>
							</div>
						)
					}
				/>
				<Introduction data={data?.countries?.introduction} />
				<div className="pb_100">
					<WhichProducts data={data?.countries?.map} />
				</div>
				<ServicesCircle
					hideId
					data={data?.countries?.keyAdvantages}
					customHtml={
						<>
							{dynamicInsightsBtnProps(dataForBtn, "keyAdvantageSectionsButton")
								?.btntext && (
								<div
									{...dynamicInsightsBtnProps(dataForBtn, "keyAdvantageSectionsButton")}
									className="pt_40"
								>
									<Button color="white" variant="filled" shape="rounded">
										{
											dynamicInsightsBtnProps(dataForBtn, "keyAdvantageSectionsButton")
												?.btntext
										}
									</Button>
								</div>
							)}
						</>
					}
				/>
				<div className="ptb_100">
					<SoftwareMarket
						mapThumb={data?.countries?.mapThumb?.node?.mediaItemUrl}
						// sectionTitle={data?.countries?.availableRegions?.sectionTitle}
						sectionTitle={"Energy intelligence modelled for your market"}
						mapJson={mapJson}
						data={data?.countries?.availableRegions}
						customHtml={
							dynamicInsightsBtnProps(dataForBtn, "availableRegionsSectionsButton")
								?.btntext && (
								<div
									{...dynamicInsightsBtnProps(
										dataForBtn,
										"availableRegionsSectionsButton"
									)}
									className=""
								>
									<Button color="primary" variant="filled" shape="rounded">
										{
											dynamicInsightsBtnProps(dataForBtn, "availableRegionsSectionsButton")
												.btntext
										}
									</Button>
								</div>
							)
						}
					/>
				</div>
				{data?.countries?.ourClients?.selectLogos && (
					<div className="pb_50">
						<TrustedLeaders data={data?.countries?.ourClients} />
					</div>
				)}
				{data?.countries?.ourClients?.testimonials && (
					<div className="pb_100">
						<TestimonialFeedback hideId data={data?.countries?.ourClients} />
					</div>
				)}
				<div className="pb_100">
					<PublicWebinar events={events} webinars={webinars} />
				</div>

				<div className={`${styles.insightBg} pb_100 pt_30`}>
					<div className={`${styles.boxBg}`}>
						<div className="pb_100">
							<Insights
								hideall
								isPowerBgVisible={true}
								isInsightsBlogsVisible={true}
								defaultList={insightsList}
								countries={countries}
								formSectionTitle={data?.countries?.insights?.sectionTitle}
								formSectionDesc={data?.countries?.insights?.sectionDesc}
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
			<IframeModal hideLeft />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
