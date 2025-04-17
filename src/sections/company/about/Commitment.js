// MODULES //
import { useEffect, useState, useRef } from "react";

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
import styles from "@/styles/sections/company/about/Commitment.module.scss";

// IMAGES //
import commitment_banner from "../../../../public/img/company/about/commitment_banner.jpg";
import dropdown_arrow from "../../../../public/img/icons/dropdown_arrow.svg";

// DATA //

/** Commitment Section */
export default function Commitment() {
	return (
		<section className={`${styles.Commitment}`}>
			<div className="containerLarge">
				<div className={`${styles.commitmentWapper}`}>
					<picture>
						<source srcSet={commitment_banner.src} media="(min-width:767px)" />
						<img
							src={commitment_banner.src}
							className={`${styles.commitmentImg} width_100`}
							alt="Banner Image"
						/>
					</picture>
					<div className={`${styles.CardsDesc}`}>
						<h2 className="text_xl font_primary f_w_s_b color_secondary pb_20">
							Commitment to sustainability
						</h2>
						<p className="text_reg color_dark_gray">
							We are committed to playing a pivotal role in guiding the energy sector
							towards a sustainable future. Our mission is to ease the energy
							transition through rigorous quantitative analysis, providing the insights
							and tools necessary for informed decision-making.
						</p>
						<div className={`${styles.btn_box}`}>
							<span>
								<img src={dropdown_arrow.src} alt="icon" />
							</span>
							<Button color="primary" variant="filled" shape="rounded">
								ESG Factsheet
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
