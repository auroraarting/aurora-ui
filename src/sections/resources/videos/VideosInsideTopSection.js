// MODULES //

// COMPONENTS //
import ContentFromCms from "@/components/ContentFromCms";

// SECTIONS //

// PLUGINS //

// UTILS //
import formatDate from "@/utils";

// STYLES //
import styles from "@/styles/sections/resources/videos/VideosInsideTopSection.module.scss";

// IMAGES //
import calender from "@/../public/img/icons/calender.svg";
import black_clock from "@/../public/img/icons/black_clock.svg";

// DATA //

/** VideosInsideTopSection Section */
export default function VideosInsideTopSection({ data, socialLinks }) {
	return (
		<section className={`${styles.VideosInsideTopSection} `}>
			<div className="container">
				<div className={`${styles.card} f_w_j`}>
					<div className={`${styles.content}`}>
						<h1 className="text_lg color_secondary text_uppercase f_w_m pt_20">
							<ContentFromCms>{data?.title || ""}</ContentFromCms>
						</h1>
						<div className={`${styles.dateFlex} f_r_a_center pt_10`}>
							<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center">
								<img
									src={calender.src}
									className={`${styles.calender}`}
									alt="calender"
								/>
								<span>{formatDate(data?.videoFields?.date)}</span>
							</p>
							{data?.videoFields?.time && (
								<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center">
									<img
										src={black_clock.src}
										className={`${styles.calender}`}
										alt="calender"
									/>
									<span>{data?.videoFields?.time}</span>
								</p>
							)}
						</div>
						{socialLinks?.length > 0 && (
							<div className={`${styles.dateBox}`}>
								<div className={`${styles.downloadListenBox}  f_w_j a_center`}>
									<div className={`${styles.downloadListen} downloadListen`}>
										<div className={`${styles.downloadBox} downloadBox f_r_a_center`}>
											<p className="text_xs f_w_m font_primary color_secondary text_uppercase">
												Stream on
											</p>
											{socialLinks?.map((item) => {
												return (
													<a key={item.url} href={item.url} target="_blank" rel="noreferrer">
														<img
															src={item?.logo?.node?.mediaItemUrl}
															alt={item?.logo?.node?.altText}
														/>
													</a>
												);
											})}
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
					{/* {data?.videoFields?.thumbnail?.node?.mediaItemUrl && ( */}
					<div className={`${styles.imageWrapper}`}>
						<img
							src={data?.videoFields?.thumbnail?.node?.mediaItemUrl}
							className="width_100 b_r_20"
							alt="featured Image"
						/>
					</div>
					{/* )} */}
				</div>
			</div>
		</section>
	);
}
