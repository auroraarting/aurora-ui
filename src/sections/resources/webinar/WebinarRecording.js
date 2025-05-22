// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //
import { dynamicInsightsBtnProps } from "@/utils";
import { formatWebinarDateTime } from "@/utils/Client";

// STYLES //
import styles from "@/styles/sections/resources/webinar/WebinarRecording.module.scss";

// IMAGES //
import recording_img from "@/../public/img/resources/webinar/recording_img.jpg";
import ContentFromCms from "@/components/ContentFromCms";

// DATA //

/** WebinarRecording Section */
export default function WebinarRecording({ data }) {
	const dataForBtn = { postFields: data?.webinarsFields || {} };

	if (
		!dynamicInsightsBtnProps(dataForBtn, "accessRecordingSectionButton")?.btntext
	)
		return <></>;

	return (
		<div className="pt_60">
			<section
				id="recording"
				data-name="Recording"
				className={`${styles.WebinarRecordingBox}`}
			>
				{data.webinarsFields?.accessRecordingSectionButton?.thumb?.node
					?.mediaItemUrl && (
					<img
						src={
							data.webinarsFields?.accessRecordingSectionButton?.thumb?.node
								?.mediaItemUrl
						}
						className="width_100 b_r_20"
						alt="img"
					/>
				)}
				<div className={`${styles.content}`}>
					{data.webinarsFields.accessRecordingSectionButton.thumbtext && (
						<h5 className="text_lg color_white f_w_s_b pb_30">
							<ContentFromCms>
								{data.webinarsFields.accessRecordingSectionButton.thumbtext}
							</ContentFromCms>
						</h5>
					)}
					<div
						className={`${styles.btnBox}`}
						{...dynamicInsightsBtnProps(dataForBtn, "accessRecordingSectionButton")}
					>
						<Button color="primary" variant="filled" shape="rounded" mode="dark">
							{
								dynamicInsightsBtnProps(dataForBtn, "accessRecordingSectionButton")
									?.btntext
							}
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
}
