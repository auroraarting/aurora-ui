// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/company/media-center/InsideMediaContact.module.scss";

// IMAGES //
import mail from "@/../public/img/icons/mail.svg";
import tel_icon from "@/../public/img/icons/tel_icon.svg";

// DATA //

/** InsideMediaContact Section */
export default function InsideMediaContact() {
	return (
		<div className={`${styles.mediaTeamBoxItem}`}>
			<h3 className="text_md color_white f_w_s_b font_primary pb_30">
				Media Contact
			</h3>
			<h4 className="text_reg color_white f_w_m font_primary ">Gonzalo Montes</h4>
			<p className="text_xs color_platinum_gray pb_20">Press Officer</p>
			<p className={`${styles.labelTxt} text_reg color_white f_r_a_center pb_10`}>
				<img src={mail.src} alt="icon" />
				<a href="mailTo:zinovia.fragkiadaki@auroraer.com">
					zinovia.fragkiadaki@auroraer.com
				</a>
			</p>
			<p className={`${styles.labelTxt} text_reg color_white f_r_a_center`}>
				<img src={tel_icon.src} alt="icon" />
				<a href="tel:+44 (0) 7747 219 913">+44 (0) 7747 219 913</a>
			</p>
		</div>
	);
}
