// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/resources/case-studies/Client.module.scss";

// IMAGES //
import client_logo from "@/../public/img/resources/aurora_insights/client_logo.svg";
import author_logo from "@/../public/img/resources/aurora_insights/author_logo.png";
import social_icon from "@/../public/img/resources/aurora_insights/social_icon.svg";
import origin from "@/../public/img/resources/aurora_insights/origin.png";

// DATA //

/** Client Section */
export default function Client() {
	return (
		<div className={`${styles.ClientBox}`}>
			<div className={`${styles.whiteBox}`}>
				<div className={`${styles.itemBox}`}>
					<h5 className="text_reg color_gray f_w_b pb_10">Client</h5>
					<div className={`${styles.ClientFlex} f_r_a_center`}>
						<div className={`${styles.ClientLogo}`}>
							<img src={client_logo.src} alt="logo" />
						</div>
						<div className={`${styles.ClientDescription}`}>
							<p className="text_xs font_primary">
								Lorem ipsum dolor sit amet consectetur. Mattis id sagittis
							</p>
						</div>
					</div>
				</div>
				<div className={`${styles.itemBox}`}>
					<h5 className="text_reg color_gray f_w_b pb_10">Author</h5>
					<div className={`${styles.ClientFlex} f_r_a_center`}>
						<div className={`${styles.ClientLogo}`}>
							<img src={author_logo.src} alt="pic" />
						</div>
						<div className={`${styles.ClientDescription}`}>
							<h5 className="text_reg font_primary color_gray f_w_m font_primary">
								John Feddersen
							</h5>
							<p className="text_xs f_w_l">Founder and CEO</p>
							<div className={`${styles.social}`}>
								<img src={social_icon.src} alt="pic" />
							</div>
						</div>
					</div>
				</div>
				<div className={`${styles.itemBox}`}>
					<h5 className="text_reg color_gray f_w_b pb_10">Powered by</h5>
					<div className={`${styles.ClientFlex}`}>
						<img src={origin.src} alt="origin" />
					</div>
				</div>
			</div>
		</div>
	);
}
