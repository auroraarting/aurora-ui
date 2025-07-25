"use client";
// MODULES //
import { useEffect, useRef, useState } from "react";

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
import { slugify } from "@/utils";

// DATA //

/** IntuitiveStepProcess Section */
export default function IntuitiveStepProcess({
	removeTopBottom,
	data,
	customHtml,
}) {
	const [active, setActive] = useState(0);
	const intervalRef = useRef(null);

	/** startInterval  */
	const startInterval = () => {
		intervalRef.current = setInterval(() => {
			setActive((prev) => (prev < data.process.length - 1 ? prev + 1 : 0));
		}, 2000);
	};

	/** stopInterval  */
	const stopInterval = () => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	};

	useEffect(() => {
		startInterval();
		return () => stopInterval(); // Cleanup on unmount
	}, []);

	if (data?.process?.length === 0) {
		return <></>;
	}

	/** pagination */
	const pagination = {
		clickable: true,
		renderBullet: function (index, className) {
			return `<span class="${className}">${index + 1}</span>`;
		},
	};

	/** sectionTitle  */
	const sectionTitle = () => {
		if (data.tabTitle) {
			/** removeNumbers  */
			const removeNumbers = (str) => {
				return str.replace(/[0-9]/g, "");
			};
			return { title: data.tabTitle, id: slugify(removeNumbers(data?.tabTitle)) };
		}
		return { title: `${data?.process?.length || "4"} STEP PROCESS`, id: "steps" };
	};

	return (
		<section
			id={sectionTitle()?.id}
			data-name={sectionTitle()?.title}
			className={`${styles.IntuitiveStepProcess} dark_bg
                ${!data?.description ? "" : ""}
                pb_100`}
			onMouseEnter={stopInterval}
			onMouseLeave={startInterval}
		>
			<div className="container">
				{(data?.description || customHtml) && (
					<div className={`${styles.StepProcessTxt} pt_100`}>
						<h5 className="text_lg color_white f_w_s_b">{data?.description}</h5>
						{customHtml && customHtml}
					</div>
				)}
				{data?.processTitle && (
					<div className={`${styles.stepsTxt} pt_100`}>
						<h2 className="text_xl font_primary f_w_s_b text_center color_white ">
							{data?.processTitle}
						</h2>
					</div>
				)}
			</div>
			<div className={`${styles.stepsSlider} pt_40`}>
				<div className="container">
					<div className={`${styles.item}`}>
						<div className={`${styles.SliderItem} f_w_j a_center`}>
							<div className={`${styles.imgVideoWrap}`}>
								{data?.process?.map((item, ind) => {
									return (
										<div
											className={`${styles.imgVideo} ${
												active === ind ? styles.active : ""
											}`}
											key={ind}
										>
											{item?.image?.node?.mediaItemUrl ? (
												<img
													src={item?.image?.node?.mediaItemUrl}
													className={`${styles.steps_img} b_r_20`}
													alt="steps img"
												/>
											) : (
												<video playsInline autoPlay muted loop>
													<source src={item?.video?.node?.mediaItemUrl} type="video/mp4" />
												</video>
											)}
										</div>
									);
								})}
							</div>

							<div className={`${styles.Content}`}>
								{data?.process?.map((obj, objInd) => {
									return obj?.processDetails?.map((item, ind2) => {
										return (
											<div
												className={`${styles.contentItem} ${
													active === objInd ? styles.active : ""
												}`}
												key={objInd}
												onClick={() => setActive(objInd)}
											>
												<h5 className="text_md color_white f_w_s_b">{item?.description}</h5>
											</div>
										);
									});
								})}
							</div>
						</div>
					</div>
				</div>
				{/* <Swiper
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
									</div>
								</div>
							</SwiperSlide>
						);
					})}
				</Swiper> */}
			</div>
		</section>
	);
}
