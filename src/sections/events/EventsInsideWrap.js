"use client";
// MODULES //

// COMPONENTS //
import MetaTags from "@/components/MetaTags";
import Insights from "@/components/Insights";
import SectionsHeader from "@/components/SectionsHeader";
import Button from "@/components/Buttons/Button";
import IframeModal from "@/components/IframeModal";
import Breadcrumbs from "@/components/Breadcrumbs";

// SECTIONS //
import EventsInsideBanner from "@/sections/events/EventsInsideBanner";
import EventsMiddleDescription from "@/sections/events/EventsMiddleDescription";
import EventsLocation from "@/sections/events/EventsLocation";
import Sponsors from "@/sections/events/Sponsors";
import EventInsideVideo from "@/sections/events/EventInsideVideo";
import Speakers from "@/sections/events/Speakers";
import EventsMiddleRight from "@/sections/events/EventsMiddleRight";
import EventsGallery from "@/sections/events/EventsGallery";
import AudienceBreakdown from "@/sections/events/AudienceBreakdown";
import DownloadList from "@/sections/events/DownloadList";
import CountdownTimer from "@/sections/events/CountdownTimer";

// PLUGINS //
import parse from "html-react-parser";

// UTILS //
import { dynamicInsightsBtnProps, slugify } from "@/utils";

// STYLES //
import styles from "@/styles/pages/events/EventsInside.module.scss";
import ContentFromCms from "@/components/ContentFromCms";

// IMAGES //

// DATA //

// SERVICES //

/** Fetch  */

/** EventsInside Page */
export default function EventsInsideWrap({
	data,
	events,
	countries,
	eventsOriginal,
	pastEvents,
}) {
	const dataForBtn = { postFields: data?.events || {} };
	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags
				Title={data?.title}
				Desc={""}
				OgImg={""}
				Url={`/events/${data?.slug}`}
			/> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.EventsInsidePage}>
				{data?.events?.thumbnail?.status === "Upcoming" && (
					<CountdownTimer targetDate={data?.events?.thumbnail?.date} />
				)}
				{/* <div className="container">
					<Breadcrumbs />
				</div> */}
				<div className="pt_40">
					<EventsInsideBanner data={data} />
				</div>
				<SectionsHeader
					customHtml={
						dynamicInsightsBtnProps(dataForBtn, "topSectionButton").btntext && (
							<div
								{...dynamicInsightsBtnProps(dataForBtn, "topSectionButton")}
								key="btn"
								to="Insights"
							>
								<Button color="primary" variant="filled" shape="rounded" textlowercase>
									{dynamicInsightsBtnProps(dataForBtn, "topSectionButton").btntext}
								</Button>
							</div>
						)
					}
				/>
				<section className={`${styles.eventsMiddle} pb_80 pt_40`}>
					<div className="container">
						<div className={`${styles.eventsMiddleFlex} f_j`}>
							<div className={`${styles.eventsMiddleLeft}`}>
								<EventsMiddleDescription data={data} />
								<Sponsors data={data} />
								{data?.events?.sections?.map((item) => {
									if (!item?.content) {
										return <></>;
									}
									return (
										<section
											key={item?.sectionTitle}
											id={slugify(item?.sectionTitle)}
											data-name={item?.sectionTitle}
											className={`pt_50 ${styles.contentBox} contentBox`}
										>
											{parse(item?.content)}
										</section>
									);
								})}
								{data?.events?.thumbnail?.status === "Upcoming" && (
									<EventsLocation data={data} />
								)}
								{data?.events?.glimps?.gallery?.nodes && (
									<div className="">
										<EventsGallery data={data} />
									</div>
								)}
								{/* <Sponsors data={data} /> */}
								{/* {data?.events?.sections?.map((item) => {
									if (!item?.content) {
											return <></>;
										}
									return (
										<section
											key={item?.sectionTitle}
											id={slugify(item?.sectionTitle)}
											data-name={item?.sectionTitle}
											className={`pt_50 ${styles.contentBox} contentBox`}
										>
											{parse(item?.content)}
										</section>
									);
								})} */}
								{data?.events?.glimps?.video && (
									<div className="">
										<EventInsideVideo data={data} />
									</div>
								)}
							</div>
							<div className={`${styles.eventsMiddleRight}`}>
								<EventsMiddleRight data={data} events={eventsOriginal} />
							</div>
						</div>
					</div>
				</section>
				{data?.events?.breakdown?.sectionTitle && (
					<div className="pb_100">
						<AudienceBreakdown data={data} />
					</div>
				)}
				{data?.events?.speakers?.speakers && (
					<div className="pb_40">
						<Speakers
							data={data?.events?.speakers?.speakers}
							title={data?.events?.speakers?.sectionTitle}
							desc={data?.events?.speakers?.sectionDesc}
						/>
					</div>
				)}
				{data?.events?.downloads && (
					<div className="pb_60">
						<DownloadList data={data} />
					</div>
				)}
				{/* {pastEvents?.length > 0 && ( */}
				<div className="pb_100">
					<Insights
						allTag="Past Event"
						insightsLink="/events/"
						isPowerBgVisible={
							data?.events?.thumbnail?.status === "Past" ? false : true
						}
						isInsightsBlogsVisible={true}
						defaultList={pastEvents}
						countries={countries}
						formSectionTitle={data?.events?.insights?.sectionTitle}
						formSectionDesc={data?.events?.insights?.sectionDesc}
						formSectionBtnText={
							dynamicInsightsBtnProps(dataForBtn, "insightsSectionButton").btntext
						}
						insightsTitle="Previous Events from Aurora"
						formdata={dynamicInsightsBtnProps(dataForBtn, "insightsSectionButton")}
					/>
				</div>
				{/* )} */}
				<IframeModal />
			</main>
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
