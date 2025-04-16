// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/softwares/Redefining.module.scss";

// IMAGES //
import redefining from "../../../public/img/softwares/redefining.png";
import ContentFromCms from "@/components/ContentFromCms";

// DATA //

/** redefining Section */
export default function Redefining({ title, description, image }) {
	return (
		<section className={`${styles.redefining}`} id="expertise">
			<div className="container">
				<div className={`${styles.flexBox} f_r_aj_between`}>
					<div className={`${styles.flexItemOne}`}>
						<h2 className="text_xxl font_primary f_w_s_b color_secondary pb_20">
							{title && <ContentFromCms>{title}</ContentFromCms>}
							{/* Redefining <span className="color_sky_blue">battery evaluation</span> */}
						</h2>
						{description && <p className="text_reg color_dark_gray">{description}</p>}
					</div>
					<div className={`${styles.flexItemTwo}`}>
						{image && (
							<img src={image} className={`${styles.redefining}`} alt="redefining" />
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
