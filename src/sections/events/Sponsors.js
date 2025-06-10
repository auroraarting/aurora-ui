"use client";
// MODULES //
import { useEffect } from "react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //
import EqualHeight from "@/utils/EqualHeight";

// STYLES //
import styles from "@/styles/sections/events/Sponsors.module.scss";

// IMAGES //
import national_grid from "@/../public/img/events/national_grid.png";

// DATA //

/** Sponsors Section */
export default function Sponsors({ data }) {
	useEffect(() => {
		// EqualHeight("SponsorsItem");
		const SponsorsFlex = document.querySelector(".SponsorsFlex");
		const SponsorsItemTitle = document.querySelectorAll(".SponsorsItemTitle");
		[...SponsorsItemTitle]?.map((item) => {
			item.style.height = `${SponsorsFlex.getBoundingClientRect().height}px`;
		});
	}, []);

	if (
		data?.events?.sponsors?.sponsors?.length === 0 ||
		!data?.events?.sponsors?.sponsors?.length
	) {
		return <></>;
	}

	return (
		<section
			id="sponsors"
			data-name="Sponsors"
			className={`${styles.Sponsors} pt_60`}
		>
			<h2 className={`${styles.sponsorsTitle} text_lg color_secondary`}>
				{data?.events?.sponsors?.sectionTitle || "Sponsors"}
			</h2>
			{data?.events?.sponsors?.sponsors?.map((item) => {
				return (
					<div className={`${styles.SponsorsFlexWrap} d_f`} key={item?.title}>
						<div className={`${styles.SponsorsItemTitle} SponsorsItem`}>
							<h4 className="text_reg color_dark_gray f_w_b">{item?.title}</h4>
						</div>
						<div className={`${styles.SponsorsFlex} d_f SponsorsItem`}>
							{item?.gallery?.nodes?.map((item2) => {
								return (
									<div className={`${styles.SponsorsItem}`} key={item2?.mediaItemUrl}>
										<img src={item2?.mediaItemUrl} alt="Sponsors Logos" />
									</div>
								);
							})}
						</div>
					</div>
				);
			})}
		</section>
	);
}
