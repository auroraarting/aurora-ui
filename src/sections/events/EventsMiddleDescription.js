/* eslint-disable indent */
/* eslint-disable react/jsx-key */
"use client";
// MODULES //
import { useState, useEffect } from "react";

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
import parse from "html-react-parser";

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
import Speakers from "./Speakers";
import Sponsors from "./Sponsors";
import { slugify } from "@/utils";
import EventsLocation from "./EventsLocation";
import EventsGallery from "./EventsGallery";
import EventInsideVideo from "./EventInsideVideo";

// DATA //

/** EventsMiddleDescription Section */
export default function EventsMiddleDescription({ data }) {
	const sectionsKeys = data?.events?.sectionOrders
		? Object?.entries(data?.events?.sectionOrders).sort(
				([, a], [, b]) => (a ?? 9999) - (b ?? 9999),
			)
		: [];

	console.log(data?.events?.promotionalBanner, "sectionsKeys");

	return (
		<div className={`${styles.eventsMiddleDescription} `}>
			{data?.content && (
				<section
					className={`${styles.contentBox} pb_60`}
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

			{/*<div className={`${styles.modal_content_wrap}`}>
				<Modal
					id={"demo"}
					open={
						data.events?.landingPopup?.text || data.events?.landingPopup?.banner
							? true
							: false
					}
				>
					{data.events?.landingPopup?.banner?.node?.mediaItemUrl && (
						<picture>
							<source
								srcSet={data.events?.landingPopup?.banner?.node?.mediaItemUrl}
								alt="Promotional Banner"
								media="(min-width:767px)"
							/>
							<img
								src={data.events?.landingPopup?.bannerMobile?.node?.mediaItemUrl}
								alt="Promotional Banner"
								className={`${styles.vimeoBanner}`}
							/>
						</picture>
					)}
					{data.events?.landingPopup?.text && (
						<div className={`${styles.modal_content}`}>
							<p className="color_white">{data.events?.landingPopup?.text}</p>
						</div>
					)}
				</Modal>
			</div>
			<div className="">
				{sectionsKeys?.map(([key, value]) => {
					if (key === "speakers") {
						return (
							data?.events?.speakers?.speakers && (
								<div className="pb_60">
									<Speakers
										iseventInside={true}
										data={data?.events?.speakers?.speakers}
										title={data?.events?.speakers?.sectionTitle}
										desc={data?.events?.speakers?.sectionDesc}
									/>
								</div>
							)
						);
					} else if (key === "sections") {
						return (
							<>
								{data?.events?.sections?.map((item) => {
									return (
										<section
											key={item?.sectionTitle}
											id={slugify(item?.sectionTitle)}
											data-name={item?.sectionTitle}
											className={`pb_60 ${styles.contentBox} contentBox`}
										>
											{parse(item?.content || "")}
										</section>
									);
								})}
							</>
						);
					} else if (key === "sponsors") {
						return <Sponsors key={key} data={data} />;
					} else if (key === "thumbnail") {
						return (
							data?.events?.thumbnail?.status === "Upcoming" && (
								<EventsLocation data={data} />
							)
						);
					} else if (key === "glimps") {
						return (
							<div className="pb_60">
								{data?.events?.glimps?.gallery?.nodes && (
									<div className="">
										<EventsGallery data={data} />
									</div>
								)}
								{data?.events?.glimps?.video && (
									<div className="">
										<EventInsideVideo data={data} />
									</div>
								)}
							</div>
						);
					} else if (key === "promotionalbanner") {
						return (
							data?.events?.promotionalBanner?.length > 0 && (
								<div className={`${styles.promotionalBanner} pb_60`}>
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
															<picture>
																<source
																	srcSet={item?.banner?.node?.mediaItemUrl}
																	alt="Promotional Banner"
																	media="(min-width:767px)"
																/>
																<img
																	src={item?.bannerMobile?.node?.mediaItemUrl}
																	alt="Promotional Banner"
																	className={`${styles.vimeoBanner}`}
																/>
															</picture>
														</a>
													)}
													{item?.text && <p className={`${styles.title}`}>{item?.text}</p>}
												</SwiperSlide>
											);
										})}
									</Swiper>
								</div>
							)
						);
					} else if (key === "overview") {
						return (
							data?.content && (
								<section
									className={`${styles.contentBox} pb_60`}
									id="overview"
									data-name="Overview"
								>
									<ContentFromCms>{data?.content}</ContentFromCms>
								</section>
							)
						);
					} else if (key === "whyattend") {
						return (
							data?.events?.whyAttend?.agenda && (
								<WhyAttend data={data?.events?.whyAttend} />
							)
						);
					} else if (key === "hightlights") {
						return (
							data?.events?.hightlights?.hightlights && (
								<Hightlights data={data?.events?.hightlights} />
							)
						);
					}
				})}
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
			{data?.events?.speakers?.speakers && (
				<div className="pb_40 pt_60">
					<Speakers
						data={data?.events?.speakers?.speakers}
						title={data?.events?.speakers?.sectionTitle}
						desc={data?.events?.speakers?.sectionDesc}
					/>
				</div>
			)}
			<Sponsors data={data} />
			{data?.events?.sections?.map((item) => {
				if (!item?.content) {
					return <></>;
				}
				return (
					<section
						key={item?.sectionTitle}
						id={slugify(item?.sectionTitle)}
						data-name={item?.sectionTitle}
						className={`pt_50 ${styles.contentBox} contentBox`}
					>
						{parse(item?.content)}
					</section>
				);
			})}
			{data?.events?.thumbnail?.status === "Upcoming" && (
				<EventsLocation data={data} />
			)}
			{data?.events?.glimps?.gallery?.nodes && (
				<div className="">
					<EventsGallery data={data} />
				</div>
			)}
			{data?.events?.glimps?.video && (
				<div className="">
					<EventInsideVideo data={data} />
				</div>
			)} */}
		</div>
	);
}

/** Hightlights  */
const Hightlights = ({ data }) => {
	return (
		<section className="pb_60" id="hightlights" data-name="Hightlights">
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
		<section id="agenda" data-name="Agenda" className="pb_60">
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
								{item?.description && (
									<p
										className={`${styles.description} text_xs f_w_m color_silver_gray font_primary`}
									>
										{parse(item?.description)}
									</p>
								)}
								<div className={`${styles.dateFlex} f_r_a_center pt_10`}>
									{item?.address && (
										<p className="text_xs f_w_m color_silver_gray text_uppercase f_r_a_center">
											<img
												src={location.src}
												className={`${styles.location}`}
												alt="clock"
											/>
											<span>{item?.address}</span>
										</p>
									)}
									{item?.timeSlot && (
										<p className="text_xs f_w_m color_silver_gray  f_r_a_center">
											<img src={clock.src} className={`${styles.clock}`} alt="location" />
											<span>{item?.timeSlot}</span>
										</p>
									)}
								</div>
								<div className={`${styles.ClientInfo}`}>
									{item?.speaker?.nodes?.map((item2) => {
										return (
											<div
												className={`${styles.ClientFlex} f_r_a_center`}
												key={item2?.title}
											>
												{item2?.postSpeakers?.thumbnail?.image?.node?.mediaItemUrl && (
													<div className={`${styles.ClientLogo}`}>
														<img
															src={item2?.postSpeakers?.thumbnail?.image?.node?.mediaItemUrl}
															alt="pic"
														/>
													</div>
												)}
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
