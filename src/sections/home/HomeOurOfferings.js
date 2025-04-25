// MODULES //
import { useEffect, useRef } from "react";

// COMPONENTS //

// SECTIONS //

// PLUGINS //
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Lottie from "lottie-web";

// UTILS //
import EqualHeight from "../../utils/EqualHeight";

// STYLES //
import styles from "@/styles/sections/home/HomeOurOfferings.module.scss";

// IMAGES //
import macEOS from "../../../public/img/home/mac-eos.png";
import menu_hover_arrow from "../../../public/img/icons/menu_hover_arrow.svg";

// DATA //

/** HomeOurOfferings Section */
export default function HomeOurOfferings() {
	const anim1 = useRef();
	const anim2 = useRef();
	/** platLottie funnction */
	function playLottie() {
		Lottie.loadAnimation({
			container: anim1.current,
			renderer: "svg",
			loop: true,
			autoplay: true,
			animationData: require("../../../public/img/home/lottie/SoftwareLottie.json"),
		});
		Lottie.loadAnimation({
			container: anim2.current,
			renderer: "svg",
			loop: true,
			autoplay: true,
			animationData: require("../../../public/img/home/lottie/SubscriptionCardLottie.json"),
		});
	}
	const animRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
	const animRefs2 = [useRef(null), useRef(null), useRef(null), useRef(null)];
	/** platLottie funnction */
	function platLottieResp() {
		/** platLottie funnction */
		const loadLottieAnimation = (ref, animationData) => {
			if (ref.current) {
				Lottie.loadAnimation({
					container: ref.current,
					renderer: "svg",
					loop: true,
					autoplay: true,
					animationData: animationData,
				});
			}
		};
		const animationDataArray = [
			require("../../../public/img/home/lottie/SoftwareLottie.json"),
		];
		const animationDataArray1 = [
			require("../../../public/img/home/lottie/SubscriptionCardLottie.json"),
		];
		animRefs.forEach((ref, index) => {
			loadLottieAnimation(ref, animationDataArray[index]);
		});
		animRefs2.forEach((ref, index) => {
			loadLottieAnimation(ref, animationDataArray1[index]);
		});
	}
	useEffect(() => {
		playLottie();
		platLottieResp();
		//EqualHeight("cardHBg");
	}, []);
	return (
		<section className={`${styles.HomeOurOfferings} pt_100`}>
			<h3 className="text_lg color_secondary text_center">
				We provide our clients with data-driven intelligence for{" "}
				<br className="visible_lg" /> strategy, portfolio management and investment
				<br className="visible_lg" />
				decisions on the global energy transformation
			</h3>
			<div className={`${styles.OurOfferingSlider} pt_60`}>
				<Swiper
					modules={[Navigation, Pagination, Autoplay]}
					spaceBetween={0}
					grabCursor={true}
					speed={500}
					loop={true}
					slidesPerView="auto"
					// autoplay={{
					// 	delay: 3000,
					// 	disableOnInteraction: false,
					// }}
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
						<div className={`${styles.itemBox}`}>
							<div className={`${styles.Content}`}>
								<img
									src={menu_hover_arrow.src}
									alt="icon"
									className={`${styles.Icon_arrow}`}
								/>
								<h4 className="text_md f_w_m color_white ">EOS Platform</h4>
								<p className="text_reg color_silver_gray ">
									EOS centralizes Aurora’s data, software, forecasts, and insights,
									empowering energy professionals to make smarter, faster decisions.
								</p>
							</div>
							<img
								src={macEOS.src}
								alt="mac eos"
								className={`${styles.BoxImg} m_0_auto`}
							/>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className={`${styles.itemBox}`}>
							<div className={`${styles.Content} ${styles.LottieContent}`}>
								<img
									src={menu_hover_arrow.src}
									alt="icon"
									className={`${styles.Icon_arrow}`}
								/>
								<h4 className="text_md f_w_m color_white ">Software</h4>
								<p className="text_reg color_silver_gray ">
									EOS centralizes Aurora’s data, software, forecasts, and insights,
									empowering energy professionals to make smarter, faster decisions.
								</p>
							</div>
							{/* <img
								src={macEOS.src}
								alt="mac eos"
								className={`${styles.BoxImg} m_0_auto`}
							/> */}
							<div className={`${styles.softwareAnim}`} ref={animRefs[0]}></div>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className={`${styles.itemBox}`}>
							<div className={`${styles.Content} ${styles.LottieContent}`}>
								<img
									src={menu_hover_arrow.src}
									alt="icon"
									className={`${styles.Icon_arrow}`}
								/>
								<h4 className="text_md f_w_m color_white ">Subscription Analytics</h4>
								<p className="text_reg color_silver_gray ">
									EOS centralizes Aurora’s data, software, forecasts, and insights,
									empowering energy professionals to make smarter, faster decisions.
								</p>
							</div>
							{/* <img
								src={macEOS.src}
								alt="mac eos"
								className={`${styles.BoxImg} m_0_auto`}
							/> */}
							<div className={`${styles.softwareAnim}`} ref={animRefs2[0]}></div>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className={`${styles.itemBox}`}>
							<div className={`${styles.Content}`}>
								<img
									src={menu_hover_arrow.src}
									alt="icon"
									className={`${styles.Icon_arrow}`}
								/>
								<h4 className="text_md f_w_m color_white ">Advisory</h4>
								<p className="text_reg color_silver_gray ">
									EOS centralizes Aurora’s data, software, forecasts, and insights,
									empowering energy professionals to make smarter, faster decisions.
								</p>
							</div>
							<img
								src={macEOS.src}
								alt="mac eos"
								className={`${styles.BoxImg} m_0_auto`}
							/>
						</div>
					</SwiperSlide>
				</Swiper>
			</div>
		</section>
	);
}
