// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/company/press-releases/TopMedia.module.scss";

// IMAGES //
import press_img from "@/../public/img/media-center/press_img.jpg";
import clock from "@/../public/img/icons/clock.svg";
import white_calendar from "@/../public/img/icons/white_calendar.svg";
import formatDate from "@/utils";

// DATA //

/** TopMedia Section */
export default function TopMedia({ data }) {
	return (
		<section className={`${styles.TopMedia}`}>
			<div className="container">
				<div className={`${styles.card} f_w_j`}>
					<a
						href={`/company/press-releases/${data?.slug}`}
						className={`${styles.content}`}
					>
						<div
							className={`${styles.categoryTxt} text_xs font_primary text_uppercase color_medium_gray`}
						>
							Press Release
						</div>
						<h2 className="text_lg color_white text_uppercase f_w_m pt_20">
							{data?.title}
						</h2>
						<div className={`${styles.dateFlex} f_r_a_center pt_10`}>
							{data?.date && (
								<p className="text_xs f_w_m color_medium_gray text_uppercase f_r_a_center">
									<img
										src={white_calendar.src}
										className={`${styles.calender}`}
										alt="calender"
									/>
									<span>{formatDate(data?.date)}</span>
								</p>
							)}
							{data?.postFields?.time && (
								<p className="text_xs f_w_m color_medium_gray text_uppercase f_r_a_center">
									<img src={clock.src} className={`${styles.location}`} alt="location" />
									<span>{data?.postFields?.time}</span>
								</p>
							)}
						</div>
					</a>
					{data?.featuredImage?.node?.mediaItemUrl && (
						<div className={`${styles.imageWrapper}`}>
							<img
								src={data?.featuredImage?.node?.mediaItemUrl}
								className="width_100 b_r_20"
								alt="img"
							/>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
