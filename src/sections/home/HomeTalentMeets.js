"use client";

// MODULES //
import Link from "next/link";

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";

// UTILS //

// STYLES //
import styles from "@/styles/sections/home/HomeTalentMeets.module.scss";

// IMAGES //
import meet_img from "../../../public/img/home/meet_img.jpg";

// DATA //

/** HomeTalentMeets Section */
export default function HomeTalentMeets() {
	return (
		<section className={`${styles.HomeTalentMeets} ptb_100`}>
			<div className="container">
				<div className={`${styles.card} f_r_aj_between`}>
					<div className={`${styles.imageWrapper}`}>
						<img src={meet_img.src} className="width_100 b_r_20" alt="meet img" />
					</div>
					<div className={`${styles.content}`}>
						<h2 className="text_xl font_primary f_w_m color_secondary pb_20">
							Where talent meets purpose
						</h2>
						<p className="text_reg color_dark_gray">
							Here at Aurora, we foster a collaborative, inclusive, and dynamic work
							environment. Discover how we support our Auroreans to thrive, belong, and
							make a real impact in the energy transition!
						</p>
						<div className={`${styles.bookBtnOne} pt_40`}>
							<Link href="/careers/life-at-aurora">
								<Button color="primary" variant="filled" shape="rounded" mode="dark">
									Life at Aurora
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
