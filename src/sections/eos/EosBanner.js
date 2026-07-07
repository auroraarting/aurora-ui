"use client";

// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";
import ContentFromCms from "@/components/ContentFromCms";
import BannerVideoSlider from "@/components/BannerVideoSlider";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/eos/EosBanner.module.scss";

// IMAGES //
import { dynamicInsightsBtnProps } from "@/utils";

// DATA //

/** EosBanner Section */
export default function EosBanner({
	desktopImage,
	bannerTitle,
	bannerDescription,
	mobileImage,
	btnTxt,
	btnLink,
	showContentOnly = false, // New prop to toggle visibility
	vimeoid,
	videos,
	logo,
	dataForBtn,
}) {
	return (
		<section className={`${styles.EosBanner} ptb_100`}>
			<div className="container">
				<div className={`${styles.flexBox} f_j`}>
					<div className={`${styles.flexItemOne}`}>
						<h1 className="text_xl font_primary f_w_m color_white text_uppercase">
							<ContentFromCms>{bannerTitle}</ContentFromCms>
						</h1>
					</div>
					<div className={`${styles.flexItemTwo}`}>
						<div className={`${styles.label} text_reg color_silver_gray`}>
							<ContentFromCms>{bannerDescription}</ContentFromCms>
						</div>
						<div className={`${styles.bookBtn} pt_30`}>
							{/* <a {...dataForBtn}>
								<Button color="primary" variant="filled" shape="rounded" mode="dark">
									{dataForBtn?.btntext}
								</Button>
							</a> */}
							{btnTxt && (
								<a href={btnLink} target="_blank" rel="noreferrer">
									<Button color="primary" variant="filled" shape="rounded" mode="dark">
										{btnTxt}
									</Button>
								</a>
							)}
						</div>
					</div>
				</div>
				<BannerVideoSlider
					styles={styles}
					videos={videos}
					vimeoLink={vimeoid}
					desktopImage={desktopImage}
					mobileImage={mobileImage}
				/>
			</div>
		</section>
	);
}
