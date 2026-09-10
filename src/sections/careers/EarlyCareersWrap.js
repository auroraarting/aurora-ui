// Force SSR (like getServerSideProps)
export const dynamic = "force-dynamic"; // ⚠️ Important!
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

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/careers/early-careers/EarlyCareers.module.scss";
import AccordianCommon from "@/components/AccordianCommon";

// IMAGES //

// DATA //

// SERVICES //

/** EarlyCareers Page */
export default function EarlyCareersWrap({
	careers,
	page,
	programs,
	countries: countryOptions,
	offices,
	regionsArr,
}) {
	// The page now passes each list already unwrapped — the REST services
	// return nodes directly rather than GraphQL's { data: { x: { nodes } } }.

	const data = careers?.map((item) => {
		let countries = {
			node: {
				title: item?.earlyCareers?.thumbnail?.country?.node?.title || "",
			},
		};
		if (item?.earlyCareers?.banner?.city) {
			countries = {
				node: {
					title: item?.earlyCareers?.banner?.city,
				},
			};
		}
		return {
			...item,
			earlyCareers: {
				...item?.earlyCareers,
				thumbnail: {
					...item?.earlyCareers.thumbnail,
					country: countries,
				},
			},
		};
	});
	// Copied, not aliased: the loop below pushes the programme cities into this
	// list, and mutating the array the service returned would corrupt it for
	// every later reader of the same cached response.
	let countries = [...(countryOptions || [])];

	careers?.map((item) => {
		if (item?.earlyCareers?.banner?.city) {
			countries.push({ title: item?.earlyCareers?.banner?.city });
		}
	});

	countries = countries.sort((a, b) => a.title.localeCompare(b.title));

	const sortedArr1 = [...data]
		.filter((item) => item?.earlyCareers?.thumbnail?.islive)
		.sort((a, b) =>
			a?.earlyCareers?.banner?.city?.localeCompare(b?.earlyCareers?.banner?.city),
		);
	const sortedArr2 = [...data]
		.filter((item) => !item?.earlyCareers?.thumbnail?.islive)
		.sort((a, b) =>
			a?.earlyCareers?.banner?.city?.localeCompare(b?.earlyCareers?.banner?.city),
		);
	const sortedArr = [...sortedArr1, ...sortedArr2];

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
			<main className={styles.EarlyCareers}>
				<InnerBanner
					bannerTitle={page?.banner?.title}
					bannerDescription={page?.banner?.desc}
					desktopImage={page?.banner?.desktop?.node?.mediaItemUrl}
					mobileImage={page?.banner?.mobile?.node?.mediaItemUrl}
				/>
				{/* <div className="pt_60"> */}
				<SectionsHeader
					customHtml={
						<div key="btn" to="Insights">
							<a href="/careers/join-us">
								<Button color="primary" variant="filled" shape="rounded">
									Join us
								</Button>
							</a>
						</div>
					}
				/>
				{/* </div> */}
				<div className="">
					<CareerCountryCard
						page={page}
						data={sortedArr}
						countries={countries}
						programs={programs}
						regionsArr={regionsArr}
					/>
				</div>
				<div>
					<SmarterEnergy data={page.expertise} />
				</div>
				<ServicesCircleWhite data={page.keyAdvantages} sectionName="Careers" />
				<div className="ptb_100 dark_bg">
					<AllVideos
						title={page?.careerSeries?.title}
						desc={page?.careerSeries?.sectionDesc}
						redirectLink={page?.careerSeries?.buttonLink}
						iframe={page?.careerSeries?.iframe}
						sectionName="Latest Videos"
					/>
				</div>
				<div className={`${styles.CricleBg} pt_80`}>
					<GraduateExperiance
						title={page?.listing?.title}
						defaultData={page?.graduateExperiences?.teams}
					/>
				</div>
				<div className="pt_60">
					<ConnectWithUs data={offices} />
				</div>
				<div className="pb_100">
					<IntegratedSystem />
				</div>
			</main>
			<IframeModal />
			{/* Page Content ends here */}
		</div>
	);
}
