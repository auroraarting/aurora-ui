"use client";

// MODULES //
import Link from "next/link";

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
		<section
			className={`${styles.HomeWhoWeAre} pt_100 pb_60`}
			aria-label="who are you section"
			title="who are you section"
		>
			<div className="container">
				<h2 className="text_xl color_white">
					Strategic market focus
					<br className="hidden_xs" /> for your sector
				</h2>
				<div className={`${styles.WhoWeAreSection} pt_60`}>
					<div className={`${styles.HomeWhoWeAreInfo} ptb_40`}>
						<h4 className="text_md color_white f_w_m pb_20">Financial Sector</h4>
						<p className="text_reg color_silver_gray">
							For informed capital allocation in evolving energy landscapes, energy
							investors trust Aurora&apos;s analytical rigour and regulatory expertise.
						</p>
						<div className={`${styles.btn_box} pt_40`}>
							<Link href="/who-are-you/financial-sector">
								<Button color="secondary" variant="underline" mode="dark" role="button">
									Read More
								</Button>
							</Link>
						</div>
					</div>
					<div className={`${styles.HomeWhoWeAreInfo} ptb_40`}>
						<h4 className="text_md color_white f_w_m pb_20">Energy Consumers</h4>
						<p className="text_reg color_silver_gray">
							Large-scale businesses optimising energy procurement, balancing
							cost-efficiency, reliability, and sustainability while meeting
							operational and regulatory requirements.
						</p>
						<div className={`${styles.btn_box} pt_40`}>
							<Link href="/who-are-you/energy-consumer">
								<Button color="secondary" variant="underline" mode="dark" role="button">
									Know more
								</Button>
							</Link>
						</div>
					</div>
					<div className={`${styles.HomeWhoWeAreInfo} ptb_40`}>
						<h4 className="text_md color_white f_w_m pb_20">Utilities</h4>
						<p className="text_reg color_silver_gray">
							Organisations managing energy generation, transmission, and distribution,
							optimising grid performance and integrating renewables to meet future
							energy demand.
						</p>
						<div className={`${styles.btn_box} pt_40`}>
							<Link href="/who-are-you/utilities">
								<Button color="secondary" variant="underline" mode="dark" role="button">
									Know more
								</Button>
							</Link>
						</div>
					</div>
					<div className={`${styles.HomeWhoWeAreInfo} ptb_40`}>
						<h4 className="text_md color_white f_w_m pb_20">Developers</h4>
						<p className="text_reg color_silver_gray">
							Energy project developers evaluating feasibility, financing, and risks to
							drive the development of renewable energy and infrastructure solutions.
						</p>
						<div className={`${styles.btn_box} pt_40`}>
							<Link href="/who-are-you/developer">
								<Button color="secondary" variant="underline" mode="dark" role="button">
									Know more
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
