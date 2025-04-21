// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/company/media-center/MediaTeam.module.scss";

// IMAGES //
import mail from "@/../public/img/icons/mail.svg";
import tel_icon from "@/../public/img/icons/tel_icon.svg";

// DATA //

/** MediaTeam Section */
export default function MediaTeam() {
	return (
		<section className={`${styles.MediaTeam}`}>
			<div className="container">
				<div className={`${styles.titleWrapper}`}>
					<h2 className="text_xl font_primary f_w_m color_white pb_10">
						Media Team
					</h2>
					<p className={`${styles.label} text_reg color_silver_gray`}>
						Ut elit in diam ut a mattis. Aliquam faucibus bibendum bibendum purus a
						commodo diam tortor acellentesque in consectetur lobortis viverra
					</p>
				</div>
				<div className={`${styles.mediaTeamBox} pt_40`}>
					<div className={`${styles.mediaTeamBoxItem}`}>
						<h3 className="text_md color_white f_w_s_b font_primary pb_30">EMEA</h3>
						<h4 className="text_reg color_white f_w_m font_primary ">
							Zina Fragkiadaki
						</h4>
						<p className="text_xs color_platinum_gray pb_20">Press Officer</p>
						<p
							className={`${styles.labelTxt} text_reg color_white f_r_a_center pb_10`}
						>
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
					<div className={`${styles.mediaTeamBoxItem}`}>
						<h3 className="text_md color_white f_w_s_b font_primary pb_30">
							Iberia, France & Italy
						</h3>
						<h4 className="text_reg color_white f_w_m font_primary ">
							Zina Fragkiadaki
						</h4>
						<p className="text_xs color_platinum_gray pb_20">Press Officer</p>
						<p
							className={`${styles.labelTxt} text_reg color_white f_r_a_center pb_10`}
						>
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
					<div className={`${styles.mediaTeamBoxItem}`}>
						<h3 className="text_md color_white f_w_s_b font_primary pb_30">
							Germany
						</h3>
						<h4 className="text_reg color_white f_w_m font_primary ">
							Zina Fragkiadaki
						</h4>
						<p className="text_xs color_platinum_gray pb_20">Press Officer</p>
						<p
							className={`${styles.labelTxt} text_reg color_white f_r_a_center pb_10`}
						>
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
					<div className={`${styles.mediaTeamBoxItem}`}>
						<h3 className="text_md color_white f_w_s_b font_primary pb_30">Noram</h3>
						<h4 className="text_reg color_white f_w_m font_primary ">
							Zina Fragkiadaki
						</h4>
						<p className="text_xs color_platinum_gray pb_20">Press Officer</p>
						<p
							className={`${styles.labelTxt} text_reg color_white f_r_a_center pb_10`}
						>
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
				</div>
			</div>
		</section>
	);
}
