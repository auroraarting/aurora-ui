// MODULES //

// COMPONENTS //
import ContentFromCms from "@/components/ContentFromCms";
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/company/press-releases/MediaMiddleDescription.module.scss";

// IMAGES //
import plant_img from "@/../public/img/resources/aurora_insights/plant_img.jpg";
import graph_img from "@/../public/img/resources/aurora_insights/graph_img.png";
import { dynamicInsightsBtnProps, slugify } from "@/utils";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

// DATA //

/** MediaMiddleDescription Section */
export default function MediaMiddleDescription({ data }) {
	return (
		<div className={`${styles.contentBox}`}>
			{/* <ContentFromCms>{data?.content}</ContentFromCms> */}
			{data?.content && (
				<section id="overview" data-name="Overview">
					<ContentFromCms>{data?.content}</ContentFromCms>
				</section>
			)}
			{data?.postFields?.sections?.map((item) => {
				return (
					<section
						key={item?.sectionTitle}
						id={slugify(item?.sectionTitle)}
						data-name={item?.sectionTitle}
					>
						<ContentFromCms>{item?.content}</ContentFromCms>
						{item?.lottie?.node?.mediaItemUrl && (
							<DotLottieReact
								src={item?.lottie?.node?.mediaItemUrl}
								autoplay={true}
								loop={true}
								renderer="svg"
								renderersettings={{
									preserveAspectRatio: "xMidYMid meet",
								}}
							/>
						)}
						<div className="cmsButtonsWrap">
							{item?.buttons?.map((btnItem) => {
								const dataForBtn = {
									postFields: { btnItem: btnItem } || {},
								};
								console.log(
									dynamicInsightsBtnProps(dataForBtn, "btnItem"),
									"dataForBtn"
								);

								return (
									<div
										{...dynamicInsightsBtnProps(dataForBtn, "btnItem")}
										key="btn"
										to="Insights"
										className="cmsbuttons"
									>
										<Button color="primary" variant="filled" shape="rounded">
											{dynamicInsightsBtnProps(dataForBtn, "btnItem").btntext}
										</Button>
									</div>
								);
							})}
						</div>
					</section>
				);
			})}
		</div>
	);
}
