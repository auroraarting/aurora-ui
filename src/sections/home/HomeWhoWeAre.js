// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/home/HomeWhoWeAre.module.scss";

// IMAGES //

// DATA //

/** HomeWhoWeAre Section */
export default function HomeWhoWeAre() {
	return (
		<section className={`${styles.HomeWhoWeAre} pt_100 pb_60`}>
			<div className="container">
				<h2 className="text_xl color_white">
					Guiding you through the
					<br className="hidden_xs" /> energy ecosystem
				</h2>
				<div className={`${styles.WhoWeAreSection} pt_60`}>
					<div className={`${styles.HomeWhoWeAreInfo} ptb_40`}>
						<h4 className="text_md color_white f_w_m pb_20">Financial Sector</h4>
						<p className="text_reg color_white">
							For informed capital allocation in evolving energy landscapes, energy
							investors trust Aurora&apos;s analytical rigor and regulatory expertise.
						</p>
						<div className={`${styles.btn_box} pt_40`}>
							<Button color="secondary" variant="underline" mode="dark">
								Read More
							</Button>
						</div>
					</div>
					<div className={`${styles.HomeWhoWeAreInfo} ptb_40`}>
						<h4 className="text_md color_white f_w_m pb_20">Energy Consumer</h4>
						<p className="text_reg color_white">
							Large-scale businesses optimizing energy procurement, balancing
							cost-efficiency, reliability, and sustainability while meeting
							operational and regulatory requirements.
						</p>
						<div className={`${styles.btn_box} pt_40`}>
							<Button color="secondary" variant="underline" mode="dark">
								Know more
							</Button>
						</div>
					</div>
					<div className={`${styles.HomeWhoWeAreInfo} ptb_40`}>
						<h4 className="text_md color_white f_w_m pb_20">Utilities</h4>
						<p className="text_reg color_white">
							Organizations managing energy generation, transmission, and distribution,
							optimizing grid performance and integrating renewables to meet future
							energy demand.
						</p>
						<div className={`${styles.btn_box} pt_40`}>
							<Button color="secondary" variant="underline" mode="dark">
								Know more
							</Button>
						</div>
					</div>
					<div className={`${styles.HomeWhoWeAreInfo} ptb_40`}>
						<h4 className="text_md color_white f_w_m pb_20">Developer</h4>
						<p className="text_reg color_white">
							Energy project developers evaluating feasibility, financing, and risks to
							drive the development of renewable energy and infrastructure solutions.
						</p>
						<div className={`${styles.btn_box} pt_40`}>
							<Button color="secondary" variant="underline" mode="dark">
								Know more
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
