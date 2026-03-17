/* eslint-disable quotes */
// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
export const dynamic = "force-static"; // Use when data is highly cacheable
// ❌ Remove: export const fetchCache = "force-no-store";

// MODULES //

// COMPONENTS //
import InnerBanner from "@/components/InnerBanner";
import IntegratedSystem from "@/components/IntegratedSystem";
import SmarterEnergy from "@/components/SmarterEnergy";
import IframeModal from "@/components/IframeModal";
import ServicesCircleWhite from "@/components/ServicesCircleWhite";
import SectionsHeader from "@/components/SectionsHeader";
import Button from "@/components/Buttons/Button";

// SECTIONS //
import CareerCountryCard from "@/sections/careers/CareerCountryCard";
import AllVideos from "@/components/AllVideos";
import GraduateExperiance from "@/sections/careers/GraduateExperiance";
import ConnectWithUs from "@/sections/careers/ConnectWithUs";
import EarlyCareersWrap from "@/sections/careers/EarlyCareersWrap";

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/careers/early-careers/EarlyCareers.module.scss";

// IMAGES //
import call_icon from "@/../public/img/icons/call_icon.svg";
import location from "@/../public/img/icons/location.svg";
import country_thumb from "@/../public/img/global-presence/country_thumb.jpg";
import hoverBg from "@/../public/img/contact/hoverBg.png";

// DATA //

// SERVICES //
import {
	getEarlyCareersListing,
	getEarlyCareersListingByRegions,
	getEarlyCareersPage,
} from "@/services/EarlyCareers.service";
import { getInsightsCategories } from "@/services/Insights.service";
import { getOffices, getOfficesByRegions } from "@/services/Offices.service";
import { getPageSeo } from "@/services/Seo.service";

export const revalidate = 30; // Revalidates every 60 seconds

/** generateMetadata  */
export async function generateMetadata() {
	const meta = await getPageSeo(
		'page(id: "early-careers-landing", idType: URI)',
	);
	const seo = meta?.data?.page?.seo;

	return {
		title: seo?.title || "Default Title",
		description: seo?.metaDesc || "",
		keywords: seo?.metaKeywords || "",
		alternates: {
			canonical: "https://auroraer.com/careers/early-careers", // 👈 canonical URL
		},
		openGraph: {
			images: [
				{
					url: "https://auroraer.com/img/og-image.jpg",
				},
			],
		},
	};
}

/** EarlyCareers Page */
export default async function EarlyCareers() {
	const [
		dataFetch,
		pageFetch,
		categoriesForSelect,
		officesFetch,
		careersRegions,
	] = await Promise.all([
		getEarlyCareersListing("first: 99999"),
		getEarlyCareersPage(),
		getInsightsCategories(),
		getOffices(),
		getEarlyCareersListingByRegions(),
	]);

	const regionsArr = careersRegions.data.regions.nodes
		?.sort((a, b) => a?.regionsFields?.sequence - b?.regionsFields?.sequence)
		.filter((regionFilter) => regionFilter?.earlyCareers?.nodes?.length > 0)
		.map((regionItem) => {
			let obj = {};
			obj.title = regionItem?.name;
			if (regionItem?.earlyCareers?.nodes?.length > 0) {
				obj.children = (
					<div className={`${styles.SliderMain} pt_20`} key={regionItem?.slug}>
						{regionItem?.earlyCareers?.nodes?.map((item) => {
							return (
								<a
									href={`/careers/early-careers/${item?.slug}`}
									className={`${styles.cardItem}`}
									key={item?.slug}
								>
									<div className={`${styles.cardImg}`}>
										<img
											src={item?.earlyCareers?.thumbnail?.thumb?.node?.mediaItemUrl}
											className={`${styles.countryImg} b_r_10`}
											alt={item?.earlyCareers?.thumbnail?.country?.node?.title}
										/>
										{item?.earlyCareers?.thumbnail?.islive && (
											<p
												className={`${styles.categoryTxt} text_xxs color_secondary text_uppercase`}
											>
												Live
											</p>
										)}
									</div>
									<div className={`${styles.cardDesc} pt_30`}>
										{item?.earlyCareers?.thumbnail?.country?.node?.title && (
											<p className="text_xs color_white color_platinum_gray f_r_a_center text_uppercase f_w_m">
												<img
													src={location.src}
													className={`${styles.location}`}
													alt="location"
												/>
												<span>{item?.earlyCareers?.thumbnail?.country?.node?.title}</span>
											</p>
										)}
										<h4
											className={`text_md color_white f_w_m font_primary pt_10 ${styles.title}`}
										>
											{item?.title}
										</h4>
										<div className={`${styles.btn_box} pt_15`}>
											<a href={`/careers/early-careers/${item?.slug}`}>
												<Button color="secondary" variant="underline" mode="dark">
													Read more
												</Button>
											</a>
										</div>
									</div>
								</a>
							);
						})}
					</div>
				);
			}

			return obj;
		});

	console.log(careersRegions, "careersRegions");

	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags
				Title={"Early Careers"}
				Desc={""}
				OgImg={""}
				Url={"/careers/early-careers"}
			/> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<EarlyCareersWrap
				dataFetch={dataFetch}
				pageFetch={pageFetch}
				categoriesForSelect={categoriesForSelect}
				officesFetch={officesFetch}
				regionsArr={regionsArr}
			/>
			{/* Page Content ends here */}
		</div>
	);
}
