// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/company/media-center/MediaAbout.module.scss";

// IMAGES //
import mail from "@/../public/img/icons/mail.svg";
import tel_icon from "@/../public/img/icons/tel_icon.svg";

// DATA //

/** MediaAbout Section */
export default function MediaAbout() {
	return (
		<div className={`${styles.infoContent}`}>
			<h2 className="text_lg color_secondary pb_20">
				ABOUT AURORA ENERGY RESEARCH
			</h2>
			<p className="text_reg color_dark_gray">
				Established in 2013, Aurora Energy Research is a leading global provider of
				power market forecasting and analytics for critical investment and financing
				decisions. Headquartered in Oxford, we operate out of 15 offices worldwide
				covering Europe, North & South America, Asia, and Australia. Our
				comprehensive services include market outlook packages for energy industry
				participants, advisory support, and innovative software solutions. We foster
				diversity with a team of over 900 experts with backgrounds in energy,
				finance, and consulting, offering unparalleled expertise across power,
				renewables, storage, hydrogen, carbon, and fossil commodities. Our mission
				is to ease the global energy transition through widely trusted quantitative
				analysis and high-quality decision support.
			</p>
		</div>
	);
}
