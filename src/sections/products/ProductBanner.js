"use client";
// MODULES //
import { useEffect, useState, useRef } from "react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //
import Vimeo from "@u-wave/react-vimeo";

// UTILS //

// STYLES //
import styles from "@/styles/sections/products/ProductBanner.module.scss";

// IMAGES //
import flexible_energy from "../../../public/img/products/flexible_energy.png";
import mac_img from "../../../public/img/softwares/mac_img.png";
import frame_video from "../../../public/img/softwares/frame_video.png";
import pause_button from "../../../public/img/icons/pause_button.svg";
import play_button from "../../../public/img/icons/video_play.svg";
import ContentFromCms from "@/components/ContentFromCms";
import { dynamicInsightsBtnProps } from "@/utils";

// DATA //

/** ProductBanner Section */
export default function ProductBanner({
	data,
	desktopImage,
	bannerTitle,
	bannerDescription,
	mobileImage,
	btnTxt,
	btnLink,
	showContentOnly = false, // New prop to toggle visibility
	vimeoid,
	logo,
	dynamicBtn,
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
		<section className={`${styles.ProductBanner} pt_60`}>
			<div className="container">
				{logo && (
					<div className={`${styles.SoftwareLogo} pb_20`}>
						<img src={logo} alt="Software Logo" />
					</div>
				)}
				<div className={`${styles.flexBox} f_j`}>
					<div className={`${styles.flexItemOne}`}>
						<h1 className="text_xl font_primary f_w_m color_secondary text_uppercase">
							<ContentFromCms>{bannerTitle}</ContentFromCms>
						</h1>
					</div>
					<div className={`${styles.flexItemTwo}`}>
						<div className={`${styles.label} text_reg color_dark_gray`}>
							<ContentFromCms>{bannerDescription}</ContentFromCms>
						</div>
						{btnTxt && (
							<a href={btnLink} {...dynamicBtn} className={`${styles.bookBtn} pt_30`}>
								<Button color="primary" variant="filled" shape="rounded">
									{btnTxt}
								</Button>
							</a>
						)}
						{dynamicBtn?.btntext && (
							<a href={btnLink} {...dynamicBtn} className={`${styles.bookBtn} pt_30`}>
								<Button color="primary" variant="filled" shape="rounded">
									{dynamicBtn?.btntext}
								</Button>
							</a>
						)}
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
							{/* <video ref={videoRef} playsInline autoPlay muted loop>
							<source src="../../../img/softwares/frame_video.mp4" type="video/mp4" />
						</video> */}
							<div className={`${styles.VideoBox}`}>
								<Vimeo
									className={`${styles.vimeoPlayer}`}
									ref={vimeoRef}
									{...defaultVimeoObj}
								/>
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
					</div>
				) : (
					<div className={`${styles.banner_image}`}>
						<picture>
							<source srcSet={desktopImage} media="(min-width:767px)" />
							<img src={mobileImage} alt="Banner Image" />
						</picture>
					</div>
				)}
			</div>
		</section>
	);
}
