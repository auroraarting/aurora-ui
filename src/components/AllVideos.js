"use client";
// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgVideo from "lightgallery/plugins/video";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-video.css";

// UTILS //

// STYLES //
import styles from "@/styles/components/AllVideos.module.scss";

// IMAGES //
import video_img from "@/../public/img/careers/early_careers/video_img.jpg";
import video_play from "@/../public/img/icons/video_play.svg";
import ContentFromCms from "./ContentFromCms";

// DATA //

/** CareerSeries Section */
export default function AllVideos({
	title,
	desc,
	redirectLink,
	videoLink,
	videoThumbnail,
	iframe,
	sectionName = "Latest Videos",
	id = "Auroras-career-series",
}) {
	if (!title) return <></>;
	return (
		<section
			className={`${styles.CareerSeries} CareerSeries`}
			id={id}
			data-name={sectionName}
		>
			<div className="container">
				<div className={`${styles.card} f_r_aj_between`}>
					<div className={`${styles.content}`}>
						<h4
							className={`${styles.categoryTxt} text_xs color_medium_gray text_uppercase pb_40`}
						>
							{sectionName}
						</h4>

						<h2 className="text_xl font_primary color_white pb_20">{title}</h2>
						<p className="text_reg color_dark_gray pb_40">{desc}</p>
						<a
							href={redirectLink}
							target="_blank"
							rel="noreferrer"
							className={`${styles.bookBtnOne} bookBtnOne`}
						>
							<Button color="secondary" variant="underline" mode="dark" size="xs">
								Watch All Videos
							</Button>
						</a>
					</div>
					<div className={`${styles.imageWrapper}`}>
						{!iframe && (
							<div style={{ pointerEvents: videoLink ? "all" : "none" }}>
								<LightGallery
									speed={500}
									plugins={[lgThumbnail, lgZoom, lgVideo]}
									mobileSettings={{ closable: true }}
								>
									<a href={videoLink} data-src={videoLink}>
										<img
											src={videoThumbnail}
											className={`${styles.videoThumbnail} img b_r_20`}
											alt="video thumbnail"
										/>
										{videoLink && (
											<img
												src={video_play.src}
												className={`${styles.playIcon} `}
												alt="play"
											/>
										)}
									</a>
								</LightGallery>
							</div>
						)}
						{iframe && <ContentFromCms>{iframe}</ContentFromCms>}
					</div>
				</div>
			</div>
		</section>
	);
}
