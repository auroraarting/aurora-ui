/* eslint-disable @next/next/no-img-element */
// MODULES //
import { useEffect, useState } from "react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";
import AccordianCommon from "@/components/AccordianCommon";

// SECTIONS //

// PLUGINS //
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

// UTILS //

// STYLES //
import styles from "@/styles/components/IntegratedSystem.module.scss";

// IMAGES //
import system_one from "../../public/img/softwares/system_one.jpg";
import turbine_img from "../../public/img/softwares/turbine_img.jpg";
import solar_img from "../../public/img/softwares/solar_img.jpg";
import amun_logo from "../../public/img/softwares/amun_logo.png";
import origin_logo from "../../public/img/softwares/origin_logo.png";
import lumus_logo from "../../public/img/softwares/lumus_logo.png";
import hover_arrow from "../../public/img/softwares/hover_arrow.svg";

// SERVICES //
import { getProducts, getSoftwares } from "@/services/Navigation.service";

// DATA //
const placeholders = [system_one.src, turbine_img.src, solar_img.src];

/** IntegratedSystem Section */
export default function IntegratedSystem({ module = "softwares" }) {
	const [data, setData] = useState();

	/** keyModule  */
	const keyModule = () => {
		if (module === "softwares") {
			return "software";
		}

		return module;
	};

	/** fetchdata  */
	const fetchdata = async () => {
		let count = -1;
		let res;

		if (module === "softwares") {
			res = await getSoftwares();
		} else {
			res = await getProducts();
		}
		let arr = res?.data?.[module]?.nodes?.map((item) => {
			if (count > 2) {
				count = 0;
			} else {
				count = count + 1;
			}
			return { ...item, placeholder: placeholders[count] };
		});
		setData(arr);
	};

	useEffect(() => {
		fetchdata();
	}, []);

	console.log(data, module);

	return (
		<section className={`${styles.IntegratedSystem}`}>
			<div className="container">
				<div className={`${styles.integratedSystemFlex} f_w_j`}>
					<div className={`${styles.title_wrap}`}>
						<h2 className="text_xl font_primary f_w_s_b color_secondary pb_20">
							Integrated system, endless possibilities
						</h2>
						<p className="text_reg color_dark_gray">
							Chronos is just one part of Aurora’s EOS Platform, a software designed to
							tackle every energy challenge. From scenario modelling to bespoke
							advisory services, we’re your partner in progress.
						</p>
						<div className={`${styles.bookBtn} pt_30`}>
							<Button color="secondary" variant="filled" shape="rounded">
								Explore More
							</Button>
						</div>
					</div>
					<div className={`${styles.integratedImgMain}`}>
						<div className={`${styles.integratedImgBox} `}>
							<Swiper
								modules={[Navigation, Pagination, Autoplay]}
								slidesPerView={2}
								spaceBetween={0}
								grabCursor={true}
								speed={500}
								loop={true}
								navigation={{
									prevEl: "#customPrev",
									nextEl: "#customNext",
								}}
								// autoplay={{
								// 	delay: 3000,
								// 	disableOnInteraction: false,
								// }}
								pagination={{
									clickable: true, // Makes it interactive
								}}
								breakpoints={{
									767: {
										slidesPerView: 2,
									},
									768: {
										slidesPerView: 3,
									},
								}}
								className={styles.slider}
							>
								{data?.map((item, ind) => {
									return (
										<SwiperSlide key={ind}>
											<a
												href={`/${keyModule()}/${item?.slug}`}
												className={`${styles.itemBox}`}
											>
												<div className={`${styles.itemBoxWrap}`}>
													<img
														src={item?.[module]?.thumbnail?.banner?.node?.sourceUrl}
														height={215}
														width={277}
														className={`${styles.imgOne} `}
														alt="img"
													/>
												</div>
												<div className={`${styles.itemBoxWrap}`}>
													<div className={`${styles.boxWrap}`}>
														<img
															src={
																item?.[module]?.map?.logo?.node?.sourceUrl || origin_logo.src
															}
															className={`${styles.centerLogo}`}
															alt="img"
														/>
														<p className="color_white text_xxs f_w_b pt_10">{item?.title}</p>
													</div>
													<div className={`${styles.hoverBox} ${styles.hoverBoxOne}`}>
														<a
															href={`/${module}/${item?.slug}`}
															className="text_xs text_uppercase f_w_m"
														>
															Know More
															<img src={hover_arrow.src} className="" alt="img" />
														</a>
													</div>
												</div>
											</a>
										</SwiperSlide>
									);
								})}
								{/* <SwiperSlide>
									<div className={`${styles.itemBox}`}>
										<div className={`${styles.itemBoxWrap}`}>
											<img
												src={system_one.src}
												className={`${styles.imgOne} `}
												alt="img"
											/>
										</div>
										<div className={`${styles.itemBoxWrap}`}>
											<img
												src={origin_logo.src}
												className={`${styles.centerLogo}`}
												alt="img"
											/>
											<div className={`${styles.hoverBox} ${styles.hoverBoxOne}`}>
												<a href="#" className="text_xs text_uppercase f_w_m">
													Know More
													<img src={hover_arrow.src} className="" alt="img" />
												</a>
											</div>
										</div>
									</div>
								</SwiperSlide>
								<SwiperSlide>
									<div className={`${styles.itemBox}`}>
										<div className={`${styles.itemBoxWrap}`}>
											<img
												src={turbine_img.src}
												className={`${styles.imgOne} `}
												alt="img"
											/>
										</div>
										<div className={`${styles.itemBoxWrap}`}>
											<img
												src={amun_logo.src}
												className={`${styles.centerLogo}`}
												alt="img"
											/>
											<div className={`${styles.hoverBox} ${styles.hoverBoxTwo}`}>
												<a href="#" className="text_xs text_uppercase f_w_m">
													Know More
													<img src={hover_arrow.src} className="" alt="img" />
												</a>
											</div>
										</div>
									</div>
								</SwiperSlide>
								<SwiperSlide>
									<div className={`${styles.itemBox}`}>
										<div className={`${styles.itemBoxWrap}`}>
											<img src={solar_img.src} className={`${styles.imgOne} `} alt="img" />
										</div>
										<div className={`${styles.itemBoxWrap}`}>
											<img
												src={lumus_logo.src}
												className={`${styles.centerLogo}`}
												alt="img"
											/>
											<div className={`${styles.hoverBox} ${styles.hoverBoxThree}`}>
												<a href="#" className="text_xs text_uppercase f_w_m">
													Know More
													<img src={hover_arrow.src} className="" alt="img" />
												</a>
											</div>
										</div>
									</div>
								</SwiperSlide>
								<SwiperSlide>
									<div className={`${styles.itemBox}`}>
										<div className={`${styles.itemBoxWrap}`}>
											<img src={solar_img.src} className={`${styles.imgOne} `} alt="img" />
										</div>
										<div className={`${styles.itemBoxWrap}`}>
											<img
												src={lumus_logo.src}
												className={`${styles.centerLogo}`}
												alt="img"
											/>
											<div className={`${styles.hoverBox} ${styles.hoverBoxThree}`}>
												<a href="#" className="text_xs text_uppercase f_w_m">
													Know More
													<img src={hover_arrow.src} className="" alt="img" />
												</a>
											</div>
										</div>
									</div>
								</SwiperSlide> */}
							</Swiper>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
