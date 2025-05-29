"use client";

// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //
import CountUp from "react-countup";

// UTILS //

// STYLES //
import styles from "@/styles/sections/careers/Counter.module.scss";

// IMAGES //

// DATA //

/** Counter Section */
export default function Counter({ data, className }) {
	return (
		<section
			className={`${styles.Counter} pt_40 ${className}`}
			aria-label="counter"
			title="counter"
		>
			<div className="container">
				<div className={`${styles.counterFlex} f_w_j`}>
					{data?.stats?.auroreans && (
						<div className={`${styles.countBox}`}>
							<h4 className="text_xl color_primary">
								<CountUp end={data?.stats?.auroreans} enableScrollSpy />
								<span>+</span>
							</h4>
							<p className="text_xs color_white text_uppercase font_primary">
								Auroreans
							</p>
						</div>
					)}
					{data?.stats?.nationalities && (
						<div className={`${styles.countBox}`}>
							<h4 className="text_xl color_primary">
								<CountUp end={data?.stats?.nationalities} enableScrollSpy />
								<span>+</span>
							</h4>
							<p className="text_xs color_white text_uppercase font_primary">
								nationalities
							</p>
						</div>
					)}
					{data?.stats?.offices && (
						<div className={`${styles.countBox}`}>
							<h4 className="text_xl color_primary">
								<CountUp end={data?.stats?.offices} enableScrollSpy />
							</h4>
							<p className="text_xs color_white text_uppercase font_primary">
								offices
							</p>
						</div>
					)}
					{data?.stats?.clients && (
						<div className={`${styles.countBox}`}>
							<h4 className="text_xl color_primary">
								<CountUp end={data?.stats?.clients} enableScrollSpy />
							</h4>
							<p className="text_xs color_white text_uppercase font_primary">
								Clients
							</p>
						</div>
					)}
					{data?.stats?.countries && (
						<div className={`${styles.countBox}`}>
							<h4 className="text_xl color_primary">
								<CountUp end={data?.stats?.countries.split("+")[0]} enableScrollSpy />
								<span>+</span>
							</h4>
							<p className="text_xs color_white text_uppercase font_primary">
								Countries
							</p>
						</div>
					)}
					{data?.stats?.transactions && (
						<div className={`${styles.countBox}`}>
							<h4 className="text_xl color_primary">
								<CountUp end={data?.stats?.transactions} enableScrollSpy />
								<span>+</span>
							</h4>
							<p className="text_xs color_white text_uppercase font_primary">
								Transactions
							</p>
						</div>
					)}
					{data?.stats?.advisoryProjects && (
						<div className={`${styles.countBox}`}>
							<h4 className="text_xl color_primary">
								<CountUp
									end={data?.stats?.advisoryProjects.split("+")[0]}
									enableScrollSpy
								/>
								<span>+</span>
							</h4>
							<p className="text_xs color_white text_uppercase font_primary">
								Advisory Projects
							</p>
						</div>
					)}
					{/* advisory projects */}
				</div>
			</div>
		</section>
	);
}
