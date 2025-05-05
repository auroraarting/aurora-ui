// MODULES //
import { useEffect, useRef } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //
// import Lottie from "lottie-web";

// UTILS //
import { dynamicInsightsBtnProps } from "@/utils";

// STYLES //
import styles from "@/styles/sections/home/HomeBanner.module.scss";

// IMAGES //
import bannerGraph from "../../../public/img/home/banner-graph.png";

// DATA //

/** HomeBanner Section */
export default function HomeBanner() {
	const lottieAnimations = [
		{ id: "1", src: "/img/home/lottie/bannerRightSide.json" },
	];
	// const bannerAni = useRef();
	// /** platLottie funnction */
	// function playLottie() {
	// 	Lottie.loadAnimation({
	// 		container: bannerAni.current,
	// 		renderer: "svg",
	// 		loop: true,
	// 		autoplay: true,
	// 		animationData: require("../../../public/img/home/lottie/bannerRightSide.json"),
	// 	});
	// }
	// const bannerAniRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
	// /** platLottie funnction */
	// function platLottieResp() {
	// 	/** platLottie funnction */
	// 	const loadLottieAnimation = (ref, animationData) => {
	// 		if (ref.current) {
	// 			Lottie.loadAnimation({
	// 				container: ref.current,
	// 				renderer: "svg",
	// 				loop: true,
	// 				autoplay: true,
	// 				animationData: animationData,
	// 			});
	// 		}
	// 	};
	// 	const animationDataArray = [
	// 		require("../../../public/img/home/lottie/bannerRightSide.json"),
	// 	];
	// 	bannerAniRefs.forEach((ref, index) => {
	// 		loadLottieAnimation(ref, animationDataArray[index]);
	// 	});
	// }
	// useEffect(() => {
	// 	playLottie();
	// 	platLottieResp();
	// }, []);
	return (
		<div className={styles.HomeBanner}>
			<div className={`${styles.BannerContentSection}`}>
				<div className="container">
					<div className={`${styles.BannerInfo} f_w_j`}>
						<div className={`${styles.BannerContent}`}>
							<h1 className="text_xl f_w_m color_white pb_10 text_uppercase">
								Bankable energy analytics that power investment decisons
							</h1>
							<p className="text_reg color_silver_gray">
								From long-term forecasts to on-demand software and strategic advisory,
								Aurora equips you with the insight and tools to make smarter energy
								decisions across every stage of the asset lifecycle.
							</p>
							<div
								{...dynamicInsightsBtnProps()}
								className={`${styles.bookBtnOne} pt_40`}
							>
								<Button color="primary" variant="filled" shape="rounded" mode="dark">
									Book a Demo
								</Button>
							</div>
						</div>
						<div className={`${styles.BannerImg}`}>
							{/* <img
								src={bannerGraph.src}
								className={`${styles.BannerGraph} width_100`}
								alt="Banner Graph"
							/> */}
							{/* <div className="bannerAni" ref={bannerAniRefs[0]}></div> */}
							<DotLottieReact
								src={lottieAnimations[0].src}
								autoplay={true}
								loop={true}
								renderer="svg"
								renderersettings={{
									preserveAspectRatio: "xMidYMid meet",
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
