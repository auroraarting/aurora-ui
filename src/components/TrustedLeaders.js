// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Grid, Pagination } from "swiper/modules";

// UTILS //

// STYLES //
import styles from "@/styles/components/TrustedLeaders.module.scss";

// IMAGES //
import erste from "../../public/img/softwares/erste.png";

// DATA //

/** TrustedLeaders Section */
export default function TrustedLeaders() {
	const LogoData = [
		{
			logos: erste.src,
		},
		{
			logos: erste.src,
		},
		{
			logos: erste.src,
		},
		{
			logos: erste.src,
		},
		{
			logos: erste.src,
		},
		{
			logos: erste.src,
		},
		{
			logos: erste.src,
		},
		{
			logos: erste.src,
		},
		{
			logos: erste.src,
		},
		{
			logos: erste.src,
		},
		{
			logos: erste.src,
		},
		{
			logos: erste.src,
		},
		{
			logos: erste.src,
		},
		{
			logos: erste.src,
		},
		{
			logos: erste.src,
		},
		{
			logos: erste.src,
		},
		{
			logos: erste.src,
		},
	];
	return (
		<section className={`${styles.TrustedLeaders} TrustedLeaders`} id="whyaurora">
			<div className="container">
				<div className="pb_40">
					<h2 className="text_xl font_primary f_w_s_b color_secondary">
						Trusted by industry leaders
					</h2>
				</div>
				{/* <div className={`${styles.box_wrap}`}>
					{LogoData.map((item, ind) => (
						<div className={`${styles.box_item}`} key={ind}>
							<div className={`${styles.imgBox}`}>
								<img src={item.logos} className="b_r_10" alt="story img" />
							</div>
						</div>
					))}
				</div> */}

				<div className={`${styles.box_wrap}`}>
					<Swiper
						slidesPerView={2}
						grid={{
							fill: "row", // This is important for row layout
							rows: 2,
						}}
						spaceBetween={20}
						// pagination={{
						// 	clickable: true,
						// }}
						breakpoints={{
							768: {
								slidesPerView: 3,
								grid: {
									fill: "row", // This is important for row layout
									rows: 2,
								},
							},
							1024: {
								slidesPerView: 5,
								grid: {
									rows: 2,
								},
							},
						}}
						modules={[Grid, Pagination]}
						className="mySwiper"
					>
						{LogoData.map((item, ind) => (
							<SwiperSlide key={ind}>
								<div className={`${styles.box_item}`} key={ind}>
									<div className={`${styles.imgBox}`}>
										<img src={item.logos} className="b_r_10" alt="story img" />
									</div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</section>
	);
}
