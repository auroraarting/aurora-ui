"use client";
/* eslint-disable quotes */
// MODULES //
import { useState } from "react";
import Link from "next/link";

// COMPONENTS //
import Button from "@/components/Buttons/Button";
import SectionsHeader from "@/components/SectionsHeader";
import { ConnectButton, DemoButton } from "@/sections/eos-mcp/EosMcpButtons";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/EosMcp.module.scss";

// IMAGES //
import logo from "/public/img/eos-mcp/logo.png";
import checkIcon from "/public/img/icons/checkIcn.svg";
import heroImg from "/public/img/eos-mcp/homepage.png";

// DATA //
import { demoBars } from "@/data/eosMcp";

/** Line icons used by the benefits strip and lifecycle panels (48×48 viewBox) */
const icons = {
	bars: (
		<>
			<path d="M8 40V26M18 40V16M28 40V22M38 40V10" />
			<circle cx="38" cy="10" r="3" />
		</>
	),
	clock: (
		<>
			<circle cx="24" cy="26" r="16" />
			<path d="M24 18v8l6 4" />
			<path d="M18 6h12" />
		</>
	),
	database: (
		<>
			<ellipse cx="24" cy="12" rx="14" ry="5" />
			<path d="M10 12v24c0 2.8 6.3 5 14 5s14-2.2 14-5V12" />
			<path d="M10 24c0 2.8 6.3 5 14 5s14-2.2 14-5" />
		</>
	),
	network: (
		<>
			<circle cx="10" cy="24" r="4" />
			<circle cx="38" cy="10" r="4" />
			<circle cx="38" cy="38" r="4" />
			<path d="M14 24h6l14-11M20 24h4l14 11" />
		</>
	),
	search: (
		<>
			<circle cx="22" cy="22" r="14" />
			<path d="M32 32l10 10" />
			<path d="M22 15v14M15 22h14" />
		</>
	),
	pin: (
		<>
			<path d="M24 44s14-13.5 14-24a14 14 0 1 0-28 0c0 10.5 14 24 14 24z" />
			<circle cx="24" cy="20" r="5" />
		</>
	),
	rank: <path d="M8 40V26M18 40V16M28 40V22M38 40V8" />,
	gear: (
		<>
			<circle cx="24" cy="24" r="6" />
			<path d="M24 6v6M24 36v6M6 24h6M36 24h6M11 11l4.2 4.2M32.8 32.8L37 37M37 11l-4.2 4.2M15.2 32.8L11 37" />
		</>
	),
	contract: (
		<>
			<rect x="10" y="6" width="20" height="26" rx="2" />
			<path d="M15 14h10M15 20h10M15 26h6" />
			<path d="M30 24l8 4-8 4" />
		</>
	),
	gauge: (
		<>
			<path d="M8 34a16 16 0 0 1 32 0" />
			<path d="M24 34l8-12" />
			<circle cx="24" cy="34" r="2.4" />
		</>
	),
	trend: (
		<>
			<path d="M8 38l9-10 7 6 16-18" />
			<path d="M32 12h8v8" />
		</>
	),
};

/** Icon */
function Icon({ name }) {
	return (
		<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6">
			{icons[name]}
		</svg>
	);
}

