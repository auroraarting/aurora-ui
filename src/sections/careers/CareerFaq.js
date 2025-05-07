// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";
import AccordianCommon from "@/components/AccordianCommon";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/careers/CareerFaq.module.scss";
import ContentFromCms from "@/components/ContentFromCms";

// IMAGES //

// DATA //

/** CareerFaq Section */
export default function CareerFaq({ data }) {
	return (
		<div className={`${styles.accordian_main}`}>
			<AccordianCommon
				fontStyle={"text_reg"}
				fontWeight={"f_w_s_b"}
				fontFamily={"font_primary"}
				fontColor={"color_light_gray"}
				items={data?.map((item) => {
					return {
						title: item.title,
						children: (
							<div className={`${styles.content_wrap}`}>
								<div className="text_reg color_dark_gray">
									<ContentFromCms>{item.desc}</ContentFromCms>
								</div>
							</div>
						),
					};
				})}
			/>
		</div>
	);
}
