"use client";
/* eslint-disable quotes */
// MODULES //
import { useEffect, useState } from "react";
import parse from "html-react-parser";

// COMPONENTS //
import SectionsHeader from "@/components/SectionsHeader";
import VimeoPlayer from "@/components/VimeoPlayer";
import { ConnectButton, DemoButton } from "@/sections/eos-mcp/EosMcpButtons";

// STYLES //
import styles from "@/styles/pages/EosMcpResources.module.scss";

// IMAGES //
import logo from "/public/img/eos-mcp/logo.png";
import heroImg from "/public/img/eos-mcp/resource-homepage.png";
import diagramImg from "/public/img/eos-mcp/mcp-diagram.png";

/** Google Drive file id from any of Drive's share-link shapes. */
const driveFileId = (link) => {
	if (!link) return null;
	const pathMatch = link.match(/\/d\/([a-zA-Z0-9_-]+)/);
	if (pathMatch) return pathMatch[1];
	const queryMatch = link.match(/[?&]id=([a-zA-Z0-9_-]+)/);
	return queryMatch ? queryMatch[1] : null;
};

/** Drive's public thumbnail endpoint — works for files shared "anyone with the link". */
const driveThumbnail = (link) => {
	const id = driveFileId(link);
	return id ? `https://drive.google.com/thumbnail?id=${id}&sz=w1000` : null;
};

/** Drive's embeddable preview player, used inside the popup. */
const drivePreviewUrl = (link) => {
	const id = driveFileId(link);
	return id ? `https://drive.google.com/file/d/${id}/preview` : null;
};

/** Whether a video has something to actually play in the popup. */
const isPlayable = (video) => Boolean(video?.vimeoId || video?.driveLink);
/** Thumbnail image for a video, falling back to Drive's thumbnail endpoint. */
const thumbnailFor = (video) => video?.thumbnail || driveThumbnail(video?.driveLink);

/** VideoModal — plays a video's Vimeo embed or Drive preview over the page */
function VideoModal({ video, onClose }) {
	useEffect(() => {
		/** Close the popup on Escape. */
		const onKeyDown = (e) => e.key === "Escape" && onClose();
		document.addEventListener("keydown", onKeyDown);
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", onKeyDown);
			document.body.style.overflow = "";
		};
	}, [onClose]);

	if (!video) return null;

	const previewUrl = !video.vimeoId && drivePreviewUrl(video.driveLink);

	return (
		<div className={styles.videoModalOverlay} onClick={onClose}>
			<div className={styles.videoModalBox} onClick={(e) => e.stopPropagation()}>
				<button
					type="button"
					className={styles.videoModalClose}
					onClick={onClose}
					aria-label="Close video"
				>
					&times;
				</button>
				<div className={styles.videoModalPlayer}>
					{video.vimeoId ? (
						<VimeoPlayer
							key={video.vimeoId}
							video={video.vimeoId}
							autoplay
							responsive
							className={styles.videoModalEmbed}
						/>
					) : (
						previewUrl && (
							<iframe
								src={previewUrl}
								title={video.title}
								className={styles.videoModalEmbed}
								allow="autoplay; fullscreen"
								allowFullScreen
							/>
						)
					)}
				</div>
			</div>
		</div>
	);
}

