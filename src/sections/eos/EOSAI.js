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
import eosaidarkbg from "/public/img/eosaidark-bg.jpg";

// DATA //

// SERVICES //

/** EOS Page */
export default function EOSAI({ data, isGlobalPage }) {
	const btnProps = dynamicInsightsBtnProps(
		{ postFields: { button: data?.button } },
		"button",
	);

	const defaultDescription = `
                            <p>EOS AI is Aurora’s AI assistant, embedded in EOS to help clients extract more from subscribed research. It delivers fast, source-linked answers grounded in Aurora’s analysis.</p>
                            <br/>
                            <p>*Available in select regions</p>
                            `;

	return (
		<div className={`${styles.eosai} ${isGlobalPage ? "pt_80 pb_80" : ""}`}>
			{isGlobalPage && (
				<img
					src={isGlobalPage ? eosaidarkbg.src : ""}
					alt="EOS AI Background"
					className={styles.background}
				/>
			)}
			<div className="container">
				<div className={`${styles.flexBox} f_j`}>
					<div className={`${styles.flexItemOne}`}>
						<img
							className={`${styles.logo}`}
							src={
								data?.logo?.node?.mediaItemUrl ||
								(isGlobalPage ? logoDark.src : logo.src)
							}
							alt={data?.logo?.node?.altText || "EOS AI Image"}
						/>
					</div>
					<div
						className={`${styles.flexItemTwo} text_reg ${isGlobalPage ? "color_white" : "color_dark_gray"}`}
					>
						<div
							className={`${styles.title} ${isGlobalPage ? "text_xl" : "text_md"} font_500 m_b_20`}
						>
							{data?.title || "Unlock more value with EOS AI"}
						</div>
						<ContentFromCms>{data?.description || defaultDescription}</ContentFromCms>

						<div className={`${styles.button}`} {...btnProps}>
							<Button
								color="primary"
								mode={isGlobalPage ? "dark" : "light"}
								variant="filled"
								shape="rounded"
								textlowercase
							>
								{btnProps.btntext || "Book a Demo"}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
