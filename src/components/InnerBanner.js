// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// STYLES //
import styles from "@/styles/components/InnerBanner.module.scss";

// PLUGINS //

// IMAGES //
import DefaultBanner from "@/../public/img/banner/defaultDesktopBanner.jpg";
import DefaultBannerMob from "@/../public/img/banner/defaultMobileBanner.jpg";

// UTILS //

/** Inner Banner component */
function InnerBanner({
	desktopImage,
	bannerTitle,
	bannerDescription,
	mobileImage,
	videoSrc,
}) {
	return (
		<section>
			<div className="container">
				<div className={`${styles.inner_banner_wrap} `}>
					{/* Banner Content */}
					<div className={`${styles.flexBox} f_j ptb_60`}>
						<div className={`${styles.flexItemOne}`}>
							<h1 className="text_xl font_primary f_w_m color_secondary text_uppercase">
								{bannerTitle}
							</h1>
						</div>
						<div className={`${styles.flexItemTwo}`}>
							<p className={`${styles.label} text_reg color_dark_gray`}>
								{bannerDescription}
							</p>
							<div className={`${styles.bookBtn} pt_30`}>
								<Button color="primary" variant="filled" shape="rounded">
									Book a Demo
								</Button>
							</div>
						</div>
					</div>
					{/* Banner Image or Video */}
					<div className={`${styles.banner_image} next_image`}>
						{videoSrc ? (
							<video playsInline autoPlay muted loop>
								<source src={videoSrc} type="video/mp4" />
							</video>
						) : (
							<picture>
								<source
									srcSet={desktopImage ? desktopImage : DefaultBanner.src}
									media="(min-width:767px)"
								/>
								<img
									src={mobileImage ? mobileImage : DefaultBannerMob.src}
									alt="Banner Image"
								/>
							</picture>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}

export default InnerBanner;
