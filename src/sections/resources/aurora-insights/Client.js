/* eslint-disable @next/next/no-html-link-for-pages */
// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //
import { LinkedinShareButton, TwitterShareButton } from "react-share";

// UTILS //

// STYLES //
import styles from "@/styles/sections/resources/aurora-insights/Client.module.scss";

// IMAGES //
import webinar_logo from "@/../public/img/icons/webinarIcon.png";
import podcast_logo from "@/../public/img/icons/podcastIcon.png";

import author_logo from "@/../public/img/resources/aurora_insights/author_logo.png";
import social_icon from "@/../public/img/resources/aurora_insights/social_icon.svg";
import origin from "@/../public/img/resources/aurora_insights/origin.png";
import linkedin from "@/../public/img/resources/aurora_insights/linkedin.svg";
import twitter from "@/../public/img/resources/aurora_insights/twitter.svg";
import tag_download_icon from "@/../public/img/resources/aurora_insights/tag_download_icon.svg";
import amun_hover_logo from "@/../public/img/energy_talks/amun_hover_logo.png";
import white_arrow from "@/../public/img/energy_talks/white_arrow.svg";
import { dynamicInsightsBtnProps } from "@/utils";

// DATA //

/** Client Section */
export default function Client({ data }) {
	console.log(data, "data");
	return (
		<div className={`${styles.ClientBox}`}>
			{(data?.postFields?.client ||
				data?.postFields?.authors?.nodes ||
				data?.postFields?.poweredBy?.nodes) && (
				<div className={`${styles.whiteBox}`}>
					{data?.postFields?.client && (
						<div className={`${styles.itemBox}`}>
							<h5 className="text_reg color_gray f_w_b pb_10">Client</h5>
							{data?.postFields?.client?.map((item, ind) => {
								return (
									<div className={`${styles.ClientFlex} f_r_a_center`} key={item?.title}>
										{item?.image?.node?.mediaItemUrl && (
											<div className={`${styles.ClientLogo}`}>
												<img src={item?.image?.node?.mediaItemUrl} alt={item?.title} />
											</div>
										)}
										<div className={`${styles.ClientDescription}`}>
											<p className="text_xs font_primary">{item?.title}</p>
										</div>
									</div>
								);
							})}
						</div>
					)}
					{data?.postFields?.authors?.nodes && (
						<div className={`${styles.itemBox}`}>
							<h5 className="text_reg color_gray f_w_b pb_10">
								{data?.postFields?.authors?.nodes?.length > 1 ? "Authors" : "Author"}
							</h5>
							{data?.postFields?.authors?.nodes?.map((item, ind) => {
								return (
									<div className={`${styles.ClientFlex} f_r_a_center`} key={item?.title}>
										{item?.postAuthors?.thumbnail?.image?.node?.mediaItemUrl && (
											<div className={`${styles.ClientLogo}`}>
												<img
													src={item?.postAuthors?.thumbnail?.image?.node?.mediaItemUrl}
													alt="Authors image"
												/>
											</div>
										)}
										<div className={`${styles.ClientDescription}`}>
											<h5 className="text_reg font_primary color_gray f_w_m font_primary">
												{item?.title}
											</h5>
											<p className="text_xs f_w_l">
												{item?.postAuthors?.thumbnail?.designation}
											</p>
											{item?.postAuthors?.thumbnail?.linkedinLink && (
												<a
													href={item?.postAuthors?.thumbnail?.linkedinLink}
													target="_blank"
													rel="noreferrer"
													className={`${styles.social}`}
												>
													<img src={social_icon.src} alt="social icon" />
												</a>
											)}
										</div>
									</div>
								);
							})}
						</div>
					)}
					{data?.postFields?.poweredBy?.nodes && (
						<div className={`${styles.itemBox}`}>
							<h5 className="text_reg color_gray f_w_b pb_10">Powered by</h5>
							{data?.postFields?.poweredBy?.nodes?.map((item, ind) => {
								/**keyModule  */
								const keyModule = () => {
									if (item?.contentType?.node?.name === "softwares") {
										return "software";
									}
									if (item?.contentType?.node?.name === "services") {
										return "service";
									}
									return item?.contentType?.node?.name;
								};
								return (
									<div className={`${styles.poweredBy}`} key={item?.title}>
										<a
											href={`/${keyModule()}/${item?.slug}`}
											target="_blank"
											rel="noreferrer"
										>
											<div
												className={`${styles.poweredLogo}`}
												style={{
													background:
														item?.[item?.contentType?.node?.name]?.thumbnail?.primaryColor,
												}}
											>
												<img
													src={
														item?.[item?.contentType?.node?.name]?.banner?.logo?.node
															?.mediaItemUrl
													}
													className={`${styles.amun_logo}`}
													alt="software logo"
												/>
												{/* <img
                                    src={amun_hover_logo.src}
                                    className={`${styles.amun_hover_logo}`}
                                    alt="amun_logo"
                                /> */}

												<span className="f_r_aj_between text_xxs text_uppercase">
													Know More
													<img src={white_arrow.src} className="" alt="amun_logo" />
												</span>
											</div>
										</a>
									</div>
								);
							})}
						</div>
					)}
				</div>
			)}
			<div className={`${styles.whiteBox} ${styles.bgGreyBox}`}>
				<div className={`${styles.InsideItem}`}>
					{data?.tags?.nodes?.length > 0 && (
						<div className={`${styles.itemBox}`}>
							<h5 className="text_reg color_gray f_w_b pb_10">Tags</h5>
							<div className={`${styles.ClientFlex} f_w`}>
								{data?.tags?.nodes?.map((item) => {
									return (
										<a
											key={item?.title || item?.name || item}
											className={`${styles.tagLinks} text_xxs f_w_m color_light_gray`}
											href={`/resources/aurora-insights?search=${
												item?.title || item?.name || item
											}`}
										>
											{item?.title || item?.name || item}
										</a>
									);
								})}
							</div>
						</div>
					)}

					<div className={`${styles.itemBox}`}>
						<h5 className="text_reg color_gray f_w_b pb_10">Share</h5>
						<div className={`${styles.ClientFlex} f_r_a_center`}>
							<a className={`${styles.shareIcon}`}>
								<LinkedinShareButton url={window.location.href}>
									<img src={linkedin.src} alt="linkedin" />
								</LinkedinShareButton>
							</a>

							<a className={`${styles.shareIcon}`}>
								<TwitterShareButton url={window.location.href}>
									<img src={twitter.src} alt="twitter" />
								</TwitterShareButton>
							</a>
						</div>
					</div>
				</div>
				{dynamicInsightsBtnProps(data, "bottomSectionButton").btntext && (
					<div className={`${styles.DownBtn} `}>
						<a
							{...dynamicInsightsBtnProps(data, "bottomSectionButton")}
							className="text_sm f_w_m font_primary f_r_a_center"
						>
							<img src={tag_download_icon.src} alt="download" />
							<span>
								{dynamicInsightsBtnProps(data, "bottomSectionButton").btntext}
							</span>
						</a>
					</div>
				)}
			</div>
			<div className={`${styles.whiteBox}`}>
				<div className={`${styles.itemBox}`}>
					<div className={`${styles.ClientFlex} f_r_a_center`}>
						<div className={`${styles.ClientLogo}`}>
							<img src={webinar_logo.src} alt="Shaping the energy discussion" />
						</div>
						<div className={`${styles.ClientDescription}`}>
							<p className="text_reg font_primary">Shaping the energy discussion</p>
							<a href="/resources/webinar" className={`${styles.btn_box} `}>
								<Button color="secondary" variant="underline">
									View webinars
								</Button>
							</a>
						</div>
					</div>
				</div>
			</div>
			<div className={`${styles.whiteBox}`}>
				<div className={`${styles.itemBox}`}>
					<div className={`${styles.ClientFlex} f_r_a_center`}>
						<div className={`${styles.ClientLogo}`}>
							<img src={podcast_logo.src} alt="Energy unplugged by Aurora" />
						</div>
						<div className={`${styles.ClientDescription}`}>
							<p className="text_reg font_primary">Energy unplugged by Aurora</p>
							<a href="/resources/energy-talks" className={`${styles.btn_box} `}>
								<Button color="secondary" variant="underline">
									View all podcasts
								</Button>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
