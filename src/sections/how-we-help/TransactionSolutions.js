"use client";
// MODULES //
import { useEffect, useState, useRef } from "react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Navigation, Autoplay, Controller } from "swiper/modules";

// UTILS //

// STYLES //
import styles from "@/styles/sections/how-we-help/TransactionSolutions.module.scss";

// IMAGES //
import solar_plant from "@/../public/img/transactions/solar_plant.jpg";
import lumus_logo from "@/../public/img/transactions/lumus_logo.png";
import TestImg from "/public/img/softwares/insightsBg.png";
import Banner1 from "/public/img/products/banner1.jpg";
import Banner2 from "/public/img/products/banner2.jpg";
import Banner3 from "/public/img/products/banner3.jpg";
import Banner4 from "/public/img/products/banner4.jpg";

import PowerRenewables from "/public/img/products/power-renewables.png";
import Hydrogen from "/public/img/products/hydrogen.png";
import Grid from "/public/img/products/grid.png";

// DATA //

/** TransactionSolutions Section */
export default function TransactionSolutions({
	data,
	slugPage = "products",
	keyValue = "products",
	isSlider,
	useSpotlight,
}) {
	const animTimeline = gsap.timeline({});
	const [swiperOne, setSwiperOne] = useState(null);
	const [swiperTwo, setSwiperTwo] = useState(null);

	useEffect(() => {
		if (data?.length === 0 || !data || isSlider) return null;

		gsap.registerPlugin(ScrollTrigger);
		const winW = window.innerWidth;
		const winH = window.innerHeight;

		const spaceLeftArray = gsap.utils.toArray(`.${styles.SpaceLeft}`);
		const spaceLeftArrayImg = gsap.utils.toArray(`.${styles.flexItemTwo} img`);

		spaceLeftArray.forEach((star, idx) => {
			if (spaceLeftArray.length === idx + 1) {
				animTimeline.to(
					spaceLeftArray[idx + 1],
					{
						y: 0,
					},
					`${idx}st`
				);
				// .to(
				// 	spaceLeftArrayImg[idx + 1],
				// 	{
				// 		opacity: 0,
				// 	},
				// 	`${idx}st`
				// );
			} else {
				animTimeline
					.to(star, { y: "-100%" }, `${idx}st`)
					.to(
						spaceLeftArray[idx + 1],
						{
							y: 0,
						},
						`${idx}st`
					)
					.to(spaceLeftArrayImg[idx], { opacity: 0 }, `${idx}st`)
					.to(
						spaceLeftArrayImg[idx + 1],
						{
							opacity: 1,
						},
						`${idx}st`
					);
			}
		});

		ScrollTrigger.create({
			animation: animTimeline,
			trigger: `.${styles.TransactionSolutions}`,
			start: "top top",
			end: "+=" + winH * (data?.length || spaceLeftArray.length),
			scrub: true,
			pin: true,
			// markers: true,
		});
	}, []);

	if (data?.length === 0 || !data) {
		return <></>;
	}

	return (
		<section
			className={`${styles.TransactionSolutions} ${isSlider && styles.isSlider}`}
			id="spotlight"
			data-name="Spotlight"
		>
			<div className={`${styles.flexBox} f_j`}>
				<div className={`${styles.flexItemOne}`}>
					{isSlider ? (
						<Swiper
							modules={[Navigation, Autoplay, Controller]}
							slidesPerView={1}
							spaceBetween={0}
							grabCursor={true}
							speed={500}
							loop={true}
							navigation={{
								prevEl: "#customPrev",
								nextEl: "#customNext",
							}}
							// autoplay={{
							// 	delay: 3000,
							// 	disableOnInteraction: false,
							// }}
							onSwiper={setSwiperOne}
							controller={{ control: swiperTwo }}
							className={styles.slider}
						>
							{data?.map((item, ind) => {
								let contentType = keyValue;

								if (item?.contentType?.node?.name)
									contentType = item?.contentType?.node?.name;

								return (
									<SwiperSlide key={ind}>
										<div
											className={`${styles.SpaceLeft}`}
											key={ind}
											style={{
												background: `linear-gradient(180deg,${item?.[contentType]?.thumbnail?.gradient?.from} 0%,${item?.[contentType]?.thumbnail?.gradient?.to} 100%)`,
											}}
										>
											<div className={`${styles.spaceInner}`}>
												{item?.[contentType]?.thumbnail?.logo?.node?.mediaItemUrl && (
													<img
														src={item?.[contentType]?.thumbnail?.logo?.node?.mediaItemUrl}
														alt="solar plant"
													/>
												)}
												<h2 className="text_xl font_primary color_white pt_60 pb_20">
													{useSpotlight
														? item?.[contentType]?.thumbnail?.spotlightTitle
														: item?.[contentType]?.thumbnail?.title}
												</h2>
												<p className={`${styles.label} text_reg color_platinum_gray`}>
													{useSpotlight
														? item?.[contentType]?.thumbnail?.spotlightDesc
														: item?.[contentType]?.thumbnail?.shortDescription}
												</p>
												<div className={`${styles.bookBtn} pt_60`}>
													<a href={item?.link || `/${slugPage}/${item?.slug}`}>
														<Button color="secondary" variant="underline" mode="dark">
															Know more
														</Button>
													</a>
												</div>
											</div>
										</div>
									</SwiperSlide>
								);
							})}
						</Swiper>
					) : (
						data?.map((item, ind) => {
							let contentType = keyValue;

							if (item?.contentType?.node?.name)
								contentType = item?.contentType?.node?.name;

							return (
								<div
									className={`${styles.SpaceLeft}`}
									key={ind}
									style={{
										background: `linear-gradient(180deg,${item?.[contentType]?.thumbnail?.gradient?.from} 0%,${item?.[contentType]?.thumbnail?.gradient?.to} 100%)`,
									}}
								>
									<div className={`${styles.spaceInner}`}>
										{item?.[contentType]?.thumbnail?.logo?.node?.mediaItemUrl && (
											<img
												src={item?.[contentType]?.thumbnail?.logo?.node?.mediaItemUrl}
												alt="solar plant"
											/>
										)}
										<h2 className="text_xl font_primary color_white pt_60 pb_20">
											{useSpotlight
												? item?.[contentType]?.thumbnail?.spotlightTitle
												: item?.[contentType]?.thumbnail?.title}
										</h2>
										<p className={`${styles.label} text_reg color_platinum_gray`}>
											{useSpotlight
												? item?.[contentType]?.thumbnail?.spotlightDesc
												: item?.[contentType]?.thumbnail?.shortDescription}
										</p>
										<div className={`${styles.bookBtn} pt_60`}>
											<a href={item?.link || `/${slugPage}/${item?.slug}`}>
												<Button color="secondary" variant="underline" mode="dark">
													Know more
												</Button>
											</a>
										</div>
									</div>
								</div>
							);
						})
					)}
					{isSlider && data.length > 1 && (
						<div className={`${styles.arrowSection} f_w_a_j_center`}>
							<button className={`${styles.customPrev}`} id="customPrev">
								<img src="/img/icons/howwehelpSwiperRight.svg" alt="icon" />
							</button>
							<button className={styles.customNext} id="customNext">
								<img src="/img/icons/howwehelpSwiperRight.svg" alt="icon" />
							</button>
						</div>
					)}
				</div>
				<div className={`${styles.flexItemTwo}`}>
					{isSlider ? (
						<Swiper
							modules={[Navigation, Autoplay, Controller]}
							slidesPerView={1}
							spaceBetween={0}
							grabCursor={true}
							speed={500}
							loop={true}
							// navigation={{
							// 	prevEl: "#customPrev",
							// 	nextEl: "#customNext",
							// }}
							// autoplay={{
							// 	delay: 3000,
							// 	disableOnInteraction: false,
							// }}
							onSwiper={setSwiperTwo}
							controller={{ control: swiperOne }}
							className={styles.slider}
						>
							{data?.map((item, ind) => {
								let contentType = keyValue;

								if (item?.contentType?.node?.name)
									contentType = item?.contentType?.node?.name;
								return (
									<SwiperSlide key={ind}>
										<img
											key={ind}
											src={item?.[contentType]?.thumbnail?.banner?.node?.mediaItemUrl}
											alt="solar plant"
										/>
									</SwiperSlide>
								);
							})}
						</Swiper>
					) : (
						data?.map((item, ind) => {
							let contentType = keyValue;

							if (item?.contentType?.node?.name)
								contentType = item?.contentType?.node?.name;
							return (
								<img
									key={ind}
									src={item?.[contentType]?.thumbnail?.banner?.node?.mediaItemUrl}
									alt="solar plant"
								/>
							);
						})
					)}
				</div>
			</div>
		</section>
	);
}
