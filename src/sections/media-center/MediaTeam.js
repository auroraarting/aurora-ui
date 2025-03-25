// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/media-center/MediaTeam.module.scss";

// IMAGES //
import press_img from "../../../public/img/media-center/press_img.jpg";
import clock from "../../../public/img/icons/clock.svg";
import white_calendar from "../../../public/img/icons/white_calendar.svg";

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
			</div>
		</section>
	);
}
