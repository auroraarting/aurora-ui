"use client";
// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";
import ContentFromCms from "@/components/ContentFromCms";

// SECTIONS //

// PLUGINS //

// UTILS //
import { slugify } from "@/utils";

// STYLES //
import styles from "@/styles/sections/global-presence/Introduction.module.scss";

// IMAGES //

// DATA //

/** Introduction Section */
export default function Introduction({ data, sectionid }) {
	if (!data) {
		return <></>;
	}
	return (
		<section
			className={`${styles.Introduction}`}
			id={"introduction"}
			data-name={sectionid || "Introduction"}
		>
			<div className="container">
				<div className={`${styles.flexBox} f_j ptb_100`}>
					<div className={`${styles.flexItemOne}`}>
						<h2 className="text_xl font_primary color_secondary ">
							{data?.sectionTitle}
						</h2>
					</div>
					<div className={`${styles.flexItemTwo} text_reg color_dark_gray`}>
						{data?.description && (
							<ContentFromCms>{data?.description}</ContentFromCms>
						)}
						{/* <p className={`${styles.label}`}>
							Lorem ipsum dolor sit amet consectetur. Elit massa a ut malesuada.
							Tincidunt pellentesque euismod morbi elit in tempor in. Ut elit in diam
							ut a mattis. Aliquam faucibus bibendum bibendum purus a commodo diam
							tortor ac. Pellentesque in consectetur lobortis viverra integer sed sed.
						</p>
						<p className={`${styles.label} text_reg color_dark_gray`}>
							Lorem ipsum dolor sit amet consectetur. Elit massa a ut malesuada.
							Tincidunt pellentesque euismod morbi elit in tempor in. Ut elit in diam
							ut a mattis.
						</p> */}
					</div>
				</div>
			</div>
		</section>
	);
}