/** EOS MCP Page — `data` is normalised by getEosMcpProductsPage */
export default function EosMcpWrap({ data }) {
	const {
		buttons,
		banner,
		overview,
		keyAdvantages,
		lifecycle,
		closingCta,
		resources,
	} = data;
	const [activeStage, setActiveStage] = useState(0);
	const stage = lifecycle.stages[activeStage] || lifecycle.stages[0];

	/** connect — the CMS-labelled Connect button */
	const connect = (props) => (
		<ConnectButton href={buttons.connectUrl} {...props}>
			{buttons.connectButtonText}
		</ConnectButton>
	);

	return (
		<main className={styles.EosMcpPage}>
			{/* Hero */}
			<section className={styles.hero} id="introduction" data-name="Introduction">
				<div className={`container ${styles.heroTop}`}>
					<div>
						<img className={styles.logo} src={banner.logo || logo.src} alt="EOS MCP" />
						<h1 className="text_xl font_primary f_w_b text_uppercase">
							{banner.title}
						</h1>
					</div>
					<div className={styles.heroCopy}>
						<p className={`${styles.lead} text_reg`}>{banner.description}</p>
						{banner.availabilityNote && (
							<p className={styles.availNote}>{banner.availabilityNote}</p>
						)}
						{connect()}
					</div>
				</div>
				<div className="container">
					<div className={styles.heroMedia}>
						<img
							src={banner.image || heroImg.src}
							alt="EOS MCP connected inside an AI assistant, showing French nuclear generation analysis"
						/>
					</div>
				</div>
			</section>

			<SectionsHeader
				customHtml={
					<ConnectButton key="btn" href={buttons.connectUrl}>
						{buttons.connectButtonText}
					</ConnectButton>
				}
			/>

			{/* Overview / live demo */}
			<section className={styles.demo} id="overview" data-name="Overview">
				<div className={`container ${styles.demoGrid}`}>
					<div className={styles.demoHead}>
						<div className={styles.kicker}>{overview.kicker}</div>
						<h2 className={`${styles.sectionTitle} text_lg font_primary`}>
							{overview.title}
						</h2>
						<p>{overview.description}</p>
					</div>
					<div className={styles.demoCard} aria-hidden="true">
						<div className={styles.topbar}>
							<span></span>
							<span></span>
							<span></span>
						</div>
						<div className={styles.chatQ}>{overview.demoQuestion}</div>
						<div className={styles.thinking}>
							<span></span>
							<span></span>
							<span></span>
						</div>
						<div className={styles.chatLabel}>{overview.demoLabel}</div>
						<div className={styles.chartBox}>
							<div className={styles.bars}>
								{demoBars.map(([h, c], i) => (
									<i
										key={i}
										className={styles[c]}
										style={{ "--h": `${h}px`, animationDelay: `${i * 0.02}s` }}
									/>
								))}
							</div>
						</div>
						<div className={`${styles.answerLine} ${styles.l1}`}></div>
						<div className={`${styles.answerLine} ${styles.l2}`}></div>
						<div className={`${styles.answerLine} ${styles.l3}`}></div>
					</div>
				</div>
			</section>

			{/* Key advantages */}
			<section
				className={styles.benefits}
				id="key-advantages"
				data-name="Key Advantages"
			>
				<div className="container">
					<div className={styles.kicker}>{keyAdvantages.kicker}</div>
					<div className={styles.benefitsGrid}>
						{keyAdvantages.items.map((item) => (
							<div className={styles.benefit} key={item.title}>
								<div className={styles.icon}>
									<Icon name={item.icon} />
								</div>
								<h3>{item.title}</h3>
								<p>{item.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Lifecycle */}
			<section
				className={styles.lifecycle}
				id="lifecycle"
				data-name="Full Lifecycle Coverage"
			>
				<div className="container">
					<div className={styles.lcHead}>
						<div className={styles.kicker}>{lifecycle.kicker}</div>
						<h2 className={`${styles.sectionTitle} text_lg font_primary`}>
							{lifecycle.title}
						</h2>
						<p>{lifecycle.description}</p>
					</div>

					<div className={styles.lcTabs} role="tablist">
						{lifecycle.stages.map((item, ind) => (
							<button
								key={item.title}
								type="button"
								role="tab"
								aria-selected={activeStage === ind}
								className={`${styles.lcTab} ${activeStage === ind ? styles.active : ""}`}
								onClick={() => setActiveStage(ind)}
							>
								<span className={styles.num}>{String(ind + 1).padStart(2, "0")}</span>
								<span className={styles.ttl}>{item.title}</span>
								<span className={styles.bar}>
									<i></i>
								</span>
							</button>
						))}
					</div>

					<div className={styles.lcPanel} key={activeStage} role="tabpanel">
						<div className={styles.lcLeft}>
							<div className={styles.icon}>
								<Icon name={stage.icon} />
							</div>
							<div className={styles.stageTitle}>
								Stage {String(activeStage + 1).padStart(2, "0")} · {stage.title}
							</div>
							<div className={`${styles.question} font_primary`}>
								&ldquo;{stage.question}&rdquo;
							</div>
						</div>
						<div className={styles.lcRight}>
							<div className={styles.lbl}>{lifecycle.pointsLabel}</div>
							<ul>
								{stage.points.map((point) => (
									<li key={point}>
										<img className={styles.chk} src={checkIcon.src} alt="" />
										{point}
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</section>

			{/* Closing CTA */}
			<section className={styles.finalCta}>
				<div className="container">
					<h2 className="text_lg font_primary color_white">{closingCta.title}</h2>
					<p className="color_silver_gray">{closingCta.description}</p>
					<div className={styles.ctaRow}>
						{connect({ color: "primary_yellow", mode: "light" })}
						<DemoButton href={buttons.demoUrl}>{buttons.demoButtonText}</DemoButton>
					</div>
				</div>
			</section>

			{/* Resources */}
			<section className={styles.resources} id="resources" data-name="Resources">
				<div className="container">
					<div className={styles.resourcesHead}>
						<div>
							<div className={styles.kicker}>{resources.kicker}</div>
							<h2 className={`${styles.sectionTitle} text_lg font_primary`}>
								{resources.title}
							</h2>
						</div>
						<Link
							href={resources.viewAllUrl}
							role="button"
							className={styles.btn}
						>
							<Button color="primary" variant="filled" shape="rounded" textlowercase>
								{resources.viewAllText}
							</Button>
						</Link>
					</div>
					<div className={styles.resourcesGrid}>
						{resources.cards.map((item) => (
							<Link key={item.title} href={item.url} className={styles.resCard}>
								<div className={`${styles.resTitle} font_primary`}>{item.title}</div>
								<span className={`${styles.resCta} text_xs`}>{item.ctaText}</span>
							</Link>
						))}
					</div>
				</div>
			</section>

		</main>
	);
}
