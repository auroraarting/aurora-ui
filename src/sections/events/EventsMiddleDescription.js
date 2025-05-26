"use client";
// MODULES //
import { useState } from "react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";
import ContentFromCms from "@/components/ContentFromCms";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/events/EventsMiddleDescription.module.scss";

// IMAGES //
import plant_img from "/public/img/resources/aurora_insights/plant_img.jpg";
import graph_img from "/public/img/resources/aurora_insights/graph_img.png";
import popup_close from "/public/img/icons/popup_close.svg";
import location from "/public/img/icons/location.svg";
import clock from "/public/img/icons/clock.svg";

// DATA //

/** EventsMiddleDescription Section */
export default function EventsMiddleDescription({ data }) {
	return (
		<>
			{data?.content && (
				<section
					className={`${styles.contentBox}`}
					id="overview"
					data-name="Overview"
				>
					<ContentFromCms>{data?.content}</ContentFromCms>
				</section>
			)}
			{data?.events?.whyAttend?.agenda && (
				<WhyAttend data={data?.events?.whyAttend} />
			)}
			{data?.events?.hightlights?.hightlights && (
				<Hightlights data={data?.events?.hightlights} />
			)}
		</>
	);
}

/** Hightlights  */
const Hightlights = ({ data }) => {
	return (
		<section id="hightlights" data-name="Hightlights">
			<h2>Hightlights</h2>
			<ul>
				{data?.hightlights?.map((item, ind) => {
					return <li key={(item?.text || "") + ind}>{item?.text}</li>;
				})}
			</ul>
		</section>
	);
};

/** WhyAttend  */
const WhyAttend = ({ data }) => {
	const [open, setOpen] = useState(false);
	return (
		<section id="agenda" data-name="Agenda" className="pb_50">
			<h2>Why attend?</h2>
			{data?.desc && <ContentFromCms>{data?.desc}</ContentFromCms>}
			<div className={styles.btn_box} onClick={() => setOpen(!open)}>
				<Button color="secondary" variant="filled" shape="rounded">
					View Full Agenda
				</Button>
			</div>
			<div className={`${styles.agendaPopup} ${open && styles.open}`}>
				<div className={`${styles.content}`}>
					<img
						className={`${styles.close}`}
						src={popup_close.src}
						alt="close"
						onClick={() => setOpen(!open)}
					/>
					<p className={`${styles.title} color_white f_w_s_b text_xl`}>Agenda</p>
					{data?.agenda?.map((item, index) => (
						<div className={`${styles.sessionBox} f_w`} key={index}>
							<div className={`${styles.sessionTime}`}>
								<p
									className={`${styles.tag} text_xxs font_primary text_uppercase color_white`}
								>
									{item?.time}
								</p>
							</div>
							<div className={`${styles.sessionDescription}`}>
								<h4 className="text_xs font_primary color_white f_w_s_b">
									{item?.title}
								</h4>
								<div className={`${styles.dateFlex} f_r_a_center pt_10`}>
									<p className="text_xs f_w_m color_silver_gray text_uppercase f_r_a_center">
										<img src={clock.src} className={`${styles.clock}`} alt="clock" />
										<span>{item?.address}</span>
									</p>
									<p className="text_xs f_w_m color_silver_gray  f_r_a_center">
										<img
											src={location.src}
											className={`${styles.location}`}
											alt="location"
										/>
										<span>{item?.timeSlot}</span>
									</p>
								</div>
								{item?.speaker?.nodes?.map((item2) => {
									return (
										<div
											className={`${styles.ClientFlex} f_r_a_center`}
											key={item2?.title}
										>
											<div className={`${styles.ClientLogo}`}>
												<img
													src={item2?.postSpeakers?.thumbnail?.image?.node?.mediaItemUrl}
													alt="pic"
												/>
											</div>
											<div className={`${styles.ClientDescription}`}>
												<h5 className="text_xs font_primary color_white f_w_m">
													{item2?.title}
												</h5>
												<p className="text_xxs color_silver_gray f_w_l">
													{item2?.postSpeakers?.thumbnail?.designation}
												</p>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
