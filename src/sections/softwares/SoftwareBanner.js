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
import styles from "@/styles/sections/softwares/SoftwareBanner.module.scss";

// IMAGES //

// DATA //

/** SoftwareBanner Section */
export default function SoftwareBanner({
	bannerTitle = "Battery valuations, Perfected.",
	bannerDescription = "Harness innovative tools to simplify complexity, optimise decisions, and drive impactful energy solutions with confidence and precision.",
	desktopImage,
	mobileImage,
	vimeoid,
	videos,
	btnText,
	btnLink,
	logo,
	dynamicBtn,
}) {
	return (
		<section className={`${styles.SoftwareBanner} pt_60`}>
			<div className="container">
				{logo && (
					<div className={`${styles.SoftwareLogo} pb_20`}>
						<img
							src={logo}
							alt="Software Logo"
							className={`${styles.SoftwareLogo}`}
						/>
					</div>
				)}
				<div className={`${styles.flexBox} f_j`}>
					<div className={`${styles.flexItemOne}`}>
						<h1 className="text_xl font_primary f_w_m color_secondary text_uppercase">
							{bannerTitle}
						</h1>
					</div>
					<div className={`${styles.flexItemTwo}`}>
						<div className={`${styles.label} text_reg color_dark_gray`}>
							<ContentFromCms>{bannerDescription}</ContentFromCms>
						</div>

						{btnText ? (
							<div className={`${styles.bookBtn} ptb_30`}>
								<a href={btnLink}>
									<Button color="primary" variant="filled" shape="rounded">
										{btnText}
									</Button>{" "}
								</a>
							</div>
						) : (
							<div {...dynamicBtn} className={`${styles.bookBtn} pt_30`}>
								<Button color="primary" variant="filled" shape="rounded" textlowercase>
									{dynamicBtn.btntext}
								</Button>
							</div>
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
