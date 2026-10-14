"use client";
// MODULES //
import { useEffect, useRef, useState } from "react";

// COMPONENTS //
import Vimeo from "@/components/VimeoPlayer";

// SECTIONS //

// PLUGINS //
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// UTILS //

// STYLES //
// (styles module is passed in by the parent banner so each page keeps its look)

// IMAGES //
import mac_img from "/public/img/softwares/mac_img.png";
import DefaultBanner from "/public/img/banner/defaultDesktopBanner.jpg";
import DefaultBannerMob from "/public/img/banner/defaultMobileBanner.jpg";
import pause_button from "/public/img/icons/pause_button.svg";
import play_button from "/public/img/icons/video_play.svg";
import slider_arr from "/public/img/slider_arr_left.svg";

// DATA //

/** Build an embeddable YouTube URL (JS API enabled, no autoplay) from a watch/share/embed link or id. */
const getYouTubeEmbed = (link) => {
	if (!link) return null;
	const clean = String(link).trim();
	const match = clean.match(
		/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/))([\w-]+)/
	);
	const id = match ? match[1] : /^[\w-]{6,}$/.test(clean) ? clean : null;
	if (!id) return null;
	return `https://www.youtube.com/embed/${id}?enablejsapi=1&loop=1&playlist=${id}&controls=0&playsinline=1&rel=0`;
};

/**
 * Normalize the ACF `videos` repeater (max 3 rows) into a render-ready list.
 * Each row is one of: uploaded file / Vimeo link / YouTube link.
 * Falls back to a single legacy `vimeoLink` when no repeater rows exist.
 */
const normalizeVideos = (videos, vimeoLink) => {
	const rows = Array.isArray(videos) ? videos : [];
	const items = rows
		.map((row) => {
			const type = String(row?.videoType || "").toLowerCase();
			if (type === "upload" || type === "file") {
				return { kind: "file", src: row?.videoFile?.node?.mediaItemUrl };
			}
			if (type === "vimeo") {
				return { kind: "vimeo", src: row?.vimeoLink };
			}
			if (type === "youtube") {
				return { kind: "youtube", src: getYouTubeEmbed(row?.youtubeLink) };
			}
			return null;
		})
		.filter((item) => item && item.src)
		.slice(0, 3);

	// Backwards compatibility: single legacy vimeoLink when no repeater is set.
	if (!items.length && vimeoLink) {
		items.push({ kind: "vimeo", src: vimeoLink });
	}

	return items;
};

/** Send a play/pause command to a YouTube iframe via the IFrame API. */
const postYouTube = (iframe, func) => {
	try {
		iframe?.contentWindow?.postMessage(
			JSON.stringify({ event: "command", func, args: [] }),
			"*"
		);
	} catch (e) {
		/* iframe not ready yet – ignored */
	}
};

/** Render a single video (by kind) plus its play/pause toggle. Playback is driven by `isActive`. */
function BannerVideo({ item, isActive, onToggle, styles }) {
	const videoRef = useRef(null);
	const iframeRef = useRef(null);

	// Uploaded file: drive the native <video> element.
	useEffect(() => {
		if (item.kind !== "file") return;
		const el = videoRef.current;
		if (!el) return;
		if (isActive) {
			el.play?.().catch(() => {
				/* play may be blocked until a further user gesture */
			});
		} else {
			el.pause?.();
		}
	}, [isActive, item.kind]);

	// YouTube: drive the iframe through the postMessage API.
	useEffect(() => {
		if (item.kind !== "youtube") return;
		postYouTube(iframeRef.current, isActive ? "playVideo" : "pauseVideo");
	}, [isActive, item.kind]);

	let media;
	if (item.kind === "file") {
		media = (
			<video
				ref={videoRef}
				className={`${styles.vimeoPlayer}`}
				playsInline
				loop
				preload="metadata"
			>
				<source src={item.src} type="video/mp4" />
			</video>
		);
	} else if (item.kind === "youtube") {
		media = (
			<iframe
				ref={iframeRef}
				className={`${styles.vimeoPlayer}`}
				src={item.src}
				title="Product video"
				loading="lazy"
				frameBorder="0"
				allow="autoplay; fullscreen; picture-in-picture"
				onLoad={() => {
					if (isActive) postYouTube(iframeRef.current, "playVideo");
				}}
				allowFullScreen
			/>
		);
	} else {
		media = (
			<Vimeo
				className={`${styles.vimeoPlayer}`}
				video={item.src}
				paused={!isActive}
				controls={false}
				loop
			/>
		);
	}

	return (
		<div className={`${styles.videoSlide}`}>
			{media}
			<button
				type="button"
				className={`${styles.playPauseBtn}`}
				onClick={onToggle}
				aria-label={isActive ? "Pause video" : "Play video"}
			>
				<img
					src={(isActive ? pause_button : play_button).src}
					alt={isActive ? "Pause" : "Play"}
				/>
			</button>
		</div>
	);
}

