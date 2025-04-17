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
import styles from "@/styles/sections/softwares/SoftwareBanner.module.scss";

// IMAGES //
import SoftwareLogo from "../../../public/img/softwares/chronos-logo.png";
import mac_img from "../../../public/img/softwares/mac_img.png";
import frame_video from "../../../public/img/softwares/frame_video.png";
import pause_button from "../../../public/img/icons/pause_button.svg";
import play_button from "../../../public/img/icons/video_play.svg";
import DefaultBanner from "/public/img/banner/defaultDesktopBanner.jpg";
import DefaultBannerMob from "/public/img/banner/defaultMobileBanner.jpg";

// DATA //

/** SoftwareBanner Section */
export default function SoftwareBanner({
	bannerTitle = "Battery valuations, Perfected.",
	bannerDescription = "Harness innovative tools to simplify complexity, optimise decisions, and drive impactful energy solutions with confidence and precision.",
	desktopImage,
	mobileImage,
	vimeoid,
	btnText,
	btnLink,
	logo,
}) {
	const defaultVimeoObj = {
		video: vimeoid,
		controls: false,
		paused: false,
		autoplay: true,
		loop: true,
		responsive: true,
	};

	const [isPlaying, setIsPlaying] = useState(true);
	const videoRef = useRef(null);

	/** togglePlayPause */
	const togglePlayPause = () => {
		if (isPlaying) {
			if (videoRef.current.player) {
				videoRef.current.player.pause();
			} else {
				videoRef.current.pause();
			}
		} else {
			if (videoRef.current.player) {
				videoRef.current.player.play();
			} else {
				videoRef.current.play();
			}
		}
		setIsPlaying(!isPlaying);
	};

	return (
		<section className={`${styles.SoftwareBanner} ptb_100`}>
			<div className="container">
				{logo && (
					<div className={`${styles.SoftwareLogo} pb_20`}>
						<img
							src={logo}
							alt="Software Logo"
							className={`${styles.SoftwareLogo}`}
						/>
					</div>
				)}
				<div className={`${styles.flexBox} f_j`}>
					<div className={`${styles.flexItemOne}`}>
						<h1 className="text_xl font_primary f_w_m color_secondary text_uppercase">
							{bannerTitle}
						</h1>
					</div>
					<div className={`${styles.flexItemTwo}`}>
						<div className={`${styles.label} text_reg color_dark_gray`}>
							<ContentFromCms>{bannerDescription}</ContentFromCms>
						</div>
						<a href={btnLink} className={`${styles.bookBtn} pt_30`}>
							<Button color="primary" variant="filled" shape="rounded">
								{btnText}
							</Button>
						</a>
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
							{/* {vimeoid ? (
							<Vimeo
								className={`${styles.vimeoPlayer}`}
								ref={videoRef}
								{...defaultVimeoObj}
							/>
						) : (
							<video ref={videoRef} playsInline autoPlay muted loop>
								<source src="../../../img/softwares/frame_video.mp4" type="video/mp4" />
							</video>
						)} */}
							{vimeoid && (
								<Vimeo
									className={`${styles.vimeoPlayer}`}
									ref={videoRef}
									{...defaultVimeoObj}
								/>
							)}
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
					<div className={`${styles.banner_image} next_image`}>
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
