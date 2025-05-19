"use client";
// MODULES //
import { useEffect, useState } from "react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";
import CustomSelect from "@/components/CustomSelect";
import Map from "@/components/MapContainer";
import AccordianCommon from "@/components/AccordianCommon";

// SECTIONS //

// PLUGINS //

// UTILS //
import {
	dynamicInsightsBtnProps,
	filterMarkersBySlug,
	getMapJsonForProducts,
} from "@/utils";

// STYLES //
import styles from "@/styles/sections/softwares/SoftwareMarket.module.scss";

// IMAGES //
import AuthorPic from "/public/img/softwares/authorPic.svg";
import DrownDownArrow from "/public/img/softwares/arrow.svg";
import transaction from "/public/img/softwares/transaction.svg";
import portfolio from "/public/img/softwares/portfolio.svg";
import asset from "/public/img/softwares/asset.svg";
import strategy from "/public/img/softwares/strategy.svg";

// import Map from "/public/img/softwares/map.png";

// DATA //
import locationJson from "@/data/locations.json";

/** SoftwareBanner Section */
export default function SoftwareMarket({
	sectionTitle = "From your market to the world",
	mapJson,
	customHtml,
	data,
}) {
	console.log(data, "dataat");
	/** centerOfCountry  */
	let centerOfCountry = () => {
		if (mapJson) {
			return {
				lat: parseFloat(mapJson.countryPin.lat),
				lng: parseFloat(mapJson.countryPin.lng),
			};
		}
	};

	let customMapJson = {
		...mapJson,
		centerOfCountry: centerOfCountry(),
	};

	// console.log(customMapJson, "customMapJson");

	const [mapCenter, setMapCenter] = useState(centerOfCountry());
	const [map, setMap] = useState(null);
	const [valueOfSelect, setValueOfSelect] = useState(0);

	if (!mapJson) return <></>;

	return (
		<section
			className={`${styles.SoftwareMarket} `}
			id="availableregions"
			data-name="Available Regions"
		>
			<div className="container">
				<div className={`${styles.inner}`}>
					<div className={`${styles.left}`}>
						<p className={`${styles.title} text_xl text_600`}>{sectionTitle}</p>

						{data?.team?.nodes?.length > 0 && (
							<>
								<div className={`${styles.meetTitle} text_reg f_w_m`}>
									Meet the Team
								</div>
								<div className={`${styles.dropdownWrap}`}>
									{data?.team?.nodes?.map((item, ind) => {
										return (
											<div className={`${styles.author}`} key={item?.id}>
												<div className={`${styles.authorInner}`}>
													<div className={`${styles.pic}`}>
														<img
															src={item?.teams?.thumbnail?.image?.node?.mediaItemUrl}
															alt="AuthorPic"
														/>
													</div>
													<div className={`${styles.detail}`}>
														<p className={`${styles.name} text_500`}>{item?.title}</p>
														<p className={`${styles.position} text_xs text_300`}>
															{item?.teams?.thumbnail?.designation}
														</p>
													</div>
												</div>
											</div>
										);
									})}
								</div>
							</>
						)}
						<div className="m_t_30">{customHtml}</div>
					</div>
					<div className={`${styles.right}`}>
						{/* <img className={`${styles.map}`} src={Map.src} alt="Map" /> */}
						<Map
							mapCenter={mapCenter}
							setValueOfSelect={setValueOfSelect}
							valueOfSelect={valueOfSelect}
							map={map}
							setMap={setMap}
							defaultZoom={mapJson?.zoom || 4}
							locationJson={[customMapJson]}
						/>

						{/* <div className={`${styles.markerDetail}`}>
							<div className={`${styles.detailText} text_xs`}>Upcoming</div>
							<div className={`${styles.detailText} text_xs`}>Available Locations</div>
						</div> */}
					</div>
				</div>
			</div>
		</section>
	);
}
