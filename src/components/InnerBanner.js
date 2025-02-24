// MODULES //
import { useEffect, useState, useRef } from "react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// STYLES //
import styles from "@/styles/components/InnerBanner.module.scss";

// PLUGINS //

// IMAGES //
import DefaultBanner from "@/../public/img/banner/defaultDesktopBanner.jpg";
import DefaultBannerMob from "@/../public/img/banner/defaultMobileBanner.jpg";
import pause_button from "../../public/img/icons/pause_button.svg";
import play_button from "../../public/img/icons/play_icon.png";

// UTILS //

/** Inner Banner component */
function InnerBanner({
	desktopImage,
	bannerTitle,
	bannerDescription,
	mobileImage,
	videoSrc,
	btnTxt,
}) {
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
		<section>
			<div className="container">
				<div className={`${styles.inner_banner_wrap} `}>
					{/* Banner Content */}
					<div className={`${styles.flexBox} f_j ptb_60`}>
						<div className={`${styles.flexItemOne}`}>
							<h1 className="text_xl font_primary f_w_m color_secondary text_uppercase">
								{bannerTitle}
							</h1>
						</div>
						<div className={`${styles.flexItemTwo}`}>
							<p className={`${styles.label} text_reg color_dark_gray`}>
								{bannerDescription}
							</p>
							<div className={`${styles.bookBtn} pt_30`}>
								<Button color="primary" variant="filled" shape="rounded">
									{btnTxt}
								</Button>
							</div>
						</div>
					</div>
					{/* Banner Image or Video */}
					<div className={`${styles.banner_image} next_image`}>
						{videoSrc ? (
							<div className={`${styles.VideoBox}`}>
								<video ref={videoRef} playsInline autoPlay muted loop>
									<source src={videoSrc} type="video/mp4" />
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
						) : (
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
						)}
					</div>
				</div>
			</div>
		</section>
	);
}

export default InnerBanner;
