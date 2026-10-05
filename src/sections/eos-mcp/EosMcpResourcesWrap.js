"use client";
/* eslint-disable quotes */
// MODULES //
import { useState } from "react";

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

// DATA //
import {
	faqs,
	mcpDoes,
	mcpDoesnt,
	practices,
	stats,
	steps,
	videoFilters,
	videos,
} from "@/data/eosMcpResources";

// Only offer filters that have at least one video behind them
const filters = [
	"All",
	...videoFilters.filter((f) => videos.some((v) => v.category === f)),
];

/** VideoLibrary — filter chips, a main stage and a playlist that drives it */
function VideoLibrary() {
	const [filter, setFilter] = useState("All");
	const [activeTitle, setActiveTitle] = useState(videos[0]?.title);

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
					<div className={styles.stageThumb}>
						{active?.vimeoId ? (
							<VimeoPlayer
								key={active.vimeoId}
								video={active.vimeoId}
								responsive
								className={styles.stagePlayer}
							/>
						) : (
							<>
								<img src={active?.thumb} alt={`Video preview: ${active?.title}`} />
								<span className={styles.playBtn}>&#9654;</span>
								<span className={styles.durationBadge}>{active?.duration}</span>
							</>
						)}
					</div>
					<div className={styles.stageMeta}>
						<div className={`${styles.stageTitle} font_primary`}>{active?.title}</div>
						<div className={styles.stageDesc}>{active?.desc}</div>
					</div>
				</div>

				<div className={styles.playlist} role="list" aria-label="Use case videos">
					{list.map((item) => (
						<button
							key={item.title}
							type="button"
							role="listitem"
							className={`${styles.playlistItem} ${item === active ? styles.isActive : ""}`}
							onClick={() => setActiveTitle(item.title)}
						>
							<span className={styles.playlistThumb}>
								<img src={item.thumb} alt="" />
								<span className={styles.playBtn}>&#9654;</span>
							</span>
							<span className={styles.playlistInfo}>
								<span className={styles.playlistTitle}>{item.title}</span>
								<span className={styles.playlistDuration}>{item.duration}</span>
							</span>
						</button>
					))}
				</div>
			</div>
		</>
	);
}

/** Faqs — first item open, any number open at once */
function Faqs() {
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
					key={item.q}
					className={`${styles.faqItem} ${open.includes(ind) ? styles.open : ""}`}
				>
					<button
						type="button"
						className={`${styles.faqQ} font_primary`}
						aria-expanded={open.includes(ind)}
						onClick={() => toggle(ind)}
					>
						<span>{item.q}</span>
						<span className={styles.plus}>+</span>
					</button>
					<div className={styles.faqA}>
						<p>{item.a}</p>
					</div>
				</div>
			))}
		</div>
	);
}

