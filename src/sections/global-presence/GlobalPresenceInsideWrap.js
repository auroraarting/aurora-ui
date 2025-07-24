/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable indent */
"use client";
// MODULES //
import { useEffect, useState } from "react";
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
	slug,
	// events,
	// webinars,
}) {
	const [events, setEvents] = useState([]);
	const [webinars, setWebinars] = useState([]);
	const [mapJsonState, setMapJsonState] = useState();
	const { setShowLanguages, eventsState, webinarsState } = useContextProvider();
	const dataForBtn = { postFields: data?.countries || {} };

	useEffect(() => {
		setMapJsonState(getMapJsonForCountries(data?.countries?.map));

		if (data?.translations?.length >= 1) {
			setShowLanguages(true);
		}
		return () => {
			setShowLanguages(false);
		};
	}, []);

	// useEffect(() => {
	// 	if (!eventsState || !webinarsState) {
	// 		return;
	// 	}
	// 	/** Filter and sort helpers  */
	// 	const filterAndSortByDate = (items, datePath) =>
	// 		(items || [])
	// 			.filter((item) => new Date() < new Date(datePath(item)))
	// 			.sort((a, b) => new Date(datePath(a)) - new Date(datePath(b)));

	// 	const eventsFiltered = filterAndSortByDate(
	// 		eventsState?.data?.events?.nodes?.filter((event) =>
	// 			event?.events?.thumbnail?.country?.nodes?.some(
	// 				(node) => node?.slug === slug
	// 			)
	// 		),
	// 		(event) => event.events?.thumbnail?.date
	// 	);

	// 	const eventsAllSorted = filterAndSortByDate(
	// 		eventsState?.data?.events?.nodes,
	// 		(event) => event.events?.thumbnail?.date
	// 	);

	// 	const eventsList =
	// 		eventsFiltered?.length > 0 ? eventsFiltered : eventsAllSorted;

	// 	const allwebinars =
	// 		webinarsState?.data?.webinars?.nodes?.sort(
	// 			(a, b) =>
	// 				new Date(b.webinarsFields?.startDateAndTime) -
	// 				new Date(a.webinarsFields?.startDateAndTime)
	// 		) || [];

	// 	const webinarsFiltered = filterAndSortByDate(
	// 		webinarsState?.data?.webinars?.nodes?.filter((webinar) =>
	// 			webinar?.webinarsFields?.country?.nodes?.some((node) => node?.slug === slug)
	// 		),
	// 		(webinar) => webinar.webinarsFields?.startDateAndTime
	// 	);

	// 	const webinarsAllSorted = filterAndSortByDate(
	// 		webinarsState?.data?.webinars?.nodes,
	// 		(webinar) => webinar.webinarsFields?.startDateAndTime
	// 	);

	// 	let webinarList =
	// 		webinarsFiltered?.length > 0 ? webinarsFiltered : webinarsAllSorted;

	// 	if (webinarList.length < 3) {
	// 		webinarList = [...webinarList, ...webinarsAllSorted].filter(
	// 			(item, index, self) =>
	// 				index === self.findIndex((t) => t?.title === item?.title)
	// 		);
	// 		if (webinarList.length < 3) {
	// 			webinarList = [...webinarList, ...allwebinars].filter(
	// 				(item, index, self) =>
	// 					index === self.findIndex((t) => t?.title === item?.title)
	// 			);
	// 		}
	// 	}

	// 	// events: eventsList.slice(0, 1),
	// 	// webinars: webinarList.slice(0, 3),
	// 	setEvents(eventsList.slice(0, 1));
	// 	setWebinars(webinarList.slice(0, 3));
	// }, [eventsState, webinarsState]);

	useEffect(() => {
		// if (eventsList?.length > 0 || webinarList?.length > 0) {
		// 	return;
		// }
		/** Filter and sort helpers  */
		const filterAndSortByDate = (items, datePath) =>
			(items || [])
				// .filter((item) => new Date() < new Date(datePath(item)))
				.sort((a, b) => new Date(datePath(a)) - new Date(datePath(b)));

		const eventsFiltered = filterAndSortByDate(
			eventsState?.data?.events?.nodes
				?.filter((event) =>
					event?.events?.thumbnail?.country?.nodes?.some(
						(node) => node?.slug === slug
					)
				)
				.sort(
					(a, b) =>
						new Date(b.events.thumbnail.date) - new Date(a.events.thumbnail.date)
				),
			(event) => event.events?.thumbnail?.date
		)
			.filter((item) => new Date() < new Date(item.events.thumbnail.date))
			.sort(
				(a, b) =>
					new Date(b.events.thumbnail.date) - new Date(a.events.thumbnail.date)
			);

		const eventsAllSorted = filterAndSortByDate(
			eventsState?.data?.events?.nodes,
			(event) => event.events?.thumbnail?.date
		);

		let eventsList =
			eventsFiltered?.length > 0
				? eventsFiltered.sort(
						(a, b) =>
							new Date(b.events.thumbnail.date) - new Date(a.events.thumbnail.date)
				  )
				: eventsAllSorted
						.filter((item) => new Date() < new Date(item.events.thumbnail.date))
						.sort(
							(a, b) =>
								new Date(a.events.thumbnail.date) - new Date(b.events.thumbnail.date)
						);

		const webinarsFiltered = filterAndSortByDate(
			webinarsState?.data?.webinars?.nodes
				?.filter((webinar) =>
					webinar?.webinarsFields?.country?.nodes?.some(
						(node) => node?.slug === slug
					)
				)
				.sort(
					(a, b) =>
						new Date(b.webinarsFields.startDateAndTime) -
						new Date(a.webinarsFields.startDateAndTime)
				),
			(webinar) => webinar.webinarsFields?.startDateAndTime
		).sort(
			(a, b) =>
				new Date(b.webinarsFields.startDateAndTime) -
				new Date(a.webinarsFields.startDateAndTime)
		);

		const webinarsAllSorted = filterAndSortByDate(
			webinarsState?.data?.webinars?.nodes,
			(webinar) => webinar.webinarsFields?.startDateAndTime
		);

		let webinarList =
			webinarsFiltered?.length > 0
				? webinarsFiltered
				: webinarsAllSorted.sort(
						(a, b) =>
							new Date(b.webinarsFields.startDateAndTime) -
							new Date(a.webinarsFields.startDateAndTime)
				  );

		if (webinarList.length < 3) {
			webinarList = [
				...webinarList
					.filter(
						(removeYearItem) =>
							new Date(
								removeYearItem.webinarsFields.startDateAndTime
							).getFullYear() === new Date().getFullYear()
					)
					.sort(
						(a, b) =>
							new Date(b.webinarsFields.startDateAndTime) -
							new Date(a.webinarsFields.startDateAndTime)
					),
				...webinarsAllSorted.sort(
					(a, b) =>
						new Date(b.webinarsFields.startDateAndTime) -
						new Date(a.webinarsFields.startDateAndTime)
				),
			].filter(
				(item, index, self) =>
					index === self.findIndex((t) => t?.title === item?.title)
			);
		}
		if (eventsList.length === 0) {
			eventsList =
				eventsState?.data?.events?.nodes.sort(
					(a, b) =>
						new Date(b.events.thumbnail.date) - new Date(a.events.thumbnail.date)
				) || [];
		}

		// events: eventsList.slice(0, 1),
		// webinars: webinarList.slice(0, 3),
		console.log(eventsList, "eventsList");
		setEvents(eventsList.slice(0, 1));
		setWebinars(webinarList.slice(0, 3));
	}, [eventsState, webinarsState]);

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
								<Button color="primary" variant="filled" shape="rounded" textlowercase>
									{dynamicInsightsBtnProps(dataForBtn, "middleSectionsButton")?.btntext}
								</Button>
							</div>
						)
					}
				/>
				<Introduction
					data={data?.countries?.introduction}
					sectionid={data?.countries?.introduction?.tabTitle}
				/>
				<div className="pb_100">
					<WhichProducts
						data={data?.countries?.map}
						section={data?.countries?.fleetOfProducts}
					/>
				</div>
				<ServicesCircle
					hideId
					data={data?.countries?.keyAdvantages}
					onlySectionName={data?.countries?.keyAdvantages?.tabTitle}
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
				{mapJsonState && (
					<div className="ptb_100">
						<SoftwareMarket
							mapThumb={data?.countries?.mapThumb?.node?.mediaItemUrl}
							// sectionTitle={data?.countries?.availableRegions?.sectionTitle}
							sectionTitle={
								data?.countries?.availableRegions?.sectionTitle ||
								"Energy intelligence modelled for your market"
							}
							teamTitle={
								data?.countries?.availableRegions?.teamTitle || "Meet the team"
							}
							mapJson={mapJsonState}
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
												dynamicInsightsBtnProps(
													dataForBtn,
													"availableRegionsSectionsButton"
												).btntext
											}
										</Button>
									</div>
								)
							}
						/>
					</div>
				)}

				{data?.countries?.ourClients?.selectLogos && (
					<div className="pb_50">
						<TrustedLeaders
							data={data?.countries?.ourClients}
							sectionTitle={
								data?.countries?.ourClients?.sectionTitle ||
								"Trusted by industry leaders"
							}
							sectionid={data?.countries?.ourClients?.tabTitle}
						/>
					</div>
				)}
				{data?.countries?.ourClients?.testimonials && (
					<div className="pb_100">
						<TestimonialFeedback hideId data={data?.countries?.ourClients} />
					</div>
				)}
				<div className="pb_100">
					<PublicWebinar
						events={events}
						webinars={webinars}
						sectionid={data?.countries?.eventsAndWebinars?.tabTitle}
						sectionTitle={
							data?.countries?.eventsAndWebinars?.sectionTitle ||
							"All voices, all markets"
						}
					/>
				</div>

				<div className={`${styles.insightBg} pb_100 pt_30`}>
					<div className={`${styles.boxBg}`}>
						<div className="pb_100">
							<Insights
								insightsTitle={data?.countries?.insights?.insightsTitle}
								insightsListButtonText={data?.countries?.insights?.listButtonText}
								hideall
								isPowerBgVisible={true}
								isInsightsBlogsVisible={true}
								defaultList={data?.countries?.insights?.list?.nodes}
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
					<EosIntegratedSystem
						data={data?.countries?.integratedEnergy}
						name={data?.countries?.integratedEnergy?.tabTitle}
						buttonText={data?.countries?.integratedEnergy?.buttonText}
					/>
				</div>
			</main>
			<IframeModal hideLeft />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
