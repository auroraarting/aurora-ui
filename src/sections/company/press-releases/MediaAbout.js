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
	return (
		<div className={`${styles.infoContent}`}>
			<h2 className="text_lg color_secondary pb_20">
				{data?.postFields?.about?.sectionTitle}
			</h2>
			<div className="text_reg color_dark_gray">
				<ContentFromCms>{data?.postFields?.about?.content}</ContentFromCms>
			</div>
		</div>
	);
}
