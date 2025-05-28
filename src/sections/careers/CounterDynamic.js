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
export default function CounterDynamic({ data, className }) {
	return (
		<section className={`${styles.Counter} ${className} pt_40 pb_100`}>
			<div className="containerLarge">
				<div className={`${styles.counterFlex} f_w_j`}>
					{data?.map((item) => {
						return (
							<div className={`${styles.countBox}`} key={item?.title}>
								<h4 className="text_xl color_primary">
									{/* <CountUp end={item?.count.split("+")[0]} enableScrollSpy /> */}
									{item?.count}
									{/* {item?.count?.split("+")?.length > 1 && <span>+</span>} */}
								</h4>
								<p className="text_xs color_white text_uppercase font_primary">
									{item?.title}
								</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
