// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";
import ContentFromCms from "@/components/ContentFromCms";
import LottieRenderer from "@/components/LottieRenderer";
// SECTIONS //

// PLUGINS //
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

// UTILS //

// STYLES //
import styles from "@/styles/sections/products/MarketIntelligence.module.scss";

// IMAGES //
import market_intelligence from "../../../public/img/products/market_intelligence.png";

// DATA //

/** MarketIntelligence Section */
export default function MarketIntelligence({ data }) {
	if (!data) {
		return <></>;
	}

	return (
		<section
			className={`${styles.MarketIntelligence}`}
			id="introduction"
			data-name="Introduction"
		>
			<div className="container">
				<div className={`${styles.flexBox} f_r_aj_between`}>
					<div className={`${styles.flexItemOne}`}>
						<h2 className="text_xxl font_primary f_w_s_b color_secondary pb_20">
							<ContentFromCms>{data?.title}</ContentFromCms>
						</h2>
						<div className="text_reg color_dark_gray">
							<ContentFromCms>{data?.description}</ContentFromCms>
						</div>
					</div>
					<div className={`${styles.flexItemTwo}`}>
						{data?.image?.node?.mediaItemUrl && (
							<img
								src={data?.image?.node?.mediaItemUrl}
								className={`${styles.redefining} img`}
								alt="redefining"
							/>
						)}
						{/* data?.lottie?.node?.mediaItemUrl */}
						{data?.lottie?.node?.mediaItemUrl && (
							<LottieRenderer
								src={data?.lottie?.node?.mediaItemUrl}
								autoplay={true}
								loop={true}
								renderer="svg"
								renderersettings={{
									preserveAspectRatio: "xMidYMid meet",
								}}
							/>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
