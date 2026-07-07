/* eslint-disable quotes */
// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";
import ContentFromCms from "@/components/ContentFromCms";

// SECTIONS //

// PLUGINS //

// UTILS //
import { dynamicInsightsBtnProps } from "@/utils";

// STYLES //
import styles from "@/styles/sections/eos/EOSAI.module.scss";

// IMAGES //
import logo from "/public/img/eos/eosAI.png";
import logoDark from "/public/img/eos/eosAIDark.png";

// DATA //

// SERVICES //

/** EOS Page */
export default function EOSAI({ data, isGlobalPage }) {
	const dataForBtn = { postFields: data || {} };

	return (
		<div className={styles.eosai}>
			<div className="container">
				<div className={`${styles.flexBox} f_j`}>
					<div className={`${styles.flexItemOne}`}>
						<img
							className={`${styles.logo}`}
							src={data?.logo || (isGlobalPage ? logoDark.src : logo.src)}
							alt="EOS AI Image"
						/>
					</div>
					<div
						className={`${styles.flexItemTwo} text_reg ${isGlobalPage ? "color_white" : "color_dark_gray"}`}
					>
						<div
							className={`${styles.title} ${isGlobalPage ? "text_xl" : "text_md"} font_500 m_b_20`}
						>
							Unlock more value with EOS AI
						</div>
						<ContentFromCms>
							{`
                            <p>EOS AI is Aurora’s AI assistant, embedded in EOS to help clients extract more from subscribed research. It delivers fast, source-linked answers grounded in Aurora’s analysis.</p>
                            <br/>
                            <p>*Available in select regions</p>
                            `}
						</ContentFromCms>

						<div
							className={`${styles.button}`}
							{...dynamicInsightsBtnProps(dataForBtn, "topSectionButton")}
						>
							<Button
								color="primary"
								mode={isGlobalPage ? "dark" : "light"}
								variant="filled"
								shape="rounded"
								textlowercase
							>
								Book a Demo
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
