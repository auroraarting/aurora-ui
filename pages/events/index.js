// MODULES //
import { useEffect, useState } from "react";

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import InnerBanner from "@/components/InnerBanner";
import Insights from "@/components/Insights";
import TestimonialFeedback from "@/components/TestimonialFeedback";
import EventSmarterEnergy from "@/components/EventSmarterEnergy";
import SoftwareCards from "@/components/SoftwareCards";
import IframeModal from "@/components/IframeModal";

// SECTIONS //
import TopEvents from "@/sections/events/TopEvents";
import EventsListing from "@/sections/events/EventsListing";
import Speakers from "@/sections/events/Speakers";

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/events/events.module.scss";

// IMAGES //
import country_thumb from "@/../public/img/global-presence/country_thumb.jpg";

// SERVICES //
import {
	getAllEventCategories,
	getAllEventCountries,
	getAllEvents,
	getEventLandingPage,
} from "@/services/Events.service";
import { dynamicInsightsBtnProps } from "@/utils";

// DATA //

/** Fetch */
export async function getServerSideProps() {
	try {
		const [data, categories, filters, page] = await Promise.all([
			getAllEvents(),
			getAllEventCategories(),
			getAllEventCountries(),
			getEventLandingPage(),
		]);

		return {
			props: {
				data: data.data.events.nodes,
				categories: categories.data.eventscategories.nodes?.map((item) => {
					return { title: item.name };
				}),
				countries: filters.data.countries.nodes,
				products: filters.data.products.nodes,
				softwares: filters.data.softwares.nodes,
				services: filters.data.services.nodes,
				page: page.data.page.eventLanding,
			},
			revalidate: 10000,
		};
	} catch (error) {
		console.error("Error fetching WordPress data:", error);
		return {
			notFound: true,
		};
	}
}

/** events Page */
export default function Events({
	data,
	categories,
	countries,
	products,
	softwares,
	services,
	page,
}) {
	console.log(page);
	return (
		<div>
			{/* Metatags */}
			<MetaTags Title={"Events"} Desc={""} OgImg={""} Url={"/events"} />

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.eventsPage}>
				<div className={`${styles.topBg}`}>
					<InnerBanner
						bannerTitle={page?.banner?.title}
						bannerDescription={page?.banner?.desc}
						showContentOnly
					/>
				</div>
				<div>
					<TopEvents data={page?.featured?.nodes?.[0]} />
				</div>
				<div className="pt_60">
					<EventsListing
						// data={data?.slice(1, data.length)}
						data={data}
						categories={categories}
						years={Array(new Date().getFullYear() - 2000)
							.fill(null)
							.map((item, ind) => {
								return { title: 2001 + ind };
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
					<div className="ptb_100">
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
							<h2 className="text_xl font_primary f_w_m color_secondary pb_20">
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
							formSectionTitle="Interested in partnering with us?"
							formSectionDesc="We're always looking for new and exciting opportunities to collaborate. For partnership enquiries, please contact <a href='mailto:events@auroraer.com'>events@auroraer.com</a>"
							formSectionBtnText={
								dynamicInsightsBtnProps({ postFields: page }, "insightsSectionButton")
									.btnText
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
