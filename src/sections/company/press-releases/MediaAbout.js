// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";
import ContentFromCms from "@/components/ContentFromCms";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/company/press-releases/MediaAbout.module.scss";

// IMAGES //
import mail from "@/../public/img/icons/mail.svg";
import tel_icon from "@/../public/img/icons/tel_icon.svg";

// DATA //

/** MediaAbout Section */
export default function MediaAbout({ data }) {
	// if (!data?.postFields?.about?.sectionTitle && !data?.title) {
	if (!data?.title) {
		return null;
	}
	return (
		<div className={`${styles.infoContent}`}>
			<h2 className="text_lg color_secondary pb_20">
				{/* { data?.postFields?.about?.sectionTitle || data?.title} */}
				{data?.title}
				{/* ABOUT AURORA ENERGY RESEARCH */}
			</h2>
			<div className="text_reg color_dark_gray">
				<ContentFromCms>
					{/* {data?.postFields?.about?.content || data?.content} */}
					{data?.content}
					{/* {
						"<p>Established in 2013, Aurora Energy Research is a leading global provider of power market forecasting and analytics for critical investment and financing decisions. Headquartered in Oxford, England, we operate out of 16 offices worldwide covering Europe, North &amp; South America, Asia, and Australia.</p> <p>Our comprehensive services include market outlook packages for energy industry participants, advisory support, and innovative software solutions. We foster diversity with a team of close to 1000 experts with backgrounds in energy, finance, and consulting, offering unparalleled expertise across power, renewables, storage, hydrogen, carbon, and fossil commodities. Our mission is to facilitate the global energy transition through widely trusted quantitative analysis and high-quality decision support.</p>"
					} */}
				</ContentFromCms>
			</div>
		</div>
	);
}
