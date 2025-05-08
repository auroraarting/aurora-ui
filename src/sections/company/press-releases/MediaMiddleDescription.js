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
import { slugify } from "@/utils";

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
					</section>
				);
			})}
		</div>
	);
}
