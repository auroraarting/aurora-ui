// Force SSR (like getServerSideProps)
export const dynamic = "force-dynamic"; // ⚠️ Important!
export const fetchCache = "force-no-store"; // Optional: disables fetch caching

// MODULES //

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import Button from "@/components/Buttons/Button";
import AccordianCommon from "@/components/AccordianCommon";
import InnerBanner from "@/components/InnerBanner";
import SoftwareCards from "@/components/SoftwareCards";

// SECTIONS //

// PLUGINS //

// STYLES //
import styles from "@/styles/pages/company/Contact.module.scss";

// UTILS //
import { getMapJsonForAllRegions } from "@/utils";

// IMAGES //
import call_icon from "@/../public/img/icons/call_icon.svg";
import location from "@/../public/img/icons/location.svg";
import country_thumb from "@/../public/img/global-presence/country_thumb.jpg";
import hoverBg from "@/../public/img/contact/hoverBg.png";

// SERVICES //
import {
	getGlobalPresencePage,
	getRegions,
} from "@/services/GlobalPresence.service";
import { getOfficesByRegions } from "@/services/Offices.service";
import { getContact } from "@/services/Contact.service";
import IframeModal from "@/components/IframeModal";

// DATA //

/** Meta Data */
export const metadata = {
	title: "Contact | Aurora",
	description: "Aurora",
};

/** Fetch  */
async function getData() {
	const [regions, page] = await Promise.all([
		getOfficesByRegions(),
		getContact(),
	]);

	const regionsArr = regions.data.regions.nodes?.map((item) => {
		let obj = {};
		obj.title = item?.name;
		if (item?.countries?.nodes?.length > 0) {
			obj.children = (
				<div className={`${styles.CountryWrapper}`}>
					<div className={`${styles.CountryBox}`}>
						{item?.countries?.nodes?.map((item2, ind2) => {
							return item2?.countries?.offices?.offices?.nodes?.map((item3, ind3) => {
								console.log(item3);
								return (
									<div className={`${styles.CountryItem}`} key={item2?.title}>
										<img
											height={179}
											width={446}
											src={hoverBg.src}
											className={`${styles.hoverBg} width_100 b_r_10`}
											alt="img"
										/>
										<div className={`${styles.countryImg}`}>
											<img
												src={item2?.featuredImage?.node?.mediaItemUrl}
												className="width_100 b_r_10"
												alt="img"
											/>
										</div>
										<div className="f_j a_center pt_10">
											<h5 className="text_reg font_primary f_w_m color_secondary ">
												{item2?.title}
											</h5>
											{item3?.offices?.map?.mapUrl && (
												<a href={item3?.offices?.map?.mapUrl}>
													<Button color="secondary" variant="underline" size="xs">
														View Map
													</Button>
												</a>
											)}
										</div>
										{item3?.offices?.contact?.address && (
											<p className={`${styles.address} d_f color_dark_gray text_xs pt_10`}>
												<img src={location.src} className="" alt="img" />
												<span>{item3?.offices?.contact?.address}</span>
											</p>
										)}
										{item3?.offices?.contact?.tel && (
											<a
												href={`tel:${item3?.offices?.contact?.tel}`}
												className={`${styles.address} d_f color_dark_gray text_xs pt_10`}
											>
												<img src={call_icon.src} className="" alt="img" />
												<span>{item3?.offices?.contact?.tel}</span>
											</a>
										)}
									</div>
								);
							});
						})}
					</div>
				</div>
			);
		}
		return obj;
	});

	return {
		props: {
			regions: regions.data.regions.nodes,
			regionsArr,
			page: page.data.page.contact,
		},
	};
}

/** Contact Page */
export default async function ContactPage() {
	const { props } = await getData();
	const data = {
		regions: props.regions,
		regionsArr: props.regionsArr,
		page: props.page,
	};

	console.log(data);

	return (
		<div>
			{/* Metatags */}
			<MetaTags Title={"Contact"} Desc={""} OgImg={""} Url={"/contact"} />

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.ContactPage}>
				<div className={`${styles.topBg} pb_100`}>
					<InnerBanner
						bannerTitle={data.page.banner.title}
						bannerDescription={data.page.banner.description}
						showContentOnly
					/>

					<div className="container">
						<div className={`${styles.formFlex} f_j`}>
							<div className={`${styles.form_title}`}>
								<h2 className="text_lg font_primary f_w_s_b color_white pb_20">
									Have a question?
								</h2>
								<p className="text_reg color_silver_gray">
									Get in touch, we look forward to hearing from you.
								</p>
							</div>
							<div className={`${styles.formBox}`}>
								<iframe
									// src="https://go.auroraer.com/l/885013/2025-01-30/p1g4m"
									src="https://go.auroraer.com/l/885013/2025-04-22/pbkzc"
									className={`${styles.form_img}`}
									title="Form"
								></iframe>
							</div>
						</div>
					</div>
				</div>
				<section className={`${styles.CountryMain} pb_100`}>
					<div className="container">
						<div className={`${styles.accordian_main}`}>
							<h2 className="text_xl font_primary f_w_s_b color_secondary pb_20">
								Our Presence
							</h2>
							{data && (
								<AccordianCommon
									fontStyle={"text_lg"}
									fontWeight={"f_w_s_b"}
									fontFamily={"font_primary"}
									fontColor={"color_secondary"}
									items={data?.regionsArr}
								/>
							)}
						</div>
					</div>
				</section>
				<div className="pb_100">
					<SoftwareCards />
				</div>
			</main>
			<IframeModal />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
