"use client";
// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //
import parse from "html-react-parser";

// UTILS //

// STYLES //
import styles from "@/styles/sections/softwares/TrustOurExperts.module.scss";

// IMAGES //
import onbording from "../../../public/img/softwares/onbording.svg";
import thematic from "../../../public/img/softwares/thematic.svg";
import experts from "../../../public/img/softwares/experts.svg";
import community from "../../../public/img/softwares/community.svg";

// DATA //

/** TrustOurExperts Section */
export default function TrustOurExperts({ data }) {
	return (
		<section className={`${styles.TrustOurExperts}`}>
			<div className="container">
				<h2 className="text_xl font_primary f_w_s_b color_secondary">
					{/* Trust our experts, <br className="hidden_xs" />
					available to support you */}
					{parse(data?.sectionTitle)}
					{/* {data?.sectionTitle} */}
				</h2>
				<div className={`${styles.wrap}`}>
					<div className={`${styles.trustOurBox} pt_40`}>
						{data?.list?.map((item, ind) => {
							return (
								<div className={`${styles.trustOurItemOne}`} key={ind}>
									<img src={item?.logo?.node?.sourceUrl} alt="icon" />
									<div>
										<h5 className="text_reg font_primary f_w_m color_secondary">
											{item?.title}
										</h5>
										<p className="text_xs color_dark_gray">{item?.description}</p>
									</div>
								</div>
							);
						})}
					</div>
					<div className={`${styles.placeholderImg} pt_40`}>
						<img src={data?.image?.node?.sourceUrl} className={`${styles.img}`} />
					</div>
				</div>
			</div>
		</section>
	);
}
