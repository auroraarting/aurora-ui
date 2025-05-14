"use client";
// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/events/DownloadList.module.scss";

// IMAGES //
import text_copy_icon from "@/../public/img/events/text_copy_icon.png";
import download from "@/../public/img/resources/aurora_insights/download.svg";

// DATA //

/** DownloadList Section */
export default function DownloadList({ data }) {
	return (
		<section
			className="container"
			id="download-materials"
			data-name="Download Materials"
		>
			<div className={`${styles.DownloadWrapper} f_r_a_center`}>
				{data?.events?.downloads?.map((item, ind) => {
					return (
						<div className={`${styles.teamItem}`} key={(item?.text || "") + ind}>
							<div className={`${styles.teamFlex} f_r_a_center`}>
								<div className={`${styles.teamLogo}`}>
									<img
										src={item?.type?.nodes?.[0]?.eventDownloads?.icon?.node?.mediaItemUrl}
										alt="logo"
									/>
								</div>
								<div className={`${styles.teamDescription}`}>
									<a
										target="_blank"
										rel="noreferrer"
										href={item?.link || item?.file?.node?.mediaItemUrl}
										className="text_reg f_w_m font_primary f_r_a_center"
									>
										<span>{item?.type?.nodes?.[0]?.name}</span>
										<img src={download.src} alt="download" />
									</a>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
}
