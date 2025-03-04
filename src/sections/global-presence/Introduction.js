// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/global-presence/Introduction.module.scss";

// IMAGES //

// DATA //

/** Introduction Section */
export default function Introduction() {
	return (
		<section className={`${styles.Introduction}`}>
			<div className="container">
				<div className={`${styles.flexBox} f_j ptb_60`}>
					<div className={`${styles.flexItemOne}`}>
						<h1 className="text_xl font_primary f_w_m color_secondary text_uppercase">
							Lorem ipsum dolor sit amet
						</h1>
					</div>
					<div className={`${styles.flexItemTwo}`}>
						<p className={`${styles.label} text_reg color_dark_gray pb_10`}>
							Lorem ipsum dolor sit amet consectetur. Elit massa a ut malesuada.
							Tincidunt pellentesque euismod morbi elit in tempor in. Ut elit in diam
							ut a mattis. Aliquam faucibus bibendum bibendum purus a commodo diam
							tortor ac. Pellentesque in consectetur lobortis viverra integer sed sed.
						</p>
						<p className={`${styles.label} text_reg color_dark_gray`}>
							Lorem ipsum dolor sit amet consectetur. Elit massa a ut malesuada.
							Tincidunt pellentesque euismod morbi elit in tempor in. Ut elit in diam
							ut a mattis.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
