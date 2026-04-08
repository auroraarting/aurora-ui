"use client";
// MODULES //
import { useEffect, useState } from "react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //
import parse from "html-react-parser";

// UTILS //
import EqualHeight from "@/utils/EqualHeight";
import { slugify } from "@/utils";

// STYLES //
import styles from "@/styles/sections/events/Sponsors.module.scss";

// IMAGES //
import national_grid from "@/../public/img/events/national_grid.png";
import popup_close from "/public/img/icons/popup_close.svg";
import hoverEffect from "/public/img/events/hoverEffect.png";

// DATA //

/** Sponsors Section */
export default function Sponsors({ data, sectionName }) {
	const [selectedSponsorCat, setSelectedSponsorCat] = useState(null);
	const [selectedSponsor, setSelectedSponsor] = useState(null);

	/** handleClosePopup Function */
	const handleClosePopup = () => {
		setSelectedSponsor(null);
	};

	let dataToUse = data?.events?.sponsors2?.sectionTitle
		? data?.events?.sponsors2
		: data?.events?.sponsors;

	useEffect(() => {
		// EqualHeight("SponsorsItem");
		const SponsorsFlex = document.querySelector(".SponsorsFlex");
		const SponsorsItemTitle = document.querySelectorAll(".SponsorsItemTitle");
		[...SponsorsItemTitle]?.map((item) => {
			item.style.height = `${SponsorsFlex.getBoundingClientRect().height}px`;
		});
	}, []);

	const selected =
		dataToUse?.sponsors[selectedSponsorCat]?.list[selectedSponsor];

	if (dataToUse?.sponsors?.length === 0 || !dataToUse?.sponsors?.length) {
		return <></>;
	}

	return (
		<section
			id={dataToUse?.sectionTitle ? slugify(dataToUse?.sectionTitle) : "sponsors"}
			data-name={dataToUse?.sectionTitle ? dataToUse?.sectionTitle : "Sponsors"}
			// id="partners"
			// data-name="Partners"
			className={`${styles.Sponsors} pb_60`}
		>
			<h2 className={`${styles.sponsorsTitle} text_lg color_secondary`}>
				{dataToUse?.sectionTitle || "Sponsors"}
			</h2>
			{dataToUse?.sponsors?.map((item, ind) => {
				return (
					<div className={`${styles.SponsorsFlexWrap} d_f`} key={item?.title}>
						<div className={`${styles.SponsorsItemTitle} SponsorsItem`}>
							<h4 className="text_reg color_dark_gray f_w_b">{item?.title}</h4>
						</div>
						<div className={`${styles.SponsorsFlex} d_f SponsorsItem`}>
							{item?.gallery?.nodes?.map((item2) => {
								return (
									<div className={`${styles.SponsorsItem}`} key={item2?.mediaItemUrl}>
										<img src={item2?.mediaItemUrl} alt="Sponsors Logos" />
									</div>
								);
							})}
							{item?.list?.map((item2, ind2) => {
								return (
									<div className={`${styles.SponsorsItem}`} key={item2?.mediaItemUrl}>
										<a
											onClick={() => {
												setSelectedSponsorCat(ind);
												setSelectedSponsor(ind2);
											}}
											target="_blank"
											rel="noopener noreferrer"
										>
											<img src={item2?.logo?.node?.mediaItemUrl} alt="Sponsors Logos" />
										</a>
									</div>
								);
							})}
						</div>
					</div>
				);
			})}

			{selectedSponsor !== null && (
				<div className={styles.popup}>
					<div className={`${styles.Overlay}`} onClick={handleClosePopup}></div>
					<div
						className={`${styles.popup_content} popup_content`}
						onClick={(e) => e.stopPropagation()}
					>
						<button className={styles.close_btn} onClick={handleClosePopup}>
							<img src={popup_close.src} alt="" />
						</button>
						<div>
							<div className={`${styles.item}`}>
								<div className={`${styles.PopupItem}`}>
									<div className={`${styles.BoxFlex} f_w`}>
										<div className={styles.Imgthumbnail}>
											<img src={selected?.logo?.node?.mediaItemUrl} className="b_r_20" />

											<a href={selected?.url} target="_blank" rel="noopener noreferrer">
												<Button
													color="primary"
													variant="filled"
													shape="rounded"
													mode="dark"
												>
													Visit Website
												</Button>
											</a>
										</div>
										<div className={`${styles.Details}`}>
											{/* <div className={`${styles.boxName}`}>
												<h5
													className={`${styles.Name} text_reg f_w_m color_white font_secondary`}
												>
													{selected?.name}
												</h5>
											</div> */}
											<div className={`${styles.Desc} text_xs color_silver_gray`}>
												{parse(selected?.description || "")}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</section>
	);
}
