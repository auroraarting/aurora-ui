// MODULES //
import { useState, useEffect, useRef } from "react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/components/EventSmarterEnergy.module.scss";

// IMAGES //
import software_chronos from "../../public/img/events/software_chronos.png";

// DATA //

/** EventSmarterEnergy Section */
export default function EventSmarterEnergy() {
	const [activeTab, setActiveTab] = useState("Software");

	/** */
	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};
	return (
		<section className={`${styles.EventSmarterEnergy}`}>
			<div className="container">
				<div className={`${styles.category} pb_40`}>
					<div className={`${styles.switchBox}`}>
						<div
							className={`${styles.listTxt} ${
								activeTab === "Product" ? styles.active : ""
							}`}
							onClick={() => handleTabClick("Product")}
						>
							<p className="text_xs f_w_b color_white">Product</p>
						</div>
						<div
							className={`${styles.listTxt} ${
								activeTab === "Software" ? styles.active : ""
							}`}
							onClick={() => handleTabClick("Software")}
						>
							<p className="text_xs f_w_b color_white">Software</p>
						</div>
						<div
							className={`${styles.listTxt} ${
								activeTab === "Advisory" ? styles.active : ""
							}`}
							onClick={() => handleTabClick("Advisory")}
						>
							<p className="text_xs f_w_b color_white">Advisory</p>
						</div>
					</div>
				</div>
				{activeTab === "Product" && (
					<div className={`${styles.categoryContent}`}>
						<h2 className="text_xl color_white">
							Smarter energy solutions start here
						</h2>
						<div className={`${styles.categoryList} f_w_a_j_center`}>
							<a>
								<img src={software_chronos.src} alt="icon" />
							</a>
							<a>
								<img src={software_chronos.src} alt="icon" />
							</a>
							<a>
								<img src={software_chronos.src} alt="icon" />
							</a>
							<a>
								<img src={software_chronos.src} alt="icon" />
							</a>
						</div>
						<div className={`${styles.bookBtn} pt_40 f_w_a_j_center`}>
							<Button color="primary" variant="filled" shape="rounded" mode="dark">
								Explore More
							</Button>
						</div>
					</div>
				)}
				{activeTab === "Software" && (
					<div className={`${styles.categoryContent}`}>
						<h2 className="text_xl color_white">
							Smarter energy solutions start here
						</h2>
						<div className={`${styles.categoryList} f_w_a_j_center`}>
							<a>
								<img src={software_chronos.src} alt="icon" />
							</a>
							<a>
								<img src={software_chronos.src} alt="icon" />
							</a>
							<a>
								<img src={software_chronos.src} alt="icon" />
							</a>
							<a>
								<img src={software_chronos.src} alt="icon" />
							</a>
						</div>
						<div className={`${styles.bookBtn} pt_40 f_w_a_j_center`}>
							<Button color="primary" variant="filled" shape="rounded" mode="dark">
								Explore More
							</Button>
						</div>
					</div>
				)}
				{activeTab === "Advisory" && (
					<div className={`${styles.categoryContent}`}>
						<h2 className="text_xl color_white">
							Smarter energy solutions start here
						</h2>
						<div className={`${styles.categoryList} f_w_a_j_center`}>
							<a>
								<img src={software_chronos.src} alt="icon" />
							</a>
							<a>
								<img src={software_chronos.src} alt="icon" />
							</a>
							<a>
								<img src={software_chronos.src} alt="icon" />
							</a>
							<a>
								<img src={software_chronos.src} alt="icon" />
							</a>
						</div>
						<div className={`${styles.bookBtn} pt_40 f_w_a_j_center`}>
							<Button color="primary" variant="filled" shape="rounded" mode="dark">
								Explore More
							</Button>
						</div>
					</div>
				)}
			</div>
		</section>
	);
}
