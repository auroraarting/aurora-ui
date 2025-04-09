// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/media-center/MediaKitInfo.module.scss";

// IMAGES //
import Aurora_Logo from "../../../public/img/media-center/Aurora_Logo.png";
import white_down_arrow from "../../../public/img/icons/white_down_arrow.svg";

// DATA //

/** MediaKitInfo Section */
export default function MediaKitInfo() {
	return (
		<section className={`${styles.MediaKitInfo}`}>
			<div className="container">
				<div className={`${styles.InfoBoxFlex} f_w_j`}>
					<div className={`${styles.infoContent}`}>
						<h2 className="text_xl color_secondary pb_10">
							Lorem ipsum dolor sit amet consectetur
						</h2>
						<p className="text_reg color_dark_gray">
							Lorem ipsum dolor sit amet consectetur. Elit massa a ut malesuada.
							Tincidunt pellentesque euismod morbi elit in tempor in. Ut elit in diam
							ut a mattis. Aliquam faucibus bibendum bibendum purus a commodo diam
							tortor ac. Pellentesque in consectetur lobortis viverra integer sed sed.
						</p>
						<div className={`${styles.downloadBtn} pt_30`}>
							<a href="" className="d_f">
								<img src={white_down_arrow.src} alt="icon" />
								Download Logos
							</a>
							<a href="" className="d_f">
								<img src={white_down_arrow.src} alt="icon" />
								Media brief (PDF)
							</a>
						</div>
					</div>
					<div className={`${styles.infoLogo}`}>
						<div className={`${styles.whiteBox}`}>
							<img src={Aurora_Logo.src} alt="logo" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
