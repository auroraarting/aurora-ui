// MODULES //
import { useEffect, useState, useRef } from "react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/softwares/SoftwareBanner.module.scss";

// IMAGES //
import SoftwareLogo from "../../../public/img/softwares/chronos-logo.png";
import mac_img from "../../../public/img/softwares/mac_img.png";
import frame_video from "../../../public/img/softwares/frame_video.png";
import pause_button from "../../../public/img/icons/pause_button.svg";
import play_button from "../../../public/img/icons/video_play.svg";

// DATA //

/** SoftwareBanner Section */
export default function SoftwareBanner() {
	const [isPlaying, setIsPlaying] = useState(true);
	const videoRef = useRef(null);

	/** togglePlayPause */
	const togglePlayPause = () => {
		if (videoRef.current) {
			if (isPlaying) {
				videoRef.current.pause();
			} else {
				videoRef.current.play();
			}
			setIsPlaying(!isPlaying);
		}
	};
	return (
		<section className={`${styles.SoftwareBanner} ptb_100`}>
			<div className="container">
				<div className={`${styles.SoftwareLogo} pb_20`}>
					<img
						src={SoftwareLogo.src}
						alt="Software Logo"
						className={`${styles.SoftwareLogo}`}
					/>
				</div>
				<div className={`${styles.flexBox} f_j`}>
					<div className={`${styles.flexItemOne}`}>
						<h1 className="text_xl font_primary f_w_m color_secondary text_uppercase">
							Battery valuations, Perfected.
						</h1>
					</div>
					<div className={`${styles.flexItemTwo}`}>
						<p className={`${styles.label} text_reg color_dark_gray`}>
							Harness innovative tools to simplify complexity, optimise decisions, and
							drive impactful energy solutions with confidence and precision.
						</p>
						<div className={`${styles.bookBtn} pt_30`}>
							<Button color="primary" variant="filled" shape="rounded">
								Book a Demo
							</Button>
						</div>
					</div>
				</div>
				<div className={`${styles.macFrameBox} f_r_aj_center`}>
					<img src={mac_img.src} alt="mac img" className={`${styles.mac_img}`} />
					{/* <img
						src={frame_video.src}
						alt="mac img"
						className={`${styles.frame_video}`}
					/> */}
					<div className={`${styles.frame_video}`}>
						<video ref={videoRef} playsInline autoPlay muted loop>
							<source src="../../../img/softwares/frame_video.mp4" type="video/mp4" />
						</video>
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
		</section>
	);
}
