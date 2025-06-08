"use client";
// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";
import { usePathname } from "next/navigation";

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
import styles from "@/styles/sections/softwares/SoftwareVideos.module.scss";

// IMAGES //
import product_logo from "@/../public/img/softwares/product_logo.jpg";
import play from "@/../public/img/softwares/play_icon.svg";

// DATA //

/** SoftwareVideos Section */
export default function SoftwareVideos() {
	const pathname = usePathname();
	const isOrigin = pathname.includes("origin");

	if (!pathname.includes("origin") && !pathname.includes("chronos")) {
		return null;
	}

	return (
		<section className={`${styles.SoftwareVideos} pt_100`}>
			<div className="container">
				<div className={`${styles.testimonialWhiteBox}`}>
					<div className={`${styles.testimonialItem} f_w_j`}>
						<div className={`${styles.productLogoBox}`}>
							<div className={`${styles.videoBox}`}>
								<LightGallery speed={500} plugins={[lgThumbnail, lgZoom, lgVideo]}>
									<div data-src="https://vimeo.com/1067644103">
										<img
											src={product_logo.src}
											className={`${styles.videoThumbnail} img b_r_10`}
											alt="video thumbnail"
										/>
										<img src={play.src} className={`${styles.playIcon} `} alt="play" />
									</div>
								</LightGallery>
							</div>
						</div>
						<div className={`${styles.testimonialTxt}`}>
							<h3 className="text_lg color_secondary pb_30">
								Seamlessly integrate Origin with Chronos to stress-test your battery
								strategy and navigate market uncertainties with confidence
							</h3>
							<a
								href={isOrigin ? "/software/chronos" : "/software/origin"}
								target="_blank"
								rel="noreferrer"
								className={`${styles.bookBtnOne}`}
							>
								<Button
									color="primary"
									variant="filled"
									shape="rounded"
									hoverBg="white"
								>
									What is {!isOrigin ? "Origin" : "Chronos"}?
								</Button>
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
