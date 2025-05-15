"use client";
// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

// UTILS //

// STYLES //
import styles from "@/styles/sections/softwares/IntuitiveStepProcess.module.scss";

// IMAGES //
import steps_img from "../../../public/img/softwares/steps_img.jpg";

// DATA //

/** IntuitiveStepProcess Section */
export default function IntuitiveStepProcess({ data, customHtml }) {
	if (data.process.length === 0) return <></>;

	/** pagination */
	const pagination = {
		clickable: true,
		renderBullet: function (index, className) {
			return `<span class="${className}">${index + 1}</span>`;
		},
	};

	return (
		<section className={`${styles.IntuitiveStepProcess} dark_bg pt_100 pb_40`}>
			<div className="container">
				<div className={`${styles.StepProcessTxt} `}>
					<h5 className="text_lg color_white f_w_s_b">{data?.description}</h5>
					{customHtml ? (
						customHtml
					) : (
						<div className={`${styles.bookBtn} pt_50`}>
							<Button color="primary" variant="filled" shape="rounded" mode="dark">
								Book a Demo
							</Button>
						</div>
					)}
				</div>
				<div className={`${styles.stepsTxt} pt_80`}>
					<h2 className="text_xl font_primary f_w_s_b text_center color_white ">
						{data?.processTitle}
					</h2>
				</div>
			</div>
			<div className={`${styles.stepsSlider} pt_40`}>
				<Swiper
					pagination={pagination}
					modules={[Pagination, Autoplay]}
					slidesPerView={1.1}
					spaceBetween={20}
					loop={true}
					grabCursor={true}
					speed={500}
					className={styles.slider}
				>
					{data?.process?.map((item, ind) => {
						return (
							<SwiperSlide className={`${styles.item}`} key={ind}>
								<div className={`${styles.SliderItem} f_w_j a_center`}>
									<div className={`${styles.imgVideo}`}>
										{item?.image?.node?.mediaItemUrl ? (
											<img
												src={item?.image?.node?.mediaItemUrl}
												className={`${styles.steps_img}`}
												alt="steps img"
											/>
										) : (
											<video playsInline autoPlay muted loop>
												<source src={item?.video?.node?.mediaItemUrl} type="video/mp4" />
											</video>
										)}
										{/* <video playsInline autoPlay muted loop>
									<source src="../../img/softwares/frame_video.mp4" type="video/mp4" />
								</video> */}
									</div>
									<div className={`${styles.Content}`}>
										{item?.processDetails?.map((item, ind) => {
											return (
												<div className={`${styles.contentItem}`} key={ind}>
													<h5 className="text_md color_white f_w_s_b">
														{item?.description}
													</h5>
												</div>
											);
										})}
										{/* <div className={`${styles.contentItem}`}>
											<h5 className="text_md color_white f_w_s_b">
												Up-to-date locational benefits & charges
											</h5>
										</div>
										<div className={`${styles.contentItem}`}>
											<h5 className="text_md color_white f_w_s_b">
												Up-to-date locational benefits & charges
											</h5>
										</div>
										<div className={`${styles.contentItem}`}>
											<h5 className="text_md color_white f_w_s_b">
												Up-to-date locational benefits & charges
											</h5>
										</div> */}
									</div>
								</div>
							</SwiperSlide>
						);
					})}
				</Swiper>
			</div>
		</section>
	);
}
