"use client";

// MODULES //

// COMPONENTS //
import ContentFromCms from "./ContentFromCms";
import Modal from "./Modal";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/components/IframeModal.module.scss";

// IMAGES //

// DATA //

/** IframeModal */
export default function IframeModal({
	hideLeft,
	sectionTitle = "Sign up to receive our latest public insights straight to your inbox",
	sectionDesc = "Please fill out this form to download a redacted sample of Navigating the e-fuel landscape: demand drivers, cost and willingness to pay - A Market Report by Aurora.",
}) {
	return (
		<div className={`${styles.iframeModal}`}>
			<Modal id="iframePopup">
				<div className="wrap ">
					{!hideLeft && (
						<div className="text">
							<h2 className="title text_lg f_w_s_b font_primary color_black">
								<ContentFromCms>{sectionTitle}</ContentFromCms>
							</h2>
							<div className="desc text_reg font_secondary color_silver_black">
								<ContentFromCms>{sectionDesc}</ContentFromCms>
							</div>
						</div>
					)}
					<div className="form">
						<iframe className="formImg" title="Form"></iframe>
					</div>
				</div>
			</Modal>
		</div>
	);
}
