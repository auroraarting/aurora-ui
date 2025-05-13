// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";
import ContentFromCms from "@/components/ContentFromCms";

// SECTIONS //

// PLUGINS //

// UTILS //
import formatDate, { formatTitleForEpisode } from "@/utils";

// STYLES //
import styles from "@/styles/sections/resources/energy-talks/EnergyInsideTopSection.module.scss";

// IMAGES //
import energy_logo from "@/../public/img/energy_talks/energy_logo.jpg";
// import other_logo from "@/../public/img/energy_talks/other.png";
import other_logo from "/public/img/icons/amazon-music-icon.svg";
import googleVoice from "@/../public/img/energy_talks/google_voice.png";
import spotify from "@/../public/img/energy_talks/spotify.svg";
import apple from "@/../public/img/energy_talks/apple.svg";
import google from "@/../public/img/energy_talks/google.svg";
import calender from "@/../public/img/icons/calender.svg";
import share from "@/../public/img/resources/aurora_insights/share.svg";
import black_clock from "@/../public/img/icons/black_clock.svg";

// DATA //

/** EnergyInsideTopSection Section */
export default function EnergyInsideTopSection({ data }) {
	return (
		<section className={`${styles.EnergyInsideTopSection} `}>
			<div className="container">
				<div className={`${styles.card} f_w_j`}>
					<div className={`${styles.content}`}>
						<h2 className="text_lg color_secondary text_uppercase f_w_m pt_30">
							<ContentFromCms>{formatTitleForEpisode(data?.title)}</ContentFromCms>
						</h2>
						<div className={`${styles.dateFlex} f_r_a_center pt_10`}>
							<p className="text_xs f_w_m color_medium_gray text_uppercase f_r_a_center">
								<img
									src={calender.src}
									className={`${styles.calender}`}
									alt="calender"
								/>
								<span>{formatDate(data?.podcastFields?.date)}</span>
							</p>
							{data?.podcastFields?.time && (
								<p className="text_xs f_w_m color_medium_gray text_uppercase f_r_a_center">
									<img
										src={black_clock.src}
										className={`${styles.calender}`}
										alt="calender"
									/>
									<span>
										{/* 28 min 24 sec */}
										{data?.podcastFields?.time}
									</span>
								</p>
							)}
						</div>
					</div>
					{data?.featuredImage?.node?.mediaItemUrl && (
						<div className={`${styles.imageWrapper}`}>
							<img
								src={data?.featuredImage?.node?.mediaItemUrl}
								className="width_100 b_r_20"
								alt="img"
							/>
						</div>
					)}
				</div>
				<div className={`${styles.dateBox}`}>
					<div className={`${styles.downloadListenBox} f_w_j a_center`}>
						<div className={`${styles.downloadListen}`}>
							<div className={`${styles.downloadBox} f_r_a_center`}>
								<p className="text_xs f_w_m font_primary color_secondary text_uppercase">
									Stream on
								</p>
								{data?.podcastFields?.spotifyLink && (
									<a
										href={data?.podcastFields?.spotifyLink}
										target="_blank"
										rel="noreferrer"
									>
										<img src={spotify.src} alt="spotify" />
									</a>
								)}
								{data?.podcastFields?.appleLink && (
									<a
										href={data?.podcastFields?.appleLink}
										target="_blank"
										rel="noreferrer"
									>
										<img src={apple.src} alt="apple" />
									</a>
								)}
								{data?.podcastFields?.youtubeLink && (
									<a
										href={data?.podcastFields?.youtubeLink}
										target="_blank"
										rel="noreferrer"
									>
										<img src={google.src} alt="google" />
									</a>
								)}
								{data?.podcastFields?.googleLink && (
									<a
										href={data?.podcastFields?.googleLink}
										target="_blank"
										rel="noreferrer"
									>
										<img src={googleVoice.src} alt="google" />
									</a>
								)}
								{data?.podcastFields?.otherLink && (
									<a
										href={data?.podcastFields?.otherLink}
										target="_blank"
										rel="noreferrer"
									>
										<img src={other_logo.src} alt="google" />
									</a>
								)}
							</div>
						</div>
						<div className={`${styles.downloadListenShare} f_r_a_center`}>
							<a href="" className="text_sm f_w_m font_primary f_r_a_center">
								<img src={share.src} alt="share" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
