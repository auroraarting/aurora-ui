// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/company/press-releases/MediaKitInfo.module.scss";

// IMAGES //
import Aurora_Logo from "@/../public/img/media-center/Aurora_Logo.png";
import white_down_arrow from "@/../public/img/icons/white_down_arrow.svg";

// DATA //

/** MediaKitInfo Section */
export default function MediaKitInfo({ data }) {
	return (
		<section className={`${styles.MediaKitInfo}`}>
			<div className="container">
				<div className={`${styles.InfoBoxFlex} f_w_j`}>
					<div className={`${styles.infoContent}`}>
						<h2 className="text_xl color_secondary pb_20">{data?.mediaKit?.title}</h2>
						<p className="text_reg color_dark_gray">{data?.mediaKit?.desc}</p>
						<div className={`${styles.downloadBtn} pt_30`}>
							{data?.mediaKit?.logos?.node?.mediaItemUrl && (
								<a href={data?.mediaKit?.logos?.node?.mediaItemUrl} className="d_f">
									<img src={white_down_arrow.src} alt="icon" />
									Download Logos
								</a>
							)}
							{data?.mediaKit?.brief?.node?.mediaItemUrl && (
								<a href={data?.mediaKit?.brief?.node?.mediaItemUrl} className="d_f">
									<img src={white_down_arrow.src} alt="icon" />
									Media brief (PDF)
								</a>
							)}
						</div>
					</div>
					<div className={`${styles.infoLogo}`}>
						<div className={`${styles.whiteBox}`}>
							<img
								src={data?.mediaKit?.thumbnail?.node?.mediaItemUrl || Aurora_Logo.src}
								alt="logo"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
