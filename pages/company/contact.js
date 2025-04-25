// MODULES //
import { useEffect, useState } from "react";

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

// DATA //
const tempArr = [
	{
		title: "Asia",
		children: (
			<div className={`${styles.CountryWrapper}`}>
				<div className={`${styles.CountryBox}`}>
					<div className={`${styles.CountryItem}`}>
						<img
							src={hoverBg.src}
							className={`${styles.hoverBg} width_100 b_r_10`}
							alt="img"
						/>
						<div className={`${styles.countryImg}`}>
							<img src={country_thumb.src} className="width_100 b_r_10" alt="img" />
						</div>
						<div className="f_j a_center pt_10">
							<h5 className="text_reg font_primary f_w_m color_secondary ">India</h5>
							<Button color="secondary" variant="underline" size="xs">
								View Map
							</Button>
						</div>
						<p className={`${styles.address} d_f color_dark_gray text_xs pt_10`}>
							<img src={location.src} className="" alt="img" />
							<span>St Aldates Chambers, 109-113 St Aldates, Oxford, OX1 1DS, UK</span>
						</p>
						<a
							href="tel:+441865952700"
							className={`${styles.address} d_f color_dark_gray text_xs pt_10`}
						>
							<img src={call_icon.src} className="" alt="img" />
							<span>+44 1865 952700</span>
						</a>
					</div>
					<div className={`${styles.CountryItem}`}>
						<img
							src={hoverBg.src}
							className={`${styles.hoverBg} width_100 b_r_10`}
							alt="img"
						/>
						<div className={`${styles.countryImg}`}>
							<img src={country_thumb.src} className="width_100 b_r_10" alt="img" />
						</div>
						<div className="f_j a_center pt_10">
							<h5 className="text_reg font_primary f_w_m color_secondary ">India</h5>
							<Button color="secondary" variant="underline" size="xs">
								View Map
							</Button>
						</div>
						<p className={`${styles.address} d_f color_dark_gray text_xs pt_10`}>
							<img src={location.src} className="" alt="img" />
							<span>St Aldates Chambers, 109-113 St Aldates, Oxford, OX1 1DS, UK</span>
						</p>
						<a
							href="tel:+441865952700"
							className={`${styles.address} d_f color_dark_gray text_xs pt_10`}
						>
							<img src={call_icon.src} className="" alt="img" />
							<span>+44 1865 952700</span>
						</a>
					</div>
					<div className={`${styles.CountryItem}`}>
						<img
							src={hoverBg.src}
							className={`${styles.hoverBg} width_100 b_r_10`}
							alt="img"
						/>
						<div className={`${styles.countryImg}`}>
							<img src={country_thumb.src} className="width_100 b_r_10" alt="img" />
						</div>
						<div className="f_j a_center pt_10">
							<h5 className="text_reg font_primary f_w_m color_secondary ">India</h5>
							<Button color="secondary" variant="underline" size="xs">
								View Map
							</Button>
						</div>
						<p className={`${styles.address} d_f color_dark_gray text_xs pt_10`}>
							<img src={location.src} className="" alt="img" />
							<span>St Aldates Chambers, 109-113 St Aldates, Oxford, OX1 1DS, UK</span>
						</p>
						<a
							href="tel:+441865952700"
							className={`${styles.address} d_f color_dark_gray text_xs pt_10`}
						>
							<img src={call_icon.src} className="" alt="img" />
							<span>+44 1865 952700</span>
						</a>
					</div>
				</div>
			</div>
		),
	},
	{
		title: "Australia",
		children: (
			<div className={`${styles.CountryWrapper}`}>
				<div className={`${styles.CountryBox}`}>
					<div className={`${styles.CountryItem}`}>
						<img
							src={hoverBg.src}
							className={`${styles.hoverBg} width_100 b_r_10`}
							alt="img"
						/>
						<div className={`${styles.countryImg}`}>
							<img src={country_thumb.src} className="width_100 b_r_10" alt="img" />
						</div>
						<div className="f_j a_center pt_10">
							<h5 className="text_reg font_primary f_w_m color_secondary ">India</h5>
							<Button color="secondary" variant="underline" size="xs">
								View Map
							</Button>
						</div>
						<p className={`${styles.address} d_f color_dark_gray text_xs pt_10`}>
							<img src={location.src} className="" alt="img" />
							<span>St Aldates Chambers, 109-113 St Aldates, Oxford, OX1 1DS, UK</span>
						</p>
						<a
							href="tel:+441865952700"
							className={`${styles.address} d_f color_dark_gray text_xs pt_10`}
						>
							<img src={call_icon.src} className="" alt="img" />
							<span>+44 1865 952700</span>
						</a>
					</div>
					<div className={`${styles.CountryItem}`}>
						<img
							src={hoverBg.src}
							className={`${styles.hoverBg} width_100 b_r_10`}
							alt="img"
						/>
						<div className={`${styles.countryImg}`}>
							<img src={country_thumb.src} className="width_100 b_r_10" alt="img" />
						</div>
						<div className="f_j a_center pt_10">
							<h5 className="text_reg font_primary f_w_m color_secondary ">India</h5>
							<Button color="secondary" variant="underline" size="xs">
								View Map
							</Button>
						</div>
						<p className={`${styles.address} d_f color_dark_gray text_xs pt_10`}>
							<img src={location.src} className="" alt="img" />
							<span>St Aldates Chambers, 109-113 St Aldates, Oxford, OX1 1DS, UK</span>
						</p>
						<a
							href="tel:+441865952700"
							className={`${styles.address} d_f color_dark_gray text_xs pt_10`}
						>
							<img src={call_icon.src} className="" alt="img" />
							<span>+44 1865 952700</span>
						</a>
					</div>
					<div className={`${styles.CountryItem}`}>
						<img
							src={hoverBg.src}
							className={`${styles.hoverBg} width_100 b_r_10`}
							alt="img"
						/>
						<div className={`${styles.countryImg}`}>
							<img src={country_thumb.src} className="width_100 b_r_10" alt="img" />
						</div>
						<div className="f_j a_center pt_10">
							<h5 className="text_reg font_primary f_w_m color_secondary ">India</h5>
							<Button color="secondary" variant="underline" size="xs">
								View Map
							</Button>
						</div>
						<p className={`${styles.address} d_f color_dark_gray text_xs pt_10`}>
							<img src={location.src} className="" alt="img" />
							<span>St Aldates Chambers, 109-113 St Aldates, Oxford, OX1 1DS, UK</span>
						</p>
						<a
							href="tel:+441865952700"
							className={`${styles.address} d_f color_dark_gray text_xs pt_10`}
						>
							<img src={call_icon.src} className="" alt="img" />
							<span>+44 1865 952700</span>
						</a>
					</div>
				</div>
			</div>
		),
	},
	{
		title: "Europe",
		children: (
			<div className={`${styles.CountryWrapper}`}>
				<div className={`${styles.CountryBox}`}>
					<div className={`${styles.CountryItem}`}>
						<img
							src={hoverBg.src}
							className={`${styles.hoverBg} width_100 b_r_10`}
							alt="img"
						/>
						<div className={`${styles.countryImg}`}>
							<img src={country_thumb.src} className="width_100 b_r_10" alt="img" />
						</div>
						<div className="f_j a_center pt_10">
							<h5 className="text_reg font_primary f_w_m color_secondary ">India</h5>
							<Button color="secondary" variant="underline" size="xs">
								View Map
							</Button>
						</div>
						<p className={`${styles.address} d_f color_dark_gray text_xs pt_10`}>
							<img src={location.src} className="" alt="img" />
							<span>St Aldates Chambers, 109-113 St Aldates, Oxford, OX1 1DS, UK</span>
						</p>
						<a
							href="tel:+441865952700"
							className={`${styles.address} d_f color_dark_gray text_xs pt_10`}
						>
							<img src={call_icon.src} className="" alt="img" />
							<span>+44 1865 952700</span>
						</a>
					</div>
					<div className={`${styles.CountryItem}`}>
						<img
							src={hoverBg.src}
							className={`${styles.hoverBg} width_100 b_r_10`}
							alt="img"
						/>
						<div className={`${styles.countryImg}`}>
							<img src={country_thumb.src} className="width_100 b_r_10" alt="img" />
						</div>
						<div className="f_j a_center pt_10">
							<h5 className="text_reg font_primary f_w_m color_secondary ">India</h5>
							<Button color="secondary" variant="underline" size="xs">
								View Map
							</Button>
						</div>
						<p className={`${styles.address} d_f color_dark_gray text_xs pt_10`}>
							<img src={location.src} className="" alt="img" />
							<span>St Aldates Chambers, 109-113 St Aldates, Oxford, OX1 1DS, UK</span>
						</p>
						<a
							href="tel:+441865952700"
							className={`${styles.address} d_f color_dark_gray text_xs pt_10`}
						>
							<img src={call_icon.src} className="" alt="img" />
							<span>+44 1865 952700</span>
						</a>
					</div>
					<div className={`${styles.CountryItem}`}>
						<img
							src={hoverBg.src}
							className={`${styles.hoverBg} width_100 b_r_10`}
							alt="img"
						/>
						<div className={`${styles.countryImg}`}>
							<img src={country_thumb.src} className="width_100 b_r_10" alt="img" />
						</div>
						<div className="f_j a_center pt_10">
							<h5 className="text_reg font_primary f_w_m color_secondary ">India</h5>
							<Button color="secondary" variant="underline" size="xs">
								View Map
							</Button>
						</div>
						<p className={`${styles.address} d_f color_dark_gray text_xs pt_10`}>
							<img src={location.src} className="" alt="img" />
							<span>St Aldates Chambers, 109-113 St Aldates, Oxford, OX1 1DS, UK</span>
						</p>
						<a
							href="tel:+441865952700"
							className={`${styles.address} d_f color_dark_gray text_xs pt_10`}
						>
							<img src={call_icon.src} className="" alt="img" />
							<span>+44 1865 952700</span>
						</a>
					</div>
				</div>
			</div>
		),
	},
];

