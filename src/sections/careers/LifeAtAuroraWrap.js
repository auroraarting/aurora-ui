"use client";
/* eslint-disable quotes */
// MODULES //
import { useEffect, useState } from "react";

// COMPONENTS //
import MetaTags from "@/components/MetaTags";
import InnerBanner from "@/components/InnerBanner";
import Button from "@/components/Buttons/Button";
import SectionsHeader from "@/components/SectionsHeader";
import SmarterEnergy from "@/components/SmarterEnergy";
import IntegratedSystem from "@/components/IntegratedSystem";
import GlobalMap from "@/components/GlobalMap";
import Insights from "@/components/Insights";
import IframeModal from "@/components/IframeModal";

// SECTIONS //
import TeamAurora from "@/sections/careers/TeamAurora";
import EarlyCareersInside from "@/sections/careers/EarlyCareersInside";
import CollaborationSupport from "@/sections/careers/CollaborationSupport";
import JobOpenings from "@/sections/careers/JobOpenings";
import ConnectWithUs from "@/sections/careers/ConnectWithUs";
import Counter from "@/sections/careers/Counter";
import Benifits from "@/sections/careers/Benifits";

// PLUGINS //
import { Link, scroller } from "react-scroll";

// UTILS //
import { dynamicInsightsBtnProps } from "@/utils";

// STYLES //
import styles from "@/styles/pages/careers/LifeAtAurora.module.scss";

// IMAGES //

// DATA //

// SERVICES //

/** LifeAtAurora Page */
export default function LifeAtAuroraWrap({
	data,
	jobs,
	otherList,
	countries,
	offices,
	careersList,
}) {
	const [mapJson, setMapJson] = useState();
	const dataForBtn = { postFields: data || {} };

	useEffect(() => {
		let tempMapJson = {
			zoom: 9,
			name: "Global",
			centerOfCountry: {
				lat: 18.1307561,
				lng: 23.554042,
			},
			markers: [],
		};

		offices?.map((item) => {
			let obj = {
				name: item.title,
				lat: item.offices.map.lat,
				lng: item.offices.map.lng,
				url: "",
				hoverImg: item.offices.thumbnail.node.mediaItemUrl,
				unique: Math.random(),
				// icon:
				// 	"https://aurora.mystagingwebsite.com/wp-content/uploads/2025/03/serviceIcon.png",
			};

			tempMapJson.markers.push(obj);
		});

		setMapJson(tempMapJson);
	}, []);

	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags
				Title={"Life At Aurora"}
				Desc={""}
				OgImg={""}
				Url={"/life-at-aurora"}
			/> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.LifeAtAuroraPage}>
				<InnerBanner
					bannerTitle={data?.banner?.title}
					bannerDescription={data?.banner?.description}
					desktopImage={data?.banner?.dekstopimage?.node?.mediaItemUrl}
					mobileImage={data?.banner?.mobileimage?.node?.mediaItemUrl}
					vimeoid={data?.banner?.videoLink}
					btnTxt={data?.banner?.buttonText}
					btnLink={data?.banner?.buttonLink}
					dynamicBtn={dynamicInsightsBtnProps(dataForBtn, "topSectionButton")}
				/>
				<SectionsHeader
					customHtml={
						dynamicInsightsBtnProps(dataForBtn, "middleSectionButton").btntext && (
							<div
								{...dynamicInsightsBtnProps(dataForBtn, "middleSectionButton")}
								key="btn"
								to="Insights"
							>
								<Button color="primary" variant="filled" shape="rounded" textlowercase>
									{dynamicInsightsBtnProps(dataForBtn, "middleSectionButton").btntext}
								</Button>
							</div>
						)
					}
				/>
				<div className="belongingBg">
					{data?.keyAdvantages && (
						<div>
							<SmarterEnergy data={data?.keyAdvantages} sectionName="Our Culture" />
						</div>
					)}
					<div className="">
						<TeamAurora
							defaultData={data?.teamAurora?.teams}
							id="Employee-Speak"
							sectionName="Employee Speak"
						/>
					</div>
				</div>
				{/* {mapJson && ( */}
				<div className="dark_bg">
					<GlobalMap
						locationJson={[mapJson]}
						marqueeText={data?.globalMap?.marqueetext}
						sectionName="Global Presence"
						hideOnHover
					/>
				</div>
				{/* )} */}
				<div className={`${styles.countBg} pb_100`}>
					<Counter
						data={{ stats: { ...data.stats, offices: data.offices.length } }}
					/>
				</div>
				<div className={`${styles.EarlyMain}`}>
					<EarlyCareersInside data={careersList} />
				</div>
				<Benifits data={data?.benefits} />
				{data?.collaborationSupport?.list?.length > 0 && (
					<div>
						<CollaborationSupport data={data?.collaborationSupport} />
					</div>
				)}
				<div>
					<JobOpenings data={jobs} hideFilters={false} hideRedirect />
				</div>

				<div className="pt_100">
					<ConnectWithUs data={offices} />
				</div>
				<div className={`${styles.containerCustom} pb_100`}>
					<div className="container">
						<Insights
							isPowerBgVisible={true}
							defaultList={otherList}
							countries={countries}
							formSectionTitle={data?.insights?.sectionTitle}
							formSectionDesc={data?.insights?.sectionDesc}
							formSectionBtnText={
								dynamicInsightsBtnProps(dataForBtn, "insightsSectionButton").btntext
							}
							insightsTitle="Previous Events from Aurora"
							formdata={dynamicInsightsBtnProps(dataForBtn, "insightsSectionButton")}
						/>
					</div>
				</div>
				<div className="pb_100">
					<IntegratedSystem />
				</div>
			</main>
			<IframeModal />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
