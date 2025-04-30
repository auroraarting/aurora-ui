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
		<div className="container">
			<div className={`${styles.DownloadWrapper} f_r_a_center`}>
				{data?.events?.downloads?.map((item) => {
					return (
						<div className={`${styles.teamItem}`} key={item?.text}>
							<div className={`${styles.teamFlex} f_r_a_center`}>
								<div className={`${styles.teamLogo}`}>
									<img src={item?.icon?.node?.sourceUrls} alt="logo" />
								</div>
								<div className={`${styles.teamDescription}`}>
									<a
										target="_blank"
										rel="noreferrer"
										href={item?.link || item?.file?.node?.sourceUrl}
										className="text_reg f_w_m font_primary f_r_a_center"
									>
										<span>{item?.text}</span>
										<img src={download.src} alt="download" />
									</a>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
