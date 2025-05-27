// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";
import ContentFromCms from "@/components/ContentFromCms";

// SECTIONS //

// PLUGINS //

// UTILS //
import formatDate, {
	allCategories,
	formatTitleForEpisode,
	isCategory,
} from "@/utils";

// STYLES //
import styles from "@/styles/sections/resources/energy-talks/TopEnergy.module.scss";

// IMAGES //
import energy_logo from "/public/img/energy_talks/energy_logo.jpg";
import location from "/public/img/icons/location.svg";
import calender from "/public/img/icons/calender.svg";
import black_clock from "/public/img/icons/black_clock.svg";

// DATA //

/** TopEnergy Section */
export default function TopEnergy({ data }) {
	if (!data) return <></>;
	return (
		<section className={`${styles.TopEnergy}`}>
			<div className="container">
				<a
					href={`/resources/energy-talks/${data?.slug}`}
					className={`${styles.card} f_w_j`}
				>
					<div className={`${styles.content}`}>
						<div
							className={`${styles.tag} text_xxs font_primary text_uppercase color_white`}
						>
							Latest Podcast
							{/* {isCategory(allCategories, data?.podcastFields?.country?.nodes || [])} */}
						</div>
						<h2 className="text_lg color_white text_uppercase f_w_m pt_40">
							<ContentFromCms>{formatTitleForEpisode(data?.title)}</ContentFromCms>
						</h2>
						<div className={`${styles.dateFlex} f_r_a_center pt_30`}>
							<p className="text_xs f_w_m color_medium_gray text_uppercase f_r_a_center">
								<img
									src={calender.src}
									className={`${styles.calender}`}
									alt="calender"
								/>
								{/* <span>mar 2025</span> */}
								<span>{formatDate(data?.podcastFields?.date)}</span>
							</p>
							{data?.podcastFields?.time && (
								<p className="text_xs f_w_m color_medium_gray text_uppercase f_r_a_center">
									<img
										src={black_clock.src}
										className={`${styles.calender}`}
										alt="calender"
									/>
									<span>{data?.podcastFields?.time}</span>
								</p>
							)}
							{data?.podcastFields?.country?.nodes.length > 0 && (
								<p className="text_xs f_w_m color_medium_gray text_uppercase f_r_a_center">
									<img
										src={location.src}
										className={`${styles.calender}`}
										alt="calender"
									/>
									<span>
										{data?.podcastFields?.country?.nodes?.map((item) => item?.title)}
										{/* {isCategory(countries, item?.podcastFields?.country?.nodes)} */}
									</span>
								</p>
							)}
						</div>
					</div>
					{data?.featuredImage?.node?.mediaItemUrl && (
						<div className={`${styles.imageWrapper}`}>
							<img
								src={data?.featuredImage?.node?.mediaItemUrl}
								className="width_100 b_r_20"
								alt="Latest Podcast"
							/>
						</div>
					)}
				</a>
			</div>
		</section>
	);
}
