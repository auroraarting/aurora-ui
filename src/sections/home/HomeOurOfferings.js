"use client";

/* eslint-disable @next/next/no-html-link-for-pages */
// MODULES //
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import dynamic from "next/dynamic";

// COMPONENTS //
import LottieRenderer from "@/components/LottieRenderer";

// SECTIONS //

// PLUGINS //
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
// import Lottie from "lottie-web";
import { useInView } from "react-intersection-observer";

// UTILS //
import EqualHeight from "../../utils/EqualHeight";

// STYLES //
import styles from "@/styles/sections/home/HomeOurOfferings.module.scss";

// IMAGES //
import macEOS from "../../../public/img/home/mac-eos.png";
import menu_hover_arrow from "../../../public/img/home/card_arrow.svg";
import Ellipse from "../../../public/img/ellipse.png";
import AdvisoryImg from "../../../public/img/home/advisory.jpg";

// DATA //

/** HomeOurOfferings Section */
export default function HomeOurOfferings() {
	const lottieAnimations = [
		{ id: "1", src: "/img/home/lottie/SoftwareLottie.json" },
	];
	const lottieAnimations2 = [
		{ id: "2", src: "/img/home/lottie/SubscriptionCardLottie.json" },
	];

	const [svgHeight, setSvgHeight] = useState("347px");
	const [svgHeightSubscription, setsvgHeightSubscription] = useState("260px");
	const bgColors = ["#fff", "#fff", "#fff", "#fff"];
	const [bgIndex, setBgIndex] = useState(0);

	useEffect(() => {
		EqualHeight("cardHBg");
		const interval = setInterval(() => {
			setBgIndex((prev) => (prev + 1) % bgColors.length);
		}, 1000); // Change every 1s (sync with Lottie)

		return () => clearInterval(interval);
	}, []);
	return (
		<section
			className={`${styles.HomeOurOfferings}`}
			aria-label="our offerings section"
			title="our offerings section"
		>
			<h2 className="text_lg color_secondary text_center">
				We equip decision-makers with actionable intelligence
				<br className="visible_lg" /> to navigate and capitalise on the global shift
				in energy systems.
			</h2>
			<div className={`${styles.OurOfferingSlider} pt_60`}>
				<Swiper
					modules={[Navigation, Pagination, Autoplay]}
					spaceBetween={0}
					grabCursor={true}
					speed={500}
					loop={true}
					slidesPerView="auto"
					pagination={{
						clickable: true, // Makes it interactive
					}}
					breakpoints={{
						767: {},
						768: {},
					}}
					className={styles.slider}
				>
					<SwiperSlide>
						<div className={`${styles.itemBox} cardHBg`}>
							<div className={`${styles.Content}`}>
								<a href="/eos" role="button">
									<img
										src={menu_hover_arrow.src}
										alt="icon"
										className={`${styles.Icon_arrow}`}
									/>
								</a>
								<h4 className="text_md f_w_m color_white">EOS Platform</h4>
								<p className="text_reg color_silver_gray">
									EOS is Aurora’s integrated energy intelligence platform, bringing
									together forecasts, market models, reports, and tools to support
									strategic decision-making.
								</p>
							</div>
							<img
								src={macEOS.src}
								alt="EOS Platform"
								className={`${styles.BoxImg} m_0_auto`}
							/>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div
							className={`${styles.itemBox} ${styles.softwareAnim} cardHBg`}
							style={{ backgroundColor: bgColors[bgIndex] }}
						>
							<div className={`${styles.Content}`}>
								<a href="/software" role="button">
									<img
										src={menu_hover_arrow.src}
										alt="icon"
										className={`${styles.Icon_arrow}`}
									/>
								</a>
								<h4 className="text_md f_w_m color_secondary">Software</h4>
								<p className="text_reg color_dark_gray">
									Our software suite empowers energy professionals with advanced tools
									for market forecasting, asset valuation, and strategic decision-making.
								</p>
							</div>
							<LottieRenderer
								src={lottieAnimations[0].src}
								autoplay={true}
								loop={true}
								renderer="svg"
								// style={{ height: svgHeight }}
								renderersettings={{
									preserveAspectRatio: "xMidYMid meet",
								}}
							/>
							{/* <img
								src={macEOS.src}
								alt="mac eos"
								className={`${styles.BoxImg} m_0_auto`}
							/> */}
							{/* <div className={`${styles.softwareAnim}`} ref={animRefs[0]}></div> */}
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className={`${styles.itemBox} ${styles.LottieContent} cardHBg`}>
							<div className={`${styles.Content}`}>
								<a href="/products" role="button">
									<img
										src={menu_hover_arrow.src}
										alt="icon"
										className={`${styles.Icon_arrow}`}
									/>
								</a>
								<h4 className="text_md f_w_m color_white">Subscription Analytics</h4>
								<p className="text_reg color_silver_gray">
									Access energy forecasts, policy insights, and analytics tools designed
									to inform smarter, faster market decisions powered through our
									subscription analytics.
								</p>
							</div>
							<LottieRenderer
								src={lottieAnimations2[0].src}
								autoplay={true}
								loop={true}
								renderer="svg"
								style={{ height: svgHeight }}
								renderersettings={{
									preserveAspectRatio: "xMidYMid meet",
								}}
							/>
							{/* <img
								src={macEOS.src}
								alt="mac eos"
								className={`${styles.BoxImg} m_0_auto`}
							/> */}
							{/* <div className={`${styles.softwareAnim}`} ref={animRefs2[0]}></div> */}
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className={`${styles.itemBox} ${styles.advisoryBox} cardHBg`}>
							<div className={`${styles.Content}`}>
								<a href="/service/advisory" role="button">
									<img
										src={menu_hover_arrow.src}
										alt="icon"
										className={`${styles.Icon_arrow}`}
									/>
								</a>
								<h4 className="text_md f_w_m color_white">Advisory</h4>
								<p className="text_reg color_silver_gray">
									Bespoke advisory support combining deep market expertise, modelling and
									insight to help clients navigate complex energy investment and policy
									decisions.
								</p>
							</div>
							<img
								src={AdvisoryImg.src}
								alt="Advisory"
								className={`${styles.BoxImg} m_0_auto b_r_10`}
							/>
						</div>
					</SwiperSlide>
				</Swiper>
			</div>
			<img
				src={Ellipse.src}
				srcSet={Ellipse.src}
				alt="Ellipse"
				className={`${styles.Ellipse}`}
				loading="lazy"
			/>
		</section>
	);
}
