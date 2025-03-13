// MODULES //
import { useEffect, useState, useRef } from "react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/products/ProductListingWrapper.module.scss";

// IMAGES //
import product_img from "@/../public/img/products/product_img.jpg";
import power from "@/../public/img/products/power.svg";

// DATA //

/** ProductListingWrapper Section */
export default function ProductListingWrapper() {
	return (
		<section className={`${styles.ProductListingWrapper} `}>
			<div className="container">
				<div className={`${styles.flexBox} f_j ptb_60`}>
					<div className={`${styles.flexItemOne}`}>
						<h1 className="text_xl font_primary f_w_m color_secondary text_uppercase">
							Lorem ipsum dolor sit amet consectetur.
						</h1>
					</div>
					<div className={`${styles.flexItemTwo}`}>
						<p className={`${styles.label} text_reg color_dark_gray`}>
							Lorem ipsum dolor sit amet consectetur. Odio vel tortor lectus sit
							sagittis enim eu sed sed.. Sed pulvinar vestibulum lorem tristique
							vulputate bibendum.. Accumsan in sed.
						</p>
					</div>
				</div>
				<div className={`${styles.ListingWrapper}`}>
					<div className={`${styles.ListingBox}`}>
						<div className={`${styles.thumbnail}`}>
							<img src={product_img.src} className="width_100 b_r_10" alt="img" />
						</div>
						<div className={`${styles.iconContent} pt_20 `}>
							<div className="f_r_a_center pb_10">
								<img src={power.src} className={`${styles.icon}`} alt="icon" />
								<h5 className="text_reg font_primary f_w_m color_secondary">
									Power & Renewables Service Power & Renewables Service
								</h5>
							</div>
							<p className={`${styles.para} text_reg color_dark_gray`}>
								Lorem ipsum dolor sit amet consectetur. Odio vel tortor lectus sit
								sagittis enim eu sed sed. Lorem ipsum dolor sit amet consectetur. Odio
								vel tortor lectus sit sagittis enim eu sed sed.
							</p>
							<div className={`${styles.btn_box}`}>
								<Button color="secondary" variant="underline" size="xs">
									Read More
								</Button>
							</div>
						</div>
					</div>
					<div className={`${styles.ListingBox}`}>
						<div className={`${styles.thumbnail}`}>
							<img src={product_img.src} className="width_100 b_r_10" alt="img" />
						</div>
						<div className={`${styles.iconContent} pt_20 `}>
							<div className="f_r_a_center pb_10">
								<img src={power.src} className={`${styles.icon}`} alt="icon" />
								<h5 className="text_reg font_primary f_w_m color_secondary">
									Flexible Energy Service
								</h5>
							</div>
							<p className={`${styles.para} text_reg color_dark_gray`}>
								Lorem ipsum dolor sit amet consectetur. Odio vel tortor lectus sit
								sagittis enim eu sed sed. Lorem ipsum dolor sit amet consectetur. Odio
								vel tortor lectus sit sagittis enim eu sed sed.
							</p>
							<div className={`${styles.btn_box}`}>
								<Button color="secondary" variant="underline" size="xs">
									Read More
								</Button>
							</div>
						</div>
					</div>
					<div className={`${styles.ListingBox}`}>
						<div className={`${styles.thumbnail}`}>
							<img src={product_img.src} className="width_100 b_r_10" alt="img" />
						</div>
						<div className={`${styles.iconContent} pt_20 `}>
							<div className="f_r_a_center pb_10">
								<img src={power.src} className={`${styles.icon}`} alt="icon" />
								<h5 className="text_reg font_primary f_w_m color_secondary">
									Power & Renewables Service
								</h5>
							</div>
							<p className={`${styles.para} text_reg color_dark_gray`}>
								Lorem ipsum dolor sit amet consectetur. Odio vel tortor lectus sit
								sagittis enim eu sed sed. Lorem ipsum dolor sit amet consectetur. Odio
								vel tortor lectus sit sagittis enim eu sed sed.
							</p>
							<div className={`${styles.btn_box}`}>
								<Button color="secondary" variant="underline" size="xs">
									Read More
								</Button>
							</div>
						</div>
					</div>
					<div className={`${styles.ListingBox}`}>
						<div className={`${styles.thumbnail}`}>
							<img src={product_img.src} className="width_100 b_r_10" alt="img" />
						</div>
						<div className={`${styles.iconContent} pt_20 `}>
							<div className="f_r_a_center pb_10">
								<img src={power.src} className={`${styles.icon}`} alt="icon" />
								<h5 className="text_reg font_primary f_w_m color_secondary">
									Power & Renewables Service
								</h5>
							</div>
							<p className={`${styles.para} text_reg color_dark_gray`}>
								Lorem ipsum dolor sit amet consectetur. Odio vel tortor lectus sit
								sagittis enim eu sed sed. Lorem ipsum dolor sit amet consectetur. Odio
								vel tortor lectus sit sagittis enim eu sed sed.
							</p>
							<div className={`${styles.btn_box}`}>
								<Button color="secondary" variant="underline" size="xs">
									Read More
								</Button>
							</div>
						</div>
					</div>
					<div className={`${styles.ListingBox}`}>
						<div className={`${styles.thumbnail}`}>
							<img src={product_img.src} className="width_100 b_r_10" alt="img" />
						</div>
						<div className={`${styles.iconContent} pt_20 `}>
							<div className="f_r_a_center pb_10">
								<img src={power.src} className={`${styles.icon}`} alt="icon" />
								<h5 className="text_reg font_primary f_w_m color_secondary">
									Power & Renewables Service
								</h5>
							</div>
							<p className={`${styles.para} text_reg color_dark_gray`}>
								Lorem ipsum dolor sit amet consectetur. Odio vel tortor lectus sit
								sagittis enim eu sed sed. Lorem ipsum dolor sit amet consectetur. Odio
								vel tortor lectus sit sagittis enim eu sed sed.
							</p>
							<div className={`${styles.btn_box}`}>
								<Button color="secondary" variant="underline" size="xs">
									Read More
								</Button>
							</div>
						</div>
					</div>
					<div className={`${styles.ListingBox}`}>
						<div className={`${styles.thumbnail}`}>
							<img src={product_img.src} className="width_100 b_r_10" alt="img" />
						</div>
						<div className={`${styles.iconContent} pt_20 `}>
							<div className="f_r_a_center pb_10">
								<img src={power.src} className={`${styles.icon}`} alt="icon" />
								<h5 className="text_reg font_primary f_w_m color_secondary">
									Power & Renewables Service
								</h5>
							</div>
							<p className={`${styles.para} text_reg color_dark_gray`}>
								Lorem ipsum dolor sit amet consectetur. Odio vel tortor lectus sit
								sagittis enim eu sed sed. Lorem ipsum dolor sit amet consectetur. Odio
								vel tortor lectus sit sagittis enim eu sed sed.
							</p>
							<div className={`${styles.btn_box}`}>
								<Button color="secondary" variant="underline" size="xs">
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
