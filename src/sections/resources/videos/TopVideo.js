"use client";
// MODULES //

// COMPONENTS //
import ContentFromCms from "@/components/ContentFromCms";

// SECTIONS //

// PLUGINS //
import LightGallery from "lightgallery/react";
import lgVideo from "lightgallery/plugins/video";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-video.css";

// UTILS //
import formatDate, { formatTitleForEpisode } from "@/utils";

// STYLES //
import styles from "@/styles/sections/resources/videos/TopVideo.module.scss";

// IMAGES //
import location from "/public/img/icons/location.svg";
import calender from "/public/img/icons/calender.svg";

// DATA //

/** TopVideo Section */
export default function TopVideo({ data }) {
	if (!data) {
		return <></>;
	}
	const videoUrl = data?.videoFields?.videoLink;
	return (
		<section className={`${styles.TopVideo}`}>
			<div className="container">
				<LightGallery
					speed={500}
					plugins={[lgVideo]}
					mobileSettings={{ closable: true }}
				>
					<a
						href={videoUrl || "#"}
						data-src={videoUrl || ""}
						className={`${styles.card} f_w_j`}
					>
						<div className={`${styles.content}`}>
							<div
								className={`${styles.tag} text_xxs font_primary text_uppercase color_white`}
							>
								Latest Video
							</div>
							<h2 className="text_lg color_white text_uppercase f_w_m pt_40">
								<ContentFromCms>
									{formatTitleForEpisode(data?.title || "")}
								</ContentFromCms>
							</h2>
							<div className={`${styles.dateFlex} f_r_a_center pt_30`}>
								<p className="text_xs f_w_m color_medium_gray text_uppercase f_r_a_center">
									<img
										src={calender.src}
										className={`${styles.calender}`}
										alt="calender"
									/>
									<span>{formatDate(data?.videoFields?.date)}</span>
								</p>
								{data?.videoFields?.country?.nodes.length > 0 && (
									<p className="text_xs f_w_m color_medium_gray text_uppercase f_r_a_center">
										<img
											src={location.src}
											className={`${styles.calender}`}
											alt="calender"
										/>
										<span>
											{data?.videoFields?.country?.nodes?.map(
												(item) => item?.title,
											)}
										</span>
									</p>
								)}
							</div>
						</div>
						{data?.videoFields?.thumbnail?.node?.mediaItemUrl && (
							<div className={`${styles.imageWrapper}`}>
								<img
									src={data?.videoFields?.thumbnail?.node?.mediaItemUrl}
									className="width_100 b_r_20"
									alt="Latest Video"
								/>
							</div>
						)}
					</a>
				</LightGallery>
			</div>
		</section>
	);
}
