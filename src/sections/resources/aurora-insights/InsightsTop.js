// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //
import formatDate, { allCategories, isCategory } from "@/utils";

// STYLES //
import styles from "@/styles/sections/resources/aurora-insights/InsightsTop.module.scss";

// IMAGES //
import plant_img from "@/../public/img/resources/aurora_insights/plant_img.jpg";
import location from "@/../public/img/icons/location.svg";
import calender from "@/../public/img/icons/calender.svg";
import black_clock from "@/../public/img/icons/black_clock.svg";

// DATA //

/** InsightsTop Section */
export default function InsightsTop({ data }) {
	console.log(data);
	const optionsData = {
		categoryType: [
			{ title: "Articles", alternate: "Commentary" },
			{ title: "Case studies", alternate: "Case studies" },
			{ title: "Market reports", alternate: "Market reports" },
			{ title: "Press Release", alternate: "Press Release" },
			{ title: "Past Webinars", alternate: "Webinar Recording" },
			{ title: "Reports", alternate: "Reports" },
			{ title: "Public", alternate: "Public" },
		],
		countryType: [
			{ title: "India" },
			{ title: "India" },
			{ title: "India" },
			{ title: "India" },
		],
		offeringsType: [
			{ title: "Offerings1" },
			{ title: "Offerings2" },
			{ title: "Offerings3" },
			{ title: "Offerings4" },
		],
		yearsType: Array(new Date().getFullYear() - 2000)
			.fill(null)
			.map((item, ind) => {
				return { title: 2001 + ind };
			})
			.reverse(),
	};
	return (
		<section className={`${styles.InsightsTop}`}>
			<div className="container">
				<a
					href={`/resources/aurora-insights/${data?.slug}`}
					className={`${styles.card} f_w_j`}
				>
					<div className={`${styles.content}`}>
						<div
							className={`${styles.tag} text_xxs font_primary text_uppercase color_white`}
						>
							Latest {isCategory(allCategories, data?.categories?.nodes)}
						</div>
						<h2 className="text_lg color_white text_uppercase f_w_m pt_30">
							{data?.title}
						</h2>
						<div className={`${styles.dateFlex} f_r_a_center pt_10`}>
							<p className="text_xs f_w_m color_medium_gray text_uppercase f_r_a_center">
								<img
									src={calender.src}
									className={`${styles.calender}`}
									alt="calender"
								/>
								{/* <span>mar 2025</span> */}
								<span>{formatDate(data?.date)}</span>
							</p>
							{/* <p className="text_xs f_w_m color_medium_gray text_uppercase f_r_a_center">
								<img
									src={black_clock.src}
									className={`${styles.calender}`}
									alt="calender"
								/>
								<span>28 min 24 sec</span>
							</p> */}
						</div>
					</div>
					<div className={`${styles.imageWrapper}`}>
						<img
							src={data?.featuredImage?.node?.sourceUrl || plant_img.src}
							className="width_100 b_r_20"
							alt="img"
						/>
					</div>
				</a>
			</div>
		</section>
	);
}
