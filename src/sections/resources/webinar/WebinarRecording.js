// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //
import { dynamicInsightsBtnProps } from "@/utils";

// STYLES //
import styles from "@/styles/sections/resources/webinar/WebinarRecording.module.scss";

// IMAGES //
import recording_img from "@/../public/img/resources/webinar/recording_img.jpg";

// DATA //

/** WebinarRecording Section */
export default function WebinarRecording({ data }) {
	const dataForBtn = { postFields: data.postFields || {} };

	return (
		<div className={`${styles.WebinarRecordingBox}`}>
			<img src={recording_img.src} className="width_100 b_r_20" alt="img" />
			<div className={`${styles.content}`}>
				<h5 className="text_lg color_white f_w_s_b pb_30">
					To view the webinar recording <br className="hidden_xs" />
					please fill the form
				</h5>
				<div
					className={`${styles.btnBox}`}
					{...dynamicInsightsBtnProps(dataForBtn, "recordingSectionButton")}
				>
					<Button color="primary" variant="filled" shape="rounded" mode="dark">
						Access Recording
					</Button>
				</div>
			</div>
		</div>
	);
}
