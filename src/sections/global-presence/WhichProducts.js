"use client";
// MODULES //
import { useEffect, useState } from "react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";
import AccordianCommon from "@/components/AccordianCommon";
import ContentFromCms from "@/components/ContentFromCms";

// SECTIONS //

// PLUGINS //

// UTILS //
import { slugify } from "@/utils";

// STYLES //
import styles from "@/styles/sections/global-presence/WhichProducts.module.scss";

// IMAGES //
import power from "../../../public/img/global-presence/power.svg";
import energy from "../../../public/img/global-presence/energy.svg";
import hydrogen from "../../../public/img/global-presence/hydrogen.svg";
import valuation from "../../../public/img/global-presence/valuation.svg";

// DATA //

/** WhichProducts Section */
export default function WhichProducts({ data, section }) {
	const [accordianArr, setAccordianArr] = useState();

	/** getAllData  */
	const getAllData = () => {
		const markers = data?.markers;

		// Create a map to group by slug
		const groupedBySlug = {};

		markers?.map((marker) => {
			marker?.category?.nodes?.map((node, ind) => {
				const slug = node?.slug;

				if (!groupedBySlug[slug]) {
					/** keyModule  */
					const keyModule = () => {
						if (
							marker?.category?.nodes?.[0]?.contentType?.node?.name === "softwares"
						) {
							return "software";
						}
						if (
							marker?.category?.nodes?.[0]?.contentType?.node?.name === "services"
						) {
							return "service";
						}
						return marker?.category?.nodes?.[0]?.contentType?.node?.name;
					};

					groupedBySlug[slug] = {
						...node,
						locationData: marker.locationtitle,
						bottomTextData: marker.bottomText,
						imgIcons:
							marker?.category?.nodes?.[0]?.[
								marker?.category?.nodes?.[0]?.contentType?.node?.name
							]?.map?.headerLogo?.node?.mediaItemUrl,
						children: (
							<div className={`${styles.content_wrap}`}>
								<div className="text_reg color_dark_gray">
									<ContentFromCms>
										{marker?.customDesc || marker?.category?.nodes?.[0]?.content}
									</ContentFromCms>
								</div>
								<a
									href={`/${keyModule()}/${marker?.category?.nodes?.[0]?.slug}`}
									className={`${styles.bookBtn} pt_20`}
								>
									<Button color="secondary" variant="underline">
										{section?.buttonText || "Know more"}
									</Button>
								</a>
							</div>
						),
					};
				}

				// groupedBySlug[slug].locationData.push({
				// 	coordinates: marker.coordinates,
				// 	locationTitle: marker.locationtitle,
				// });

				// if (
				// 	marker.bottomText &&
				// 	!groupedBySlug[slug]?.locationData?.includes(marker?.bottomText)
				// ) {
				// 	groupedBySlug[slug].locationData =
				// 		groupedBySlug[slug].locationData + " |  " + marker.bottomText;
				// }
				if (
					marker.locationtitle &&
					!groupedBySlug[slug]?.locationData?.includes(marker?.locationtitle)
				) {
					groupedBySlug[slug].locationData =
						groupedBySlug[slug].locationData + " |  " + marker.locationtitle;
				}
			});
		});

		// Convert to array
		const result = Object.values(groupedBySlug);

		return result;
	};

	useEffect(() => {
		data && setAccordianArr(getAllData());
	}, []);

	if (!data) {
		return <></>;
	}

	return (
		<section
			className={`${styles.WhichProducts}`}
			id={"products-services"}
			data-name={section?.tabTitle || "Products & Services"}
		>
			<div className="container">
				<div className={`${styles.titleTxt} pb_20`}>
					<h2 className="text_xl font_primary color_secondary">
						{section?.sectionTitle || "Our fleet of products"}
					</h2>
				</div>
				<div className={`${styles.common_queries_faq}`}>
					<div className={`${styles.accordian_main}`}>
						{accordianArr && (
							<AccordianCommon
								fontStyle={"text_md"}
								fontWeight={"f_w_m"}
								fontFamily={"font_primary"}
								fontColor={"color_secondary"}
								// items={[
								// 	{
								// 		title: "Power & Renewables Service",
								// 		locationData: "AIES  |  WECC  |  MISO  |  SPP  |  PJM  | ISO-NE ",
								// 		imgIcons: power.src,
								// 		children: (
								// 			<div className={`${styles.content_wrap}`}>
								// 				<p className="text_reg color_dark_gray">
								// 					Robust, transparent analysis, widely used and trusted amongst major
								// 					market participants and bankable forecasts.
								// 				</p>
								// 				<div className={`${styles.bookBtn} pt_20`}>
								// 					<Button color="secondary" variant="underline">
								// 						Know more
								// 					</Button>
								// 				</div>
								// 			</div>
								// 		),
								// 	},
								// 	{
								// 		title: "Flexible Energy Service",
								// 		locationData: "MISO  |  NYISO  |  CAISO  |  ERCOT  |  PJM",
								// 		imgIcons: energy.src,
								// 		children: (
								// 			<div className={`${styles.content_wrap}`}>
								// 				<p className="text_reg color_dark_gray">
								// 					Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam.
								// 				</p>
								// 				<div className={`${styles.bookBtn} pt_20`}>
								// 					<Button color="secondary" variant="underline">
								// 						Know more
								// 					</Button>
								// 				</div>
								// 			</div>
								// 		),
								// 	},
								// 	{
								// 		title: "Hydrogen Service",
								// 		locationData: "MISO  |  NYISO  |  CAISO  |  ERCOT  |  PJM",
								// 		imgIcons: hydrogen.src,
								// 		children: (
								// 			<div className={`${styles.content_wrap}`}>
								// 				<p className="text_reg color_dark_gray">
								// 					Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam.
								// 				</p>
								// 				<div className={`${styles.bookBtn} pt_20`}>
								// 					<Button color="secondary" variant="underline">
								// 						Know more
								// 					</Button>
								// 				</div>
								// 			</div>
								// 		),
								// 	},
								// 	{
								// 		title: "Amun - Wind Valuation Software",
								// 		locationData: "MISO  |  NYISO  |  CAISO  |  ERCOT  |  PJM",
								// 		imgIcons: valuation.src,
								// 		children: (
								// 			<div className={`${styles.content_wrap}`}>
								// 				<p className="text_reg color_dark_gray">
								// 					Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam.
								// 				</p>
								// 				<div className={`${styles.bookBtn} pt_20`}>
								// 					<Button color="secondary" variant="underline">
								// 						Know more
								// 					</Button>
								// 				</div>
								// 			</div>
								// 		),
								// 	},
								// ]}
								items={accordianArr}
							/>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
