"use client";
// MODULES //
import { useEffect, useState } from "react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";
import Speedometer from "@/components/Speedometer";

// SECTIONS //

// HOOKS //
import { useIntersectionObserver } from "@/customHooks/useIntersectionObserver";

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/softwares/GloballyBankableInsights.module.scss";

// IMAGES //
import Bg from "/public/img/softwares/bankableInsightsBg.jpg";
import InsightsBg from "/public/img/softwares/insightsBgGradient.png";

// DATA //
const defaultRows = [
	{ title: "Lorem Ipsum", percent: 29 },
	{ title: "Lorem Ipsum", percent: 24 },
	{ title: "Lorem Ipsum", percent: 16 },
	{ title: "Lorem Ipsum", percent: 14 },
	{ title: "Lorem Ipsum", percent: 12 },
	{ title: "Lorem Ipsum", percent: 5 },
];

/** GloballyBankableInsights Section */
export default function GloballyBankableInsights({ data, isMultiple }) {
	if (!data?.title || data?.list?.length === 0) return <></>;

	return (
		<section
			className={`${styles.GloballyBankableInsights}`}
			id="whyAurora"
			data-name="Why Aurora"
		>
			{!isMultiple && <img className={`${styles.bg}`} src={Bg.src} alt="Bg" />}
			<div className="section_spacing">
				<div className="container">
					<div className={`${styles.wrap}`}>
						<div className={`${styles.head} f_r_aj_between pb_20`}>
							<h2 className="text_xl font_primary f_w_s_b color_secondary pb_20">
								{/* Globally bankable <br /> insights */}
								{data?.title}
							</h2>

							<p>
								{/* Trusted by experts, Aurora&apos;s analytics ensure accuracy,
								reliability, and <br /> strategic foresight. Our data helps sector
								leaders confidently navigate <br /> renewable energy transitions. */}
								{data?.description}
							</p>
						</div>

						{!isMultiple && (
							<div className={`${styles.insightWrap} color_white`}>
								<SingleInsight data={data?.list?.[0]} endPoint={data.endPoint} />
							</div>
						)}
						{isMultiple && (
							<div
								className={`${styles.insightWrap} ${styles.insightWrap2} color_white`}
							>
								<MultipleInsights data={data} rows={data.list} />
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}

/** SingleInsight */
const SingleInsight = ({ data, endPoint }) => {
	return (
		<>
			<Speedometer
				value={data?.value || 750}
				endpoint={endPoint || 1000}
				speed={data?.speed || 200}
				startWhenInView
				text={data?.caption}
			/>
			<div className={`${styles.textData}`}>
				<p className={`${styles.insightTitle} text_lg`}>{data?.title}</p>
				<p className={`${styles.insightsDesc}`}>{data?.description}</p>
			</div>
		</>
	);
};

/** MultipleInsights  */
const MultipleInsights = ({
	start = 0,
	end = 29,
	rows = defaultRows,
	data,
}) => {
	const { ref, isIntersecting } = useIntersectionObserver({
		threshold: 0.5, // 50% visibility triggers intersection
	});
	const [list, setList] = useState([]);
	const hightestValue = rows.reduce(
		(max, row) => (row.value > max.value ? row : max),
		rows[0]
	)?.value;

	/** calculateRelativePercentage  */
	function calculateRelativePercentage(start, end, percent) {
		return parseFloat((((percent - start) / (end - start)) * 100).toFixed(2));
	}

	useEffect(() => {
		const temp = rows.map((item) => {
			const percentage = calculateRelativePercentage(
				start,
				hightestValue,
				item.value
			);
			return { ...item, percentage: percentage };
		});
		setList(temp);
	}, []);

	return (
		<>
			<div className={`${styles.multipleSectionhead}`}>
				<p className={`${styles.headText} text_lg f_w_s_b`}>
					Energy by the numbers
				</p>
				<p className={`${styles.headSubText}`}>
					Explore how resources are driving diverse energy technologies:
				</p>
			</div>
			<div className={`${styles.fromTo}`}>
				<div className={`${styles.tab} text_xs f_w_s_b `}>{data.startText}</div>
				<div className={`${styles.line}`}></div>
				<div className={`${styles.tab} text_xs f_w_s_b`}>{data.endText}</div>
			</div>
			<img
				className={`${styles.bgGradient}`}
				src={InsightsBg.src}
				alt="InsightsBg"
			/>
			<div className={`${styles.graphWrap} m_t_30`} ref={ref}>
				{list?.map((item, ind) => {
					return (
						<div
							style={{ width: `${isIntersecting ? item.percentage : 0}%` }}
							className={`${styles.row} text_xs f_w_s_b text_uppercase`}
							key={item.title || ind} // Use index only if title is not unique
						>
							<span className={`${styles.text} `}>{item.title}</span>
							<span className={`${styles.value} text_xl`}>{item.value}%</span>
						</div>
					);
				})}
			</div>
		</>
	);
};
