"use client";
// MODULES //

// COMPONENTS //
import InnerBanner from "@/components/InnerBanner";
import Insights from "@/components/Insights";
import SoftwareCards from "@/components/SoftwareCards";

// SECTIONS //
import VideosListing from "@/sections/resources/videos/VideosListing";

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/events/events.module.scss";

// IMAGES //

// SERVICES //

// DATA //

/** Videos Page */
export default function VideosWrap({ data, topics, countries }) {
	return (
		<div>
			{/* Page Content starts here */}
			<main className={styles.eventsPage}>
				<div className={`${styles.gradient} gradient`}>
					<div className={`${styles.topBg}`}>
						<InnerBanner
							bannerTitle="Videos"
							bannerDescription="Watch our latest videos on energy markets and insights."
							showContentOnly
						/>
					</div>
				</div>
				<div className="pt_60">
					<VideosListing
						data={data}
						topics={topics}
						years={Array(new Date().getFullYear() - 2023)
							.fill(null)
							.map((_, ind) => {
								return { title: 2024 + ind };
							})
							.reverse()}
						countries={countries}
					/>
				</div>
				<div className={`${styles.containerCustom} pb_100`}>
					<div className="container">
						<Insights isPowerBgVisible={true} />
					</div>
				</div>
				<div className="pb_100">
					<SoftwareCards />
				</div>
			</main>
			{/* Page Content ends here */}
		</div>
	);
}
