"use client";
// MODULES //

// COMPONENTS //
import InnerBanner from "@/components/InnerBanner";
import Insights from "@/components/Insights";
import TestimonialFeedback from "@/components/TestimonialFeedback";
import SoftwareCards from "@/components/SoftwareCards";
import IframeModal from "@/components/IframeModal";

// SECTIONS //
import TopEvents from "@/sections/events/TopEvents";
import EventsListing from "@/sections/events/EventsListing";
import Speakers from "@/sections/events/Speakers";

// PLUGINS //

// UTILS //
import { dynamicInsightsBtnProps } from "@/utils";

// STYLES //
import styles from "@/styles/pages/events/events.module.scss";

// IMAGES //

// SERVICES //

// DATA //

/** events Page */
export default function EventsWrap({
	data,
	categories,
	countries,
	products,
	softwares,
	services,
	page,
}) {
	// console.log(data, "data");

	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags Title={"Events"} Desc={""} OgImg={""} Url={"/events"} /> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.eventsPage}>
				<div className={`${styles.gradient} gradient`}>
					<div className={`${styles.topBg}`}>
						<InnerBanner
							bannerTitle={page?.banner?.title}
							bannerDescription={page?.banner?.desc}
							showContentOnly
						/>
					</div>
					<div>
						<TopEvents list={page?.featured?.nodes} />
					</div>
				</div>
				<div className="pt_60">
					<EventsListing
						// data={data?.slice(1, data.length)}
						data={data}
						categories={categories}
						years={Array(new Date().getFullYear() - 2023)
							.fill(null)
							.map((item, ind) => {
								return { title: 2024 + ind };
							})
							.reverse()}
						productService={[
							{
								category: "Product",
								options: products?.map((item) => item.title),
							},
							{
								category: "Software",
								options: softwares?.map((item) => item.title),
							},
							{
								category: "Service",
								options: services?.map((item) => item.title),
							},
						]}
						countries={countries}
					/>
				</div>
				{page?.speakers?.sectionTitle && (
					<div className="pb_100 pt_50">
						<Speakers
							data={[{ ...page.speakers }]}
							title={page?.speakers?.sectionTitle}
							desc={page?.speakers?.sectionDesc}
						/>
					</div>
				)}

				{page?.audienceSpeak?.sectionTitle && (
					<div className={`${styles.bottomBg} pb_100`}>
						<div className="container">
							<h2 className="text_xl font_primary color_secondary pb_20">
								{page?.audienceSpeak?.sectionTitle}
							</h2>
						</div>
						<TestimonialFeedback data={page?.audienceSpeak} />
					</div>
				)}
				<div className={`${styles.containerCustom} pb_100`}>
					<div className="container">
						<Insights
							isPowerBgVisible={true}
							// formSectionTitle="Interested in partnering with us?"
							// formSectionDesc="We're always looking for new and exciting opportunities to collaborate. For partnership enquiries, please contact <a href='mailto:events@auroraer.com'>events@auroraer.com</a>"
							formSectionTitle={page?.insights?.sectionTitle}
							formSectionDesc={page?.insights?.sectionDesc}
							formSectionBtnText={
								dynamicInsightsBtnProps({ postFields: page }, "insightsSectionButton")
									.btntext
							}
							formdata={dynamicInsightsBtnProps(
								{ postFields: page },
								"insightsSectionButton"
							)}
						/>
					</div>
				</div>
				<div className="pb_100">
					<SoftwareCards />
				</div>
				<IframeModal />
			</main>
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
