// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/home/HomeBanner.module.scss";

// IMAGES //
import bannerGraph from "../../../public/img/home/banner-graph.png";

// DATA //

/** HomeBanner Section */
export default function HomeBanner() {
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
							<div className={`${styles.bookBtnOne} pt_40`}>
								<Button color="primary" variant="filled" shape="rounded" mode="dark">
									Book a Demo
								</Button>
							</div>
						</div>
						<div className={`${styles.BannerImg}`}>
							<img
								src={bannerGraph.src}
								className={`${styles.BannerGraph} width_100`}
								alt="Banner Graph"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