/**
 * BannerVideoSlider
 * Shows up to 3 videos in a slider inside the mac frame. Videos start paused;
 * only one plays at a time (playing one pauses the others, and swiping to
 * another slide pauses playback). When there are no videos it falls back to the
 * banner image (no slider), matching the previous single-item behaviour.
 */
export default function BannerVideoSlider({
	styles,
	videos,
	vimeoLink,
	desktopImage,
	mobileImage,
}) {
	const items = normalizeVideos(videos, vimeoLink);
	// Index of the video currently playing (null = all paused).
	const [activeIndex, setActiveIndex] = useState(null);
	// Whether the slider is at the first / last slide (used to dim the nav arrows).
	const [isBeginning, setIsBeginning] = useState(true);
	const [isEnd, setIsEnd] = useState(false);
	const swiperRef = useRef(null);

	/** Sync the beginning/end flags from the Swiper instance. */
	const syncEdges = (swiper) => {
		setIsBeginning(swiper.isBeginning);
		setIsEnd(swiper.isEnd);
	};

	if (!items.length) {
		return (
			<div className={`${styles.banner_image} next_image`}>
				<picture>
					<source
						srcSet={desktopImage ? desktopImage : DefaultBanner.src}
						media="(min-width:767px)"
					/>
					<img
						src={mobileImage ? mobileImage : DefaultBannerMob.src}
						alt="Banner Image"
					/>
				</picture>
			</div>
		);
	}

	const hasMultiple = items.length > 1;

	/** Play this video (pausing any other), or pause it if it is already playing. */
	const handleToggle = (ind) =>
		setActiveIndex((prev) => (prev === ind ? null : ind));

	return (
		<div className={`${styles.macFrameBox} f_r_aj_center`}>
			<img src={mac_img.src} alt="mac img" className={`${styles.mac_img}`} />
			<div className={`${styles.frame_video}`}>
				<Swiper
					slidesPerView={1}
					spaceBetween={0}
					grabCursor={hasMultiple}
					onSwiper={(swiper) => {
						swiperRef.current = swiper;
						syncEdges(swiper);
					}}
					// Pause playback whenever the user moves to another slide.
					onSlideChange={(swiper) => {
						setActiveIndex(null);
						syncEdges(swiper);
					}}
					className={`${styles.videoSlider}`}
				>
					{items.map((item, ind) => (
						<SwiperSlide key={ind}>
							<BannerVideo
								item={item}
								isActive={activeIndex === ind}
								onToggle={() => handleToggle(ind)}
								styles={styles}
							/>
						</SwiperSlide>
					))}
				</Swiper>
				{hasMultiple && (
					<div className={`${styles.videoNav}`}>
						<button
							type="button"
							className={`${styles.navBtn} ${
								isBeginning ? styles.navDisabled : ""
							}`}
							onClick={() => swiperRef.current?.slidePrev()}
							disabled={isBeginning}
							aria-label="Previous video"
						>
							<img src={slider_arr.src} alt="Previous" />
						</button>
						<button
							type="button"
							className={`${styles.navBtn} ${styles.navNext} ${
								isEnd ? styles.navDisabled : ""
							}`}
							onClick={() => swiperRef.current?.slideNext()}
							disabled={isEnd}
							aria-label="Next video"
						>
							<img src={slider_arr.src} alt="Next" />
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
