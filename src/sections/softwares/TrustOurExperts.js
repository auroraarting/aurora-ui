// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/softwares/TrustOurExperts.module.scss";

// IMAGES //
import onbording from "../../../public/img/softwares/onbording.svg";
import thematic from "../../../public/img/softwares/thematic.svg";
import experts from "../../../public/img/softwares/experts.svg";
import community from "../../../public/img/softwares/community.svg";

// DATA //

/** TrustOurExperts Section */
export default function TrustOurExperts() {
	return (
		<section className={`${styles.TrustOurExperts}`}>
			<div className="container">
				<h2 className="text_xl font_primary f_w_s_b color_secondary">
					Trust our experts, <br className="hidden_xs" />
					available to support you
				</h2>
				<div className={`${styles.trustOurBox} pt_40`}>
					<div className={`${styles.trustOurItemOne}`}>
						<img src={onbording.src} alt="icon" />
						<h5 className="text_reg font_primary f_w_m color_secondary pt_20 pb_10">
							Onboarding sessions
						</h5>
						<p className="text_xs color_dark_gray">
							Receive onboarding sessions tailored to your use case
						</p>
					</div>
					<div className={`${styles.trustOurItemOne}`}>
						<img src={thematic.src} alt="icon" />
						<h5 className="text_reg font_primary f_w_m color_secondary pt_20 pb_10">
							Thematic insights
						</h5>
						<p className="text_xs color_dark_gray">
							Benefit from thematic deep dives and new feature trainings
						</p>
					</div>
					<div className={`${styles.trustOurItemOne}`}>
						<img src={experts.src} alt="icon" />
						<h5 className="text_reg font_primary f_w_m color_secondary pt_20 pb_10">
							Expert valuation
						</h5>
						<p className="text_xs color_dark_gray">
							Review your valuations with our Chronos experts
						</p>
					</div>
					<div className={`${styles.trustOurItemOne}`}>
						<img src={community.src} alt="icon" />
						<h5 className="text_reg font_primary f_w_m color_secondary pt_20 pb_10">
							Community events
						</h5>
						<p className="text_xs color_dark_gray">
							Join online and offline community events
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
