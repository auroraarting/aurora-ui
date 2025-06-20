"use client";

/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";
import AccordianCommon from "@/components/AccordianCommon";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/components/SoftwareCards.module.scss";

// IMAGES //
import card_img from "../../public/img/contact/card_img.jpg";
import card_img2 from "../../public/img/contact/cardimg2.png";
import card_img3 from "../../public/img/contact/cardimg3.png";

// DATA //
const defaultData = [
	{
		desc: "Unlock powerful tools for energy analysis",
		btnText: "Explore Softwares",
		btnLink: "/software",
		img: card_img.src,
	},
	{
		desc: "Get deep insights and global market trends",
		btnText: "Explore Subscription Analytics",
		btnLink: "/products",
		img: card_img2.src,
	},
	{
		desc: "Expert advice to guide strategic decisions",
		btnText: "Explore Advisory",
		btnLink: "/service/advisory",
		img: card_img3.src,
	},
];

/** SoftwareCards Section */
export default function SoftwareCards({ dynamicData }) {
	const data = dynamicData || defaultData;
	return (
		<section className={`${styles.SoftwareCards}`}>
			<div className="container">
				<div className={`${styles.SoftwareCardsFlex}`}>
					{data?.map((item) => {
						return (
							<a
								href={item?.btnLink}
								className={`${styles.CardsItem}`}
								key={item?.desc}
							>
								<img src={item?.img} className="width_100 b_r_20" alt={item?.desc} />
								<div className={`${styles.hoverBox}`}></div>
								<div className={`${styles.CardsDesc}`}>
									<h2 className={`text_lg  ${item?.fontColor || "color_secondary"}`}>
										{item?.desc}
									</h2>
									<div className={styles.btn_box}>
										<Button color="primary" variant="filled" shape="rounded" mode="dark">
											{item?.btnText}
										</Button>
									</div>
								</div>
							</a>
						);
					})}
					{/* <a href="/software" className={`${styles.CardsItem}`}>
						<img src={card_img.src} className="width_100 b_r_20" alt="img" />
						<div className={`${styles.hoverBox}`}></div>
						<div className={`${styles.CardsDesc}`}>
							<h2 className="text_lg color_secondary">
								Unlock powerful tools for energy analysis.
							</h2>
							<div className={styles.btn_box}>
								<Button color="primary" variant="filled" shape="rounded" mode="dark">
									Explore Software
								</Button>
							</div>
						</div>
					</a>
					<a href="/products" className={`${styles.CardsItem}`}>
						<img src={card_img2.src} className="width_100 b_r_20" alt="img" />
						<div className={`${styles.hoverBox}`}></div>
						<div className={`${styles.CardsDesc}`}>
							<h2 className="text_lg color_secondary">
								Get deep insights and market trends.
							</h2>
							<div className={styles.btn_box}>
								<Button color="primary" variant="filled" shape="rounded" mode="dark">
									Explore Subscription Analytics
								</Button>
							</div>
						</div>
					</a>
					<a href="/service/advisory" className={`${styles.CardsItem}`}>
						<img src={card_img3.src} className="width_100 b_r_20" alt="img" />
						<div className={`${styles.hoverBox}`}></div>
						<div className={`${styles.CardsDesc}`}>
							<h2 className="text_lg color_secondary">
								Expert advice to guide strategic decisions.
							</h2>
							<div className={styles.btn_box}>
								<Button color="primary" variant="filled" shape="rounded" mode="dark">
									Explore Advisory
								</Button>
							</div>
						</div>
					</a> */}
				</div>
			</div>
		</section>
	);
}
