"use client";
// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/events/Sponsors.module.scss";

// IMAGES //
import national_grid from "@/../public/img/events/national_grid.png";

// DATA //

/** Sponsors Section */
export default function Sponsors({ data }) {
	console.log(data?.events?.sponsors?.sponsors?.length);
	if (
		data?.events?.sponsors?.sponsors?.length === 0 ||
		!data?.events?.sponsors?.sponsors?.length
	)
		return <></>;
	return (
		<section
			id="sponsors"
			data-name="Sponsors"
			className={`${styles.Sponsors} pb_50`}
		>
			<h2 className="text_lg color_secondary pb_10">
				{data?.events?.sponsors?.sectionTitle || "Sponsors"}
			</h2>
			{data?.events?.sponsors?.sponsors?.map((item) => {
				return (
					<div className={`${styles.SponsorsFlex} d_f`} key={item?.title}>
						<div className={`${styles.SponsorsItem}`}>
							<h4 className="text_reg color_dark_gray f_w_b">{item?.title}</h4>
						</div>
						{item?.gallery?.nodes?.map((item2) => {
							return (
								<div className={`${styles.SponsorsItem}`} key={item2?.mediaItemUrl}>
									<img src={item2?.mediaItemUrl} alt="Sponsors Logos" />
								</div>
							);
						})}
					</div>
				);
			})}
			{/* <div className={`${styles.SponsorsFlex} d_f`}>
				<div className={`${styles.SponsorsItem}`}>
					<h4 className="text_reg color_dark_gray f_w_b">Partner</h4>
				</div>
				<div className={`${styles.SponsorsItem}`}>
					<img src={national_grid.src} alt="map" />
				</div>
				<div className={`${styles.SponsorsItem}`}>
					<img src={national_grid.src} alt="map" />
				</div>
			</div>
			<div className={`${styles.SponsorsFlex} d_f`}>
				<div className={`${styles.SponsorsItem}`}>
					<h4 className="text_reg color_dark_gray f_w_b">Media Partner</h4>
				</div>
				<div className={`${styles.SponsorsItem}`}>
					<img src={national_grid.src} alt="map" />
				</div>
				<div className={`${styles.SponsorsItem}`}>
					<img src={national_grid.src} alt="map" />
				</div>
				<div className={`${styles.SponsorsItem}`}>
					<img src={national_grid.src} alt="map" />
				</div>
			</div> */}
		</section>
	);
}
