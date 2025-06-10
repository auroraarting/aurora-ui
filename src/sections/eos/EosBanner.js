"use client";

// MODULES //
import { useEffect, useState, useRef } from "react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";
import ContentFromCms from "@/components/ContentFromCms";

// SECTIONS //

// PLUGINS //
import Vimeo from "@u-wave/react-vimeo";

// UTILS //

// STYLES //
import styles from "@/styles/sections/eos/EosBanner.module.scss";

// IMAGES //
import flexible_energy from "../../../public/img/products/flexible_energy.png";
import mac_img from "../../../public/img/softwares/mac_img.png";
import frame_video from "../../../public/img/softwares/frame_video.png";
import pause_button from "../../../public/img/icons/pause_button.svg";
import play_button from "../../../public/img/icons/video_play.svg";
import DefaultBanner from "/public/img/banner/defaultDesktopBanner.jpg";
import DefaultBannerMob from "/public/img/banner/defaultMobileBanner.jpg";
import { dynamicInsightsBtnProps } from "@/utils";

// DATA //

/** EosBanner Section */
export default function EosBanner({
	desktopImage,
	bannerTitle,
	bannerDescription,
	mobileImage,
	btnTxt,
	btnLink,
	showContentOnly = false, // New prop to toggle visibility
	vimeoid,
	logo,
	dataForBtn,
}) {
	const defaultVimeoObj = {
		video: vimeoid,
		controls: false,
		paused: false,
		autoplay: false,
		loop: true,
		responsive: true,
		muted: true,
	};
	const [isPlaying, setIsPlaying] = useState(false);
	const vimeoRef = useRef(null);

	/** togglePlayPause */
	const togglePlayPause = () => {
		vimeoRef.current.player.setVolume(1);
		if (isPlaying) {
			vimeoRef.current.player.pause();
		} else {
			vimeoRef.current.player.play();
		}
		setIsPlaying(!isPlaying);
	};

	return (
		<section className={`${styles.EosBanner} ptb_100`}>
			<div className="container">
				<div className={`${styles.flexBox} f_j`}>
					<div className={`${styles.flexItemOne}`}>
						<h1 className="text_xl font_primary f_w_m color_white text_uppercase">
							<ContentFromCms>{bannerTitle}</ContentFromCms>
						</h1>
					</div>
					<div className={`${styles.flexItemTwo}`}>
						<div className={`${styles.label} text_reg color_silver_gray`}>
							<ContentFromCms>{bannerDescription}</ContentFromCms>
						</div>
						<div className={`${styles.bookBtn} pt_30`}>
							{/* <a {...dataForBtn}>
								<Button color="primary" variant="filled" shape="rounded" mode="dark">
									{dataForBtn?.btntext}
								</Button>
							</a> */}
							{btnTxt && (
								<a href={btnLink} target="_blank" rel="noreferrer">
									<Button color="primary" variant="filled" shape="rounded" mode="dark">
										{btnTxt}
									</Button>
								</a>
							)}
						</div>
					</div>
				</div>
				{vimeoid ? (
					<div className={`${styles.macFrameBox} f_r_aj_center`}>
						<img src={mac_img.src} alt="mac img" className={`${styles.mac_img}`} />
						{/* <img
						src={frame_video.src}
						alt="mac img"
						className={`${styles.frame_video}`}
					/> */}
						<div className={`${styles.frame_video}`}>
							<Vimeo
								className={`${styles.vimeoPlayer}`}
								ref={vimeoRef}
								{...defaultVimeoObj}
							/>
							{/* <video ref={videoRef} playsInline autoPlay muted loop>
							<source src="../../../img/softwares/frame_video.mp4" type="video/mp4" />
						</video> */}
							{/* Play/Pause Button */}
							<div className={`${styles.playPauseBtn}`} onClick={togglePlayPause}>
								{isPlaying ? (
									<img
										src={pause_button.src}
										className={`${styles.pause_button}`}
										alt="Pause"
									/>
								) : (
									<img
										src={play_button.src}
										className={`${styles.play_button}`}
										alt="Play"
									/>
								)}
							</div>
						</div>
					</div>
				) : (
					<div className={`${styles.banner_image}`}>
						<picture>
							<source
								srcSet={desktopImage ? desktopImage : DefaultBanner.src}
								media="(min-width:767px)"
							/>
							<img
								src={mobileImage ? mobileImage : DefaultBannerMob.src}
								alt="Banner Image"
							/>
						</picture>
					</div>
				)}
			</div>
		</section>
	);
}
