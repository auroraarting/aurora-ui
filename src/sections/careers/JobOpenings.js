// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

// UTILS //

// STYLES //
import styles from "@/styles/sections/careers/JobOpenings.module.scss";

// IMAGES //

// DATA //

/** JobOpenings Section */
export default function JobOpenings() {
	return (
		<section className={`${styles.JobOpenings} dark_bg ptb_100`}>
			<div className="container">
				<div className={`${styles.title_wrap} f_r_aj_between`}>
					<h2 className="text_xl font_primary f_w_s_b color_white pb_20">
						Job Openings
					</h2>
					<div className={`${styles.bookBtn}`}>
						<Button color="primary" variant="filled" shape="rounded" mode="dark">
							Join Us
						</Button>
					</div>
				</div>
				<div className={`${styles.tableBox}`}>
					<table>
						<tr>
							<td className="text_md font_primary color_white f_w_m">
								Senior Associate
							</td>
							<td className="text_reg color_platinum_gray">Singapore</td>
							<td className="text_reg color_platinum_gray">Advisory</td>
							<td className="text_reg color_platinum_gray">Permanent - Full Time</td>
						</tr>
						<tr>
							<td className="text_md font_primary color_white f_w_m">
								(Senior) Commercial Associate <br />
								(Power & Renewables)
							</td>
							<td className="text_reg color_platinum_gray">Gurugram, India</td>
							<td className="text_reg color_platinum_gray">
								Commercial - Sales & <br />
								Account Management
							</td>
							<td className="text_reg color_platinum_gray">Permanent - Full Time</td>
						</tr>
						<tr>
							<td className="text_md font_primary color_white f_w_m">
								Senior Associate
							</td>
							<td className="text_reg color_platinum_gray">Singapore</td>
							<td className="text_reg color_platinum_gray">Advisory</td>
							<td className="text_reg color_platinum_gray">Permanent - Full Time</td>
						</tr>
						<tr>
							<td className="text_md font_primary color_white f_w_m">
								Senior Research Analyst
							</td>
							<td className="text_reg color_platinum_gray">Singapore</td>
							<td className="text_reg color_platinum_gray">Advisory</td>
							<td className="text_reg color_platinum_gray">Permanent - Full Time</td>
						</tr>
					</table>
				</div>
			</div>
		</section>
	);
}
