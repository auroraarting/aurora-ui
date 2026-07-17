"use client";
// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";
import BannerVideoSlider from "@/components/BannerVideoSlider";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/products/ProductBanner.module.scss";

// IMAGES //
import ContentFromCms from "@/components/ContentFromCms";
import { dynamicInsightsBtnProps } from "@/utils";

// DATA //

/** ProductBanner Section */
export default function ProductBanner({
	data,
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
	dynamicBtn,
}) {
	return (
		<section className={`${styles.ProductBanner} pt_60`}>
			<div className="container">
				{logo && (
					<div className={`${styles.SoftwareLogo} pb_20`}>
						<img src={logo} alt="Software Logo" />
					</div>
				)}
				<div className={`${styles.flexBox} f_j`}>
					<div className={`${styles.flexItemOne}`}>
						<h1 className="text_xl font_primary f_w_m color_secondary text_uppercase">
							<ContentFromCms>{bannerTitle}</ContentFromCms>
						</h1>
					</div>
					<div className={`${styles.flexItemTwo}`}>
						<div className={`${styles.label} text_reg color_dark_gray`}>
							<ContentFromCms>{bannerDescription}</ContentFromCms>
						</div>
						{btnTxt && (
							<a href={btnLink} {...dynamicBtn} className={`${styles.bookBtn} pt_30`}>
								<Button color="primary" variant="filled" shape="rounded">
									{btnTxt}
								</Button>
							</a>
						)}
						{dynamicBtn?.btntext && (
							<a href={btnLink} {...dynamicBtn} className={`${styles.bookBtn} pt_30`}>
								<Button color="primary" variant="filled" shape="rounded" textlowercase>
									{dynamicBtn?.btntext}
								</Button>
							</a>
						)}
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