/** EOS MCP Resources Page */
export default function EosMcpResourcesWrap() {
	return (
		<main className={styles.EosMcpResourcesPage}>
			{/* Hero */}
			<div className={styles.hero}>
				<div className={`container ${styles.heroGrid}`}>
					<div>
						<h1 className="text_xl font_primary f_w_b text_uppercase color_white">
							AI-Powered Energy Workflows
						</h1>
						<p className={`${styles.lead} text_reg`}>
							Learn, explore and get more from AI with EOS MCP.
						</p>
						<div className={styles.ctaRow}>
							<ConnectButton color="primary_yellow" mode="light">
								Connect MCP
							</ConnectButton>
							<DemoButton />
						</div>
					</div>
					<div className={styles.heroMedia}>
						<img
							src={heroImg.src}
							alt="EOS MCP connected inside an AI assistant, showing French nuclear generation analysis"
						/>
					</div>
				</div>
			</div>

			<SectionsHeader />

			{/* 1. The new intelligence layer */}
			<section id="intelligence-layer" data-name="Overview">
				<div className="container">
					<div className={styles.kicker}>
						Why AI is changing energy market intelligence
					</div>
					<h2 className={`${styles.sectionTitle} text_lg font_primary`}>
						The new intelligence layer
					</h2>
					<div className={styles.layerContent}>
						<p>
							AI is rapidly becoming the primary way clients access intelligence and
							insights. At Aurora, we&apos;ve invested heavily in that future, building
							APIs, EOS AI and Aurora EOS MCP with support from more than 100
							specialists across data, engineering, modelling and product teams.
						</p>
						<p>
							<strong>
								Our goal is simple: bring Aurora&apos;s intelligence directly into the
								tools clients use every day.
							</strong>
						</p>
					</div>
					<div className={styles.statsRow}>
						{stats.map((item) => (
							<div className={styles.statCard} key={item.num}>
								<div className={`${styles.num} font_primary`}>{item.num}</div>
								<div className={styles.label}>{item.label}</div>
							</div>
						))}
					</div>
					<div className={styles.introBanner}>
						<p className="font_primary">
							As the energy industry enters a new intelligence era, EOS MCP extends
							Aurora&apos;s intelligence beyond the EOS platform, enabling seamless
							integration with AI-driven research and analysis workflows.
						</p>
						<img className={styles.introLogo} src={logo.src} alt="EOS MCP logo" />
					</div>
				</div>
			</section>

			{/* 2. What is MCP */}
			<section className={styles.tint} id="what-is-mcp" data-name="What's an MCP?">
				<div className="container">
					<div className={styles.kicker}>What&apos;s an MCP?</div>
					<p className={`${styles.definition} font_primary`}>
						MCP stands for <strong>Model Context Protocol</strong>—an open standard
						that lets AI models query live, structured data sources in real time,
						without manual data export.
					</p>
					<p className={styles.practiceLine}>
						In practice, EOS MCP delivers Aurora&apos;s market intelligence directly
						into tools such as ChatGPT and Claude, so users can access trusted data
						and insights wherever analysis happens.
					</p>
					<img
						className={styles.diagram}
						src={diagramImg.src}
						alt="Diagram: Aurora IP sources connect through EOS MCP into your AI tool"
					/>
					<div className={styles.doesGrid}>
						<div className={styles.doesCol}>
							<h3 className={styles.does}>What EOS MCP does</h3>
							<ul>
								{mcpDoes.map((item) => (
									<li key={item}>
										<span className={`${styles.mark} ${styles.yes}`}>&#10003;</span>
										{item}
									</li>
								))}
							</ul>
						</div>
						<div className={`${styles.doesCol} ${styles.doesnt}`}>
							<h3>What EOS MCP doesn&apos;t do</h3>
							<ul>
								{mcpDoesnt.map((item) => (
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
					<div className={styles.kicker}>Use cases</div>
					<h2 className={`${styles.sectionTitle} text_lg font_primary`}>
						See EOS MCP in action
					</h2>
					<p className={styles.sectionSub}>
						Short walkthroughs of real prompts, run against real Aurora data—no
						reformatting, no manual lookups.
					</p>
					<VideoLibrary />
				</div>
			</section>

			{/* 4. Getting started */}
			<section
				className={styles.tint}
				id="getting-started"
				data-name="Getting Started"
			>
				<div className="container">
					<div className={styles.kicker}>Getting started</div>
					<h2 className={`${styles.sectionTitle} text_lg font_primary`}>
						Three steps to get up and running
					</h2>
					<div className={styles.steps}>
						{steps.map((item, ind) => (
							<div className={styles.stepCard} key={item.text}>
								<div className={`${styles.stepNum} font_primary`}>
									{String(ind + 1).padStart(2, "0")}
								</div>
								{item.image && (
									<img className={styles.stepImg} src={item.image} alt="" />
								)}
								<p>{item.text}</p>
								<span className={styles.stepTime}>{item.time}</span>
								{ind < steps.length - 1 && <span className={styles.stepLink}></span>}
							</div>
						))}
					</div>
					<div className={styles.gettingStartedCta}>
						<ConnectButton>Get started today</ConnectButton>
					</div>
				</div>
			</section>

			{/* 5. Best practices */}
			<section id="best-practices" data-name="Best Practices">
				<div className="container">
					<div className={styles.kicker}>Best practices</div>
					<h2 className={`${styles.sectionTitle} text_lg font_primary`}>
						Tips for effective use of EOS MCP
					</h2>
					{practices.map((item, ind) => (
						<div
							key={item.index}
							className={`${styles.practice} ${ind % 2 ? styles.reverse : ""}`}
						>
							<div className={styles.pText}>
								<div className={`${styles.pIndex} font_primary`}>{item.index}</div>
								<h3 className={`${styles.pTitle} font_primary`}>{item.title}</h3>
								<p className={styles.pDesc}>{item.desc}</p>
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
					<div className={styles.kicker}>FAQs</div>
					<h2 className={`${styles.sectionTitle} text_lg font_primary`}>
						Frequently asked questions
					</h2>
					<Faqs />
				</div>
			</section>

			{/* Final CTA */}
			<section className={styles.finalCta} id="connect">
				<div className="container">
					<h2 className="text_lg font_primary color_white">Ready to get started?</h2>
					<p className="color_silver_gray">
						Follow the simple setup instructions in our MCP documentation and connect
						your first AI tool in minutes.
					</p>
					<div className={`${styles.ctaRow} ${styles.center}`}>
						<ConnectButton color="primary_yellow" mode="light">
							Connect MCP
						</ConnectButton>
						<DemoButton />
					</div>
				</div>
			</section>
		</main>
	);
}
