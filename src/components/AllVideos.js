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

// DATA //

/** CareerSeries Section */
export default function AllVideos() {
	return (
		<section className={`${styles.CareerSeries} CareerSeries`}>
			<div className="container">
				<div className={`${styles.card} f_r_aj_between`}>
					<div className={`${styles.content}`}>
						<h4
							className={`${styles.categoryTxt} text_xs color_medium_gray text_uppercase`}
						>
							Aurora’s career series
						</h4>
						<h2 className="text_xl font_primary f_w_m color_white pb_20">
							Where talent meets purpose
						</h2>
						<p className="text_reg color_dark_gray pb_20">
							Lorem ipsum dolor sit amet consectetur. Lectus aliquam lectus sed
							ultrices tincidunt viverra integer vitae. Posuere mauris magna
						</p>
						<div className={`${styles.bookBtnOne} bookBtnOne`}>
							<Button color="secondary" variant="underline" mode="dark" size="xs">
								Watch All Videos
							</Button>
						</div>
					</div>
					<div className={`${styles.imageWrapper}`}>
						<LightGallery
							speed={500}
							plugins={[lgThumbnail, lgZoom, lgVideo]}
							mobileSettings={{ closable: true }}
						>
							<a
								href="https://youtu.be/mOFoh9FUR8w?si=z8BN9lfjW7trN0zy"
								data-src="https://youtu.be/mOFoh9FUR8w?si=z8BN9lfjW7trN0zy"
							>
								<img
									src={video_img.src}
									className={`${styles.videoThumbnail} img b_r_10`}
									alt="video thumbnail"
								/>
								<img
									src={video_play.src}
									className={`${styles.playIcon} `}
									alt="play"
								/>
							</a>
						</LightGallery>
					</div>
				</div>
			</div>
		</section>
	);
}