/** Fetch  */
export async function getServerSideProps() {
	const [regions, page] = await Promise.all([
		getOfficesByRegions(),
		getGlobalPresencePage(),
	]);

	return {
		props: { regions: regions.data.regions.nodes },
	};
}

/** Contact Page */
export default function ContactPage({ regions }) {
	const [data, setData] = useState();

	useEffect(() => {
		const regionsArr = regions?.map((item) => {
			let obj = {};
			obj.title = item?.name;
			console.log("asd", item?.countries);
			if (item?.countries?.nodes?.length > 0) {
				obj.children = (
					<div className={`${styles.CountryWrapper}`}>
						<div className={`${styles.CountryBox}`}>
							{item?.countries?.nodes?.map((item2, ind2) => {
								return item2?.countries?.offices?.offices?.nodes?.map((item3, ind3) => {
									return (
										<div className={`${styles.CountryItem}`} key={item2?.title}>
											<img
												src={hoverBg.src}
												className={`${styles.hoverBg} width_100 b_r_10`}
												alt="img"
											/>
											<div className={`${styles.countryImg}`}>
												<img
													src={item3?.offices?.thumbnail?.node?.sourceUrl}
													className="width_100 b_r_10"
													alt="img"
												/>
											</div>
											<div className="f_j a_center pt_10">
												<h5 className="text_reg font_primary f_w_m color_secondary ">
													{item2?.title}
												</h5>
												<Button color="secondary" variant="underline" size="xs">
													View Map
												</Button>
											</div>
											<p className={`${styles.address} d_f color_dark_gray text_xs pt_10`}>
												<img src={location.src} className="" alt="img" />
												<span>{item3?.offices?.contact?.address}</span>
											</p>
											<a
												href={`tel:${item3?.offices?.contact?.tel}`}
												className={`${styles.address} d_f color_dark_gray text_xs pt_10`}
											>
												<img src={call_icon.src} className="" alt="img" />
												<span>{item3?.offices?.contact?.tel}</span>
											</a>
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
		setData({ regionsArr });
	}, []);

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
						bannerTitle="Lorem ipsum dolor sit amet consectetur"
						bannerDescription="Lorem ipsum dolor sit amet consectetur. Elit massa a ut malesuada. Tincidunt pellentesque euismod morbi elit in tempor in. Ut elit in diam ut a mattis."
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
									src="https://go.auroraer.com/l/885013/2025-01-30/p1g4m"
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
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