/** VideoLibrary — filter chips, a main stage and a playlist that drives it */
function VideoLibrary({ videoFilters, videos }) {
	// Only offer filters that have at least one video behind them
	const filters = [
		"All",
		...videoFilters.filter((f) => videos.some((v) => v.category === f)),
	];
	const [filter, setFilter] = useState("All");
	const [activeTitle, setActiveTitle] = useState(videos[0]?.title);
	const [openVideo, setOpenVideo] = useState(null);

	const list =
		filter === "All" ? videos : videos.filter((v) => v.category === filter);
	const active = list.find((v) => v.title === activeTitle) || list[0];

	return (
		<>
			<div className={styles.videoFilters}>
				{filters.map((item) => (
					<button
						key={item}
						type="button"
						className={`${styles.filterChip} ${filter === item ? styles.active : ""}`}
						onClick={() => setFilter(item)}
					>
						{item}
					</button>
				))}
			</div>

			<div className={styles.videoLibrary}>
				<div className={styles.videoStage}>
					<div
						className={styles.stageThumb}
						role={isPlayable(active) ? "button" : undefined}
						tabIndex={isPlayable(active) ? 0 : undefined}
						onClick={() => isPlayable(active) && setOpenVideo(active)}
						onKeyDown={(e) => {
							if (isPlayable(active) && (e.key === "Enter" || e.key === " ")) {
								e.preventDefault();
								setOpenVideo(active);
							}
						}}
					>
						{thumbnailFor(active) && (
							<img src={thumbnailFor(active)} alt={`Video preview: ${active?.title}`} />
						)}
						{isPlayable(active) && <span className={styles.playBtn}>&#9654;</span>}
						{active?.duration && (
							<span className={styles.durationBadge}>{active.duration}</span>
						)}
					</div>
					<div className={styles.stageMeta}>
						<div className={`${styles.stageTitle} font_primary`}>{active?.title}</div>
						<div className={styles.stageDesc}>{active?.description}</div>
					</div>
				</div>

				<div
					className={styles.playlist}
					role="list"
					aria-label="Use case videos"
					data-lenis-prevent
				>
					{list.map((item) => (
						<button
							key={item.title}
							type="button"
							role="listitem"
							className={`${styles.playlistItem} ${item === active ? styles.isActive : ""}`}
							onClick={() => setActiveTitle(item.title)}
						>
							<span className={styles.playlistThumb}>
								{thumbnailFor(item) && <img src={thumbnailFor(item)} alt="" />}
								{isPlayable(item) && <span className={styles.playBtn}>&#9654;</span>}
							</span>
							<span className={styles.playlistInfo}>
								<span className={styles.playlistTitle}>{item.title}</span>
								<span className={styles.playlistDuration}>{item.duration}</span>
							</span>
						</button>
					))}
				</div>
			</div>

			<VideoModal video={openVideo} onClose={() => setOpenVideo(null)} />
		</>
	);
}

/** Faqs — first item open, any number open at once */
function Faqs({ faqs }) {
	const [open, setOpen] = useState([0]);

	/** toggle */
	const toggle = (ind) =>
		setOpen((prev) =>
			prev.includes(ind) ? prev.filter((i) => i !== ind) : [...prev, ind],
		);

	return (
		<div>
			{faqs.map((item, ind) => (
				<div
					key={item.question}
					className={`${styles.faqItem} ${open.includes(ind) ? styles.open : ""}`}
				>
					<button
						type="button"
						className={`${styles.faqQ} font_primary`}
						aria-expanded={open.includes(ind)}
						onClick={() => toggle(ind)}
					>
						<span>{item.question}</span>
						<span className={styles.plus}>+</span>
					</button>
					<div className={styles.faqA}>
						<p>{item.answer}</p>
					</div>
				</div>
			))}
		</div>
	);
}

/** EOS MCP Resources Page — `data` is normalised by getEosMcpResourcesPage */
export default function EosMcpResourcesWrap({ data }) {
	const {
		buttons,
		banner,
		intelligenceLayer,
		whatIsMcp,
		useCases,
		gettingStarted,
		bestPractices,
		faqs,
		finalCta,
	} = data;

	const ctaButtons = (
		<>
			<ConnectButton href={buttons.connectUrl} color="primary_yellow" mode="light">
				{buttons.connectButtonText}
			</ConnectButton>
			<DemoButton href={buttons.demoUrl}>{buttons.demoButtonText}</DemoButton>
		</>
	);

	return (
		<main className={styles.EosMcpResourcesPage}>
			{/* Hero */}
			<div className={styles.hero}>
				<div className={`container ${styles.heroGrid}`}>
					<div>
						<h1 className="text_xl font_primary f_w_b text_uppercase color_white">
							{banner.title}
						</h1>
						<p className={`${styles.lead} text_reg`}>{banner.description}</p>
						<div className={styles.ctaRow}>{ctaButtons}</div>
					</div>
					<div className={styles.heroMedia}>
						<img
							src={banner.image || heroImg.src}
							alt="EOS MCP connected inside an AI assistant, showing French nuclear generation analysis"
						/>
					</div>
				</div>
			</div>

			<SectionsHeader />

			{/* 1. The new intelligence layer */}
			<section id="intelligence-layer" data-name="Introduction">
				<div className="container">
					{intelligenceLayer.kicker && (
						<div className={styles.kicker}>{intelligenceLayer.kicker}</div>
					)}
					<h2 className={`${styles.sectionTitle} text_lg font_primary`}>
						{intelligenceLayer.title}
					</h2>
					<div className={styles.layerContent}>{parse(intelligenceLayer.content)}</div>
					<div className={styles.statsRow}>
						{intelligenceLayer.stats.map((item) => (
							<div className={styles.statCard} key={item.number}>
								<div className={`${styles.num} font_primary`}>{item.number}</div>
								<div className={styles.label}>{item.label}</div>
							</div>
						))}
					</div>
					<div className={styles.introBanner}>
						<p className="font_primary">{intelligenceLayer.highlightText}</p>
						<img
							className={styles.introLogo}
							src={intelligenceLayer.logo || logo.src}
							alt="EOS MCP logo"
						/>
					</div>
				</div>
			</section>

			{/* 2. What is MCP */}
			<section className={styles.tint} id="what-is-mcp" data-name="What is an MCP?">
				<div className="container">
					<div className={styles.kicker}>{whatIsMcp.kicker}</div>
					<p className={`${styles.definition} font_primary`}>
						{parse(whatIsMcp.definition)}
					</p>
					<p className={styles.practiceLine}>{whatIsMcp.description}</p>
					<img
						className={styles.diagram}
						src={whatIsMcp.diagram || diagramImg.src}
						alt="Diagram: Aurora IP sources connect through EOS MCP into your AI tool"
					/>
					<div className={styles.doesGrid}>
						<div className={styles.doesCol}>
							<h3 className={styles.does}>{whatIsMcp.doesTitle}</h3>
							<ul>
								{whatIsMcp.does.map((item) => (
									<li key={item}>
										<span className={`${styles.mark} ${styles.yes}`}>&#10003;</span>
										{item}
									</li>
								))}
							</ul>
						</div>
						<div className={`${styles.doesCol} ${styles.doesnt}`}>
							<h3>{whatIsMcp.doesntTitle}</h3>
							<ul>
								{whatIsMcp.doesnt.map((item) => (
									<li key={item}>
										<span className={`${styles.mark} ${styles.no}`}>&#10005;</span>
										{item}
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</section>

			{/* 3. Use cases */}
			<section className={styles.tint} id="use-cases" data-name="Use Cases">
				<div className="container">
					<div className={styles.kicker}>{useCases.kicker}</div>
					<h2 className={`${styles.sectionTitle} text_lg font_primary`}>
						{useCases.title}
					</h2>
					<p className={styles.sectionSub}>{useCases.description}</p>
					<VideoLibrary videoFilters={useCases.filters} videos={useCases.videos} />
				</div>
			</section>

			{/* 4. Getting started */}
			<section
				className={styles.tint}
				id="getting-started"
				data-name="Getting Started"
			>
				<div className="container">
					<div className={styles.kicker}>{gettingStarted.kicker}</div>
					<h2 className={`${styles.sectionTitle} text_lg font_primary`}>
						{gettingStarted.title}
					</h2>
					<div className={styles.steps}>
						{gettingStarted.steps.map((item, ind) => (
							<div className={styles.stepCard} key={item.text}>
								<div className={`${styles.stepNum} font_primary`}>
									{String(ind + 1).padStart(2, "0")}
								</div>
								{item.image && (
									<img className={styles.stepImg} src={item.image} alt="" />
								)}
								<p>{item.text}</p>
								<span className={styles.stepTime}>{item.time}</span>
								{ind < gettingStarted.steps.length - 1 && (
									<span className={styles.stepLink}></span>
								)}
							</div>
						))}
					</div>
					<div className={styles.gettingStartedCta}>
						<ConnectButton href={buttons.connectUrl}>
							{gettingStarted.buttonText}
						</ConnectButton>
					</div>
				</div>
			</section>

			{/* 5. Best practices */}
			<section id="best-practices" data-name="Best Practices">
				<div className="container">
					<div className={styles.kicker}>{bestPractices.kicker}</div>
					<h2 className={`${styles.sectionTitle} text_lg font_primary`}>
						{bestPractices.title}
					</h2>
					{bestPractices.items.map((item, ind) => (
						<div
							key={item.index}
							className={`${styles.practice} ${ind % 2 ? styles.reverse : ""}`}
						>
							<div className={styles.pText}>
								<div className={`${styles.pIndex} font_primary`}>{item.index}</div>
								<h3 className={`${styles.pTitle} font_primary`}>{item.title}</h3>
								<p className={styles.pDesc}>{item.description}</p>
								<div className={styles.pBenefit}>
									<strong>Benefit:</strong> {item.benefit}
								</div>
							</div>
							<div className={styles.sayBox}>
								<span className={styles.sayLabel}>{item.sayLabel}</span>
								{item.quotes.map((quote) => (
									<div className={styles.quote} key={quote}>
										{quote}
									</div>
								))}
								{item.note && <div className={styles.note}>{item.note}</div>}
							</div>
						</div>
					))}
				</div>
			</section>

			{/* 6. FAQs */}
			<section id="faqs" data-name="FAQs">
				<div className="container">
					<div className={styles.kicker}>{faqs.kicker}</div>
					<h2 className={`${styles.sectionTitle} text_lg font_primary`}>
						{faqs.title}
					</h2>
					<Faqs faqs={faqs.items} />
				</div>
			</section>

			{/* Final CTA */}
			<section className={styles.finalCta} id="connect">
				<div className="container">
					<h2 className="text_lg font_primary color_white">{finalCta.title}</h2>
					<p className="color_silver_gray">{finalCta.description}</p>
					<div className={`${styles.ctaRow} ${styles.center}`}>{ctaButtons}</div>
				</div>
			</section>
		</main>
	);
}
