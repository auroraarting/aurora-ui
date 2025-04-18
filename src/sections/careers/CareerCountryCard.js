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
import styles from "@/styles/sections/careers/CareerCountryCard.module.scss";

// IMAGES //
import country_img from "../../../public/img/careers/country_img.png";
import location from "../../../public/img/icons/location.svg";
import slider_arrow_black from "../../../public/img/icons/slider_arrow_black.svg";

// DATA //

/** CareerCountryCard Section */
export default function CareerCountryCard() {
	return (
		<section className={`${styles.CareerCountryCard} ptb_100`}>
			<div className="container">
				<div className={`${styles.title_wrap} f_r_aj_between`}>
					<h2 className="text_xl font_primary f_w_s_b color_white pb_20">
						Lorem ipsum dolor sit amet
					</h2>
				</div>
				<div className={`${styles.SliderMain} pt_20`}>
					<div className={`${styles.cardItem}`}>
						<div className={`${styles.cardImg}`}>
							<img src={country_img.src} className={`${styles.countryImg} b_r_10`} />
							<p
								className={`${styles.categoryTxt} text_xxs color_secondary text_uppercase`}
							>
								Live
							</p>
						</div>
						<div className={`${styles.cardDesc} pt_20`}>
							<p className="text_sm color_white color_platinum_gray f_r_a_center text_uppercase">
								<img
									src={location.src}
									className={`${styles.location}`}
									alt="location"
								/>
								<span>Austin</span>
							</p>
							<h4 className="text_md color_white f_w_m font_primary pt_10">
								Graduate Analyst
							</h4>
							<div className={`${styles.btn_box} pt_20`}>
								<Button color="secondary" variant="underline" mode="dark">
									Read More
								</Button>
							</div>
						</div>
					</div>
					<div className={`${styles.cardItem}`}>
						<div className={`${styles.cardImg}`}>
							<img src={country_img.src} className={`${styles.countryImg} b_r_10`} />
							<p
								className={`${styles.categoryTxt} text_xxs color_secondary text_uppercase`}
							>
								Live
							</p>
						</div>
						<div className={`${styles.cardDesc} pt_20`}>
							<p className="text_sm color_white color_platinum_gray f_r_a_center text_uppercase">
								<img
									src={location.src}
									className={`${styles.location}`}
									alt="location"
								/>
								<span>Austin</span>
							</p>
							<h4 className="text_md color_white f_w_m font_primary pt_10">
								Graduate Analyst
							</h4>
							<div className={`${styles.btn_box} pt_20`}>
								<Button color="secondary" variant="underline" mode="dark">
									Read More
								</Button>
							</div>
						</div>
					</div>
					<div className={`${styles.cardItem}`}>
						<div className={`${styles.cardImg}`}>
							<img src={country_img.src} className={`${styles.countryImg} b_r_10`} />
							<p
								className={`${styles.categoryTxt} text_xxs color_secondary text_uppercase`}
							>
								Live
							</p>
						</div>
						<div className={`${styles.cardDesc} pt_20`}>
							<p className="text_sm color_white color_platinum_gray f_r_a_center text_uppercase">
								<img
									src={location.src}
									className={`${styles.location}`}
									alt="location"
								/>
								<span>Austin</span>
							</p>
							<h4 className="text_md color_white f_w_m font_primary pt_10">
								Graduate Analyst
							</h4>
							<div className={`${styles.btn_box} pt_20`}>
								<Button color="secondary" variant="underline" mode="dark">
									Read More
								</Button>
							</div>
						</div>
					</div>
					<div className={`${styles.cardItem}`}>
						<div className={`${styles.cardImg}`}>
							<img src={country_img.src} className={`${styles.countryImg} b_r_10`} />
							<p
								className={`${styles.categoryTxt} text_xxs color_secondary text_uppercase`}
							>
								Live
							</p>
						</div>
						<div className={`${styles.cardDesc} pt_20`}>
							<p className="text_sm color_white color_platinum_gray f_r_a_center text_uppercase">
								<img
									src={location.src}
									className={`${styles.location}`}
									alt="location"
								/>
								<span>Austin</span>
							</p>
							<h4 className="text_md color_white f_w_m font_primary pt_10">
								Graduate Analyst
							</h4>
							<div className={`${styles.btn_box} pt_20`}>
								<Button color="secondary" variant="underline" mode="dark">
									Read More
								</Button>
							</div>
						</div>
					</div>
					<div className={`${styles.cardItem}`}>
						<div className={`${styles.cardImg}`}>
							<img src={country_img.src} className={`${styles.countryImg} b_r_10`} />
							<p
								className={`${styles.categoryTxt} text_xxs color_secondary text_uppercase`}
							>
								Live
							</p>
						</div>
						<div className={`${styles.cardDesc} pt_20`}>
							<p className="text_sm color_white color_platinum_gray f_r_a_center text_uppercase">
								<img
									src={location.src}
									className={`${styles.location}`}
									alt="location"
								/>
								<span>Austin</span>
							</p>
							<h4 className="text_md color_white f_w_m font_primary pt_10">
								Graduate Analyst
							</h4>
							<div className={`${styles.btn_box} pt_20`}>
								<Button color="secondary" variant="underline" mode="dark">
									Read More
								</Button>
							</div>
						</div>
					</div>
					<div className={`${styles.cardItem}`}>
						<div className={`${styles.cardImg}`}>
							<img src={country_img.src} className={`${styles.countryImg} b_r_10`} />
							<p
								className={`${styles.categoryTxt} text_xxs color_secondary text_uppercase`}
							>
								Live
							</p>
						</div>
						<div className={`${styles.cardDesc} pt_20`}>
							<p className="text_sm color_white color_platinum_gray f_r_a_center text_uppercase">
								<img
									src={location.src}
									className={`${styles.location}`}
									alt="location"
								/>
								<span>Austin</span>
							</p>
							<h4 className="text_md color_white f_w_m font_primary pt_10">
								Graduate Analyst
							</h4>
							<div className={`${styles.btn_box} pt_20`}>
								<Button color="secondary" variant="underline" mode="dark">
									Read More
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
