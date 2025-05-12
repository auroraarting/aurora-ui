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
import styles from "@/styles/sections/events/EventsGallery.module.scss";

// IMAGES //
// import gallery_img from "@/../public/img/events/gallery_img.jpg";
import gallery_img from "../../../public/img/events/gallery_img.jpg";
import gallery_two_img from "@/../public/img/events/gallery_two_img.jpg";
import gallery_three_img from "@/../public/img/events/gallery_three_img.jpg";
import gallery_four_img from "@/../public/img/events/gallery_four_img.jpg";
import gallery_five_img from "@/../public/img/events/gallery_five_img.jpg";
import gallery_six_img from "@/../public/img/events/gallery_six_img.jpg";
import gallery_seven_img from "@/../public/img/events/gallery_seven_img.jpg";

// DATA //

/** EventsGallery Section */
export default function EventsGallery({ data }) {
	/** EventsGallery Section */
	const onInit = () => {
		// console.log("lightGallery has been initialized");
	};
	return (
		<div className={`${styles.EventsGallery} EventsGallery `}>
			<h2 className="text_lg color_secondary pb_10">Glimpses of our event</h2>
			<div className={`${styles.galleryMain}`}>
				<div className={styles.galleryBox}>
					<LightGallery
						onInit={onInit}
						speed={500}
						plugins={[lgThumbnail, lgVideo]}
						mode="lg-fade"
						mobileSettings={{ closable: true }}
					>
						{data?.events?.glimps?.gallery?.nodes?.map((item) => {
							return (
								<a
									key={item?.mediaItemUrl}
									href={item?.mediaItemUrl}
									data-src={item?.mediaItemUrl}
									className={`${styles.galleryItemOne}`}
								>
									<img
										src={item?.mediaItemUrl}
										className={`${styles.galleryImg} width_100 b_r_10`}
										alt="Gallery 1"
									/>
								</a>
							);
						})}
						{/* <a
							href={gallery_img.src}
							data-src={gallery_img.src}
							className={`${styles.galleryItemOne}`}
						>
							<img
								src={gallery_img.src}
								className={`${styles.galleryImg} width_100 b_r_10`}
								alt="Gallery 1"
							/>
						</a>
						<a
							className={`${styles.galleryItemTwo}`}
							href={gallery_two_img.src}
							data-src={gallery_two_img.src}
						>
							<img
								src={gallery_two_img.src}
								className={`${styles.galleryImg} width_100 b_r_10`}
								alt="Gallery"
							/>
						</a>
						<a
							className={`${styles.galleryItemThree}`}
							href={gallery_three_img.src}
							data-src={gallery_three_img.src}
						>
							<img
								src={gallery_three_img.src}
								className={`${styles.galleryImg} width_100 b_r_10`}
								alt="Gallery"
							/>
						</a>
						<a
							className={`${styles.galleryItemFour}`}
							href={gallery_four_img.src}
							data-src={gallery_four_img.src}
						>
							<img
								src={gallery_four_img.src}
								className={`${styles.galleryImg} width_100 b_r_10`}
								alt="Gallery"
							/>
						</a>
						<a
							className={`${styles.galleryItemFive}`}
							href={gallery_five_img.src}
							data-src={gallery_five_img.src}
						>
							<img
								src={gallery_five_img.src}
								className={`${styles.galleryImg} width_100 b_r_10`}
								alt="Gallery"
							/>
						</a>
						<a
							className={`${styles.galleryItemSix}`}
							href={gallery_six_img.src}
							data-src={gallery_six_img.src}
						>
							<img
								src={gallery_six_img.src}
								className={`${styles.galleryImg} width_100 b_r_10`}
								alt="Gallery"
							/>
						</a>
						<a
							className={`${styles.galleryItemSeven}`}
							href={gallery_seven_img.src}
							data-src={gallery_seven_img.src}
						>
							<img
								src={gallery_seven_img.src}
								className={`${styles.galleryImg} width_100 b_r_10`}
								alt="Gallery"
							/>
						</a> */}
					</LightGallery>
				</div>
			</div>
		</div>
	);
}
