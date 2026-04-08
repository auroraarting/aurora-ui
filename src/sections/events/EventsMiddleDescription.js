/* eslint-disable react/jsx-key */
"use client";
// MODULES //
import { useState } from "react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";
import ContentFromCms from "@/components/ContentFromCms";

// SECTIONS //

// PLUGINS //
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

// UTILS //

// STYLES //
import styles from "@/styles/sections/events/EventsMiddleDescription.module.scss";

// IMAGES //
import plant_img from "/public/img/resources/aurora_insights/plant_img.jpg";
import graph_img from "/public/img/resources/aurora_insights/graph_img.png";
import popup_close from "/public/img/icons/popup_close.svg";
import location from "/public/img/icons/location.svg";
import clock from "/public/img/icons/clock.svg";
import Image from "next/image";
import Modal, { openModal } from "@/components/Modal";

// DATA //

/** EventsMiddleDescription Section */
export default function EventsMiddleDescription({ data }) {
	console.log(data, "data in middle description");
	return (
		<div
			className={`${styles.eventsMiddleDescription} `}
			onClick={() => openModal("demo")}
		>
			<div className={`${styles.modal_content_wrap}`}>
				<Modal
					id={"demo"}
					open={
						data.events?.landingPopup?.text || data.events?.landingPopup?.banner
							? true
							: false
					}
				>
					{data.events?.landingPopup?.banner?.node?.mediaItemUrl && (
						<img src={data.events?.landingPopup?.banner?.node?.mediaItemUrl} />
					)}
					{data.events?.landingPopup?.text && (
						<div className={`${styles.modal_content}`}>
							<p className="color_white">{data.events?.landingPopup?.text}</p>
						</div>
					)}
				</Modal>
			</div>
			{data?.events?.promotionalBanner?.length > 0 && (
				<div className={`${styles.promotionalBanner} `}>
					<Swiper
						modules={[Autoplay]}
						slidesPerView={1}
						slidesPerGroup={1}
						spaceBetween={50}
						grabCursor={true}
						speed={500}
						autoplay={{
							delay: 3000,
							disableOnInteraction: false,
						}}
						className={`${styles.slider} custom-swiper`}
					>
						{data?.events?.promotionalBanner?.map((item, ind) => {
							return (
								<SwiperSlide key={ind}>
									{item?.banner?.node?.mediaItemUrl && (
										<a href={item?.url || "/"} className={`${styles.itemBox}`}>
											<img
												src={item?.banner?.node?.mediaItemUrl}
												alt="Promotional Banner"
											/>
										</a>
									)}
									{item?.text && <p className={`${styles.title}`}>{item?.text}</p>}
								</SwiperSlide>
							);
						})}
					</Swiper>
				</div>
			)}
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
		</div>
	);
}

/** Hightlights  */
const Hightlights = ({ data }) => {
	return (
		<section className="pt_50" id="hightlights" data-name="Hightlights">
			<div className={`${styles.contentBox}`}>
				<h2>Hightlights</h2>
				<ul>
					{data?.hightlights?.map((item, ind) => {
						return <li key={(item?.text || "") + ind}>{item?.text}</li>;
					})}
				</ul>
			</div>
		</section>
	);
};

/** WhyAttend  */
const WhyAttend = ({ data }) => {
	const [open, setOpen] = useState(false);
	return (
		<section id="agenda" data-name="Agenda" className=" pt_20">
			<div className={`${styles.contentBox}`}>
				<h2>{data?.sectionTitle || "Why attend?"}</h2>
				{data?.desc && <ContentFromCms>{data?.desc}</ContentFromCms>}
				<div
					className={`${styles.btn_box} agenda_btn pt_0`}
					onClick={() => setOpen(!open)}
				>
					<Button color="primary" variant="filled" shape="rounded">
						View full agenda
					</Button>
				</div>
			</div>
			<div
				className={`${styles.agendaPopup} ${open && styles.open}`}
				data-lenis-prevent
			>
				<div className={`${styles.content}`}>
					{/* <div className={`${styles.CloseWrap}`}>

					</div> */}
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
										<img
											src={location.src}
											className={`${styles.location}`}
											alt="clock"
										/>
										<span>{item?.address}</span>
									</p>
									<p className="text_xs f_w_m color_silver_gray  f_r_a_center">
										<img src={clock.src} className={`${styles.clock}`} alt="location" />
										<span>{item?.timeSlot}</span>
									</p>
								</div>
								<div className={`${styles.ClientInfo}`}>
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
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
