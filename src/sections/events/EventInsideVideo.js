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
import styles from "@/styles/sections/events/EventInsideVideo.module.scss";

// IMAGES //
import video_thumb from "@/../public/img/events/video_thumb.jpg";
import video_play from "@/../public/img/icons/video_play.svg";
import ContentFromCms from "@/components/ContentFromCms";

// DATA //

/** EventInsideVideo Section */
export default function EventInsideVideo({ data }) {
	return (
		<div className={`${styles.EventInsideVideo} `}>
			<h2 className="text_lg color_secondary pb_10">
				{data?.events?.glimps?.sectionTitle}
			</h2>
			<div className={`${styles.videoThumb}`}>
				<ContentFromCms>{data?.events?.glimps?.video}</ContentFromCms>
				{/* <LightGallery
					speed={500}
					plugins={[lgThumbnail, lgZoom, lgVideo]}
					mobileSettings={{ closable: true }}
				>
					<div data-src={data?.events?.glimps?.video}>
						<img
							src={data?.events?.glimps?.videoThumbnail?.node?.sourceUrl}
							className={`${styles.video_thumb} width_100 b_r_10`}
							alt="img"
						/>
						<img src={video_play.src} className={`${styles.videoPlay}`} alt="play" />
					</div>
				</LightGallery> */}
			</div>
		</div>
	);
}
