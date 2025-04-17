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

// DATA //

/** SoftwareCards Section */
export default function SoftwareCards() {
	return (
		<section className={`${styles.SoftwareCards}`}>
			<div className="container">
				<div className={`${styles.SoftwareCardsFlex}`}>
					<div className={`${styles.CardsItem}`}>
						<img src={card_img.src} className="width_100 b_r_20" alt="img" />
						<div className={`${styles.hoverBox}`}></div>
						<div className={`${styles.CardsDesc}`}>
							<h2 className="text_lg color_secondary">
								Integrated system, endless possibilities
							</h2>
							<div className={styles.btn_box}>
								<Button color="primary" variant="filled" shape="rounded" mode="dark">
									Explore Software
								</Button>
							</div>
						</div>
					</div>
					<div className={`${styles.CardsItem}`}>
						<img src={card_img.src} className="width_100 b_r_20" alt="img" />
						<div className={`${styles.hoverBox}`}></div>
						<div className={`${styles.CardsDesc}`}>
							<h2 className="text_lg color_secondary">
								Lorem ipsum dolor sit amet consectetur.
							</h2>
							<div className={styles.btn_box}>
								<Button color="primary" variant="filled" shape="rounded" mode="dark">
									Explore Subscription Analytics
								</Button>
							</div>
						</div>
					</div>
					<div className={`${styles.CardsItem}`}>
						<img src={card_img.src} className="width_100 b_r_20" alt="img" />
						<div className={`${styles.hoverBox}`}></div>
						<div className={`${styles.CardsDesc}`}>
							<h2 className="text_lg color_secondary">
								Lorem ipsum dolor sit amet consectetur.
							</h2>
							<div className={styles.btn_box}>
								<Button color="primary" variant="filled" shape="rounded" mode="dark">
									Explore Advisory
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
