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
export default function Counter({ data }) {
	return (
		<section className={`${styles.Counter} dark_bg pt_40`}>
			<div className="container">
				<div className={`${styles.counterFlex} f_w_j`}>
					<div className={`${styles.countBox}`}>
						<h4 className="text_xxl color_primary">
							<CountUp end={data.stats.auroreans || 800} enableScrollSpy />{" "}
							<spn>+</spn>
						</h4>
						<p className="text_xs color_white text_uppercase font_primary">
							Auroreans
						</p>
					</div>
					<div className={`${styles.countBox}`}>
						<h4 className="text_xxl color_primary">
							<CountUp end={data.stats.nationalities || 60} enableScrollSpy />{" "}
							<spn>+</spn>
						</h4>
						<p className="text_xs color_white text_uppercase font_primary">
							nationalities
						</p>
					</div>
					<div className={`${styles.countBox}`}>
						<h4 className="text_xxl color_primary">
							<CountUp end={data.stats.offices || 15} enableScrollSpy />
						</h4>
						<p className="text_xs color_white text_uppercase font_primary">offices</p>
					</div>
				</div>
			</div>
		</section>
	);
}
