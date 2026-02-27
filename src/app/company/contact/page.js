/* eslint-disable quotes */
// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

// MODULES //

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import Button from "@/components/Buttons/Button";
import AccordianCommon from "@/components/AccordianCommon";
import InnerBanner from "@/components/InnerBanner";
import SoftwareCards from "@/components/SoftwareCards";
import IframeModal from "@/components/IframeModal";

// SECTIONS //
import CompanyContact from "@/sections/company/contact/CompanyContact";

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

// DATA //

// SERVICES //
import { getPageSeo } from "@/services/Seo.service";
import { getOfficesByRegions } from "@/services/Offices.service";
import { getContact } from "@/services/Contact.service";
import Link from "next/link";

/** generateMetadata  */
export async function generateMetadata() {
	const meta = await getPageSeo('page(id: "contact", idType: URI)');
	const seo = meta?.data?.page?.seo;

	return {
		title: seo?.title || "Default Title",
		description: seo?.metaDesc || "",
		keywords: seo?.metaKeywords || "",
		alternates: {
			canonical: "https://auroraer.com/company/contact", // 👈 canonical URL
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

/** Fetch  */
async function getData() {
	const [regions, page] = await Promise.all([
		await getOfficesByRegions(),
		await getContact(),
	]);

	const regionsArr = regions.data.regions.nodes
		?.sort((a, b) => a?.regionsFields?.sequence - b?.regionsFields?.sequence)
		.map((item) => {
			let obj = {};
			obj.title = item?.name;
			if (item?.countries?.nodes?.length > 0) {
				obj.children = (
					<div className={`${styles.CountryWrapper}`}>
						<div className={`${styles.CountryBox}`}>
							{item?.countries?.nodes
								?.sort((a, b) => b?.countries?.sequence - a?.countries?.sequence)
								.map((item2, ind2) => {
									return item2?.countries?.offices?.offices?.nodes?.map(
										(item3, ind3) => {
											// console.log(item3);
											// if (item2?.countries?.hideonglobalpresence) return null;
											return (
												<div className={`${styles.CountryItem}`} key={item2?.title}>
													<img
														height={179}
														width={446}
														src={hoverBg.src}
														className={`${styles.hoverBg} width_100 b_r_10`}
														alt="hover img"
													/>
													<div className={`${styles.countryImg}`}>
														<img
															src={item2?.countries?.bannerSection?.image?.node?.mediaItemUrl}
															className="width_100"
															alt={item3?.title}
														/>
													</div>
													<div className="f_j a_center pt_10">
														<h5 className="text_reg font_primary f_w_m color_secondary ">
															{item3?.title}
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
														<p
															className={`${styles.address} d_f color_dark_gray text_xs pt_10`}
														>
															<img src={location.src} className="" alt="location" />
															<span>{item3?.offices?.contact?.address}</span>
														</p>
													)}
													{item3?.offices?.contact?.tel && (
														<a
															href={`tel:${item3?.offices?.contact?.tel}`}
															className={`${styles.address} d_f color_dark_gray text_xs pt_10`}
														>
															<img src={call_icon.src} className="" alt="call" />
															<span>{item3?.offices?.contact?.tel}</span>
														</a>
													)}
												</div>
											);
										},
									);
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

export const revalidate = 30; // Revalidates every 60 seconds

/** Contact Page */
export default async function ContactPage() {
	const { props } = await getData();
	const data = {
		regions: props.regions,
		regionsArr: props.regionsArr,
		page: props.page,
	};

	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags Title={"Contact"} Desc={""} OgImg={""} Url={"/contact"} /> */}

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
								<h2 className="text_lg font_primary f_w_s_b color_white pb_30">
									Have a question before your visit?
								</h2>
								<p className="text_reg color_silver_gray pb_20">
									Our reception looks forward to your message.
								</p>
								<p className="text_reg color_silver_gray">
									For commercial queries, please connect with our experts for the{" "}
									<span className="f_w_b text_underline">
										<Link href="/global-presence">countries</Link>
									</span>{" "}
									you are interested in.
								</p>
							</div>
							<div className={`${styles.formBox}`}>
								{/* <iframe
									// src="https://go.auroraer.com/l/885013/2025-01-30/p1g4m"
									src="https://go.auroraer.com/l/885013/2025-04-22/pbkzc"
									className={`${styles.form_img}`}
									title="Form"
								></iframe> */}
								<CompanyContact />
							</div>
						</div>
					</div>
				</div>
				<section className={`${styles.CountryMain} pb_100`}>
					<div className="container">
						<div className={`${styles.accordian_main}`}>
							<h2 className="text_xl font_primary f_w_s_b color_secondary pb_20">
								Our office locations
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
