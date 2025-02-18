// MODULES //
import { useEffect, useState } from "react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";
import CustomSelect from "@/components/CustomSelect";
import Map from "@/components/Map";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/softwares/SoftwareMarket.module.scss";

// IMAGES //
import AuthorPic from "/public/img/softwares/authorPic.svg";
import DrownDownArrow from "/public/img/softwares/arrow.svg";
// import Map from "/public/img/softwares/map.png";

// DATA //
import locationJson from "@/data/locations.json";

/** SoftwareBanner Section */
export default function SoftwareMarket() {
	const [visibleLocations, setVisibleLocations] = useState([]);
	const [visibleCountry, setVisibleCountry] = useState(""); // Stores the currently visible country
	const [mapCenter, setMapCenter] = useState(locationJson[0]?.centerOfCountry);
	const [valueOfSelect, setValueOfSelect] = useState(0);
	const [map, setMap] = useState(null);

	/** changeMapCenter */
	const changeMapCenter = (country) => {
		console.log(country, "country");
		setMapCenter(locationJson[country.index]?.centerOfCountry);
		console.log(map, "zxczxc");
		map.setZoom(locationJson[country.index]?.zoom || 4);
	};

	useEffect(() => {
		if (visibleCountry === "") {
			return;
		}
		const index = locationJson.findIndex((item) => item.name === visibleCountry);
		setValueOfSelect(index);
	}, [visibleCountry]);

	return (
		<section className={`${styles.SoftwareMarket} ptb_100`} id="availableregions">
			<div className="container">
				<div className={`${styles.inner}`}>
					<div className={`${styles.left}`}>
						<p className={`${styles.title} text_xl text_600`}>
							From your market to the world
						</p>

						<div className={`${styles.dropdownWrap}`}>
							<p className={`${styles.label} text_reg text_500`}>
								Explore All Locations
							</p>

							<CustomSelect
								defaultId={0}
								list={locationJson.map((item) => item.name)}
								afterSelect={changeMapCenter}
								value={valueOfSelect}
							/>

							<div className={`${styles.bookBtn}`}>
								<Button color="primary" variant="filled" shape="rounded">
									Book a Demo
								</Button>
							</div>

							<div className={`${styles.author}`}>
								<div className={`${styles.authorInner}`}>
									<div className={`${styles.pic}`}>
										<img src={AuthorPic.src} alt="AuthorPic" />
									</div>
									<div className={`${styles.detail}`}>
										<p className={`${styles.name} text_500`}>Hugo Batten</p>
										<p className={`${styles.position} text_xs text_300`}>
											Head of Australia
										</p>
									</div>
								</div>
							</div>

							<div className={`${styles.upcoming}`}>
								<p className={`${styles.text} text_500`}>Upcoming Locations</p>
								<img src={DrownDownArrow.src} alt="DrownDownArrow" />
							</div>
						</div>
					</div>
					<div className={`${styles.right}`}>
						{/* <img className={`${styles.map}`} src={Map.src} alt="Map" /> */}
						<Map
							mapCenter={mapCenter}
							setVisibleLocations={setVisibleLocations}
							setVisibleCountry={setVisibleCountry}
							setValueOfSelect={setValueOfSelect}
							valueOfSelect={valueOfSelect}
							map={map}
							setMap={setMap}
						/>
						<div className={`${styles.markerDetail}`}>
							<div className={`${styles.detailText} text_xs`}>Upcoming</div>
							<div className={`${styles.detailText} text_xs`}>Available Locations</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
