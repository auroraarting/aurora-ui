"use client";

// MODULES //
import { useState } from "react";

// STYLES //
import styles from "@/styles/sections/battery-benchmark/MethodologyPanel.module.scss";

// DATA //
const navGroups = [
	{
		heading: "The benchmark",
		links: [
			{ id: "overview", label: "Overview", scope: null },
			{ id: "benchmark-construction", label: "Benchmark construction", scope: "U" },
		],
	},
	{
		heading: "Great Britain",
		links: [
			{ id: "input-assumptions", label: "Input assumptions", scope: "R" },
			{ id: "calculation", label: "Calculation", scope: "R" },
		],
	},
	{
		heading: "Reference",
		links: [
			{ id: "governance", label: "Governance & updates", scope: "U" },
			{ id: "limitations", label: "Limitations", scope: "UR" },
			{ id: "contact", label: "Contact & feedback", scope: "U" },
		],
	},
];

const items = [
	{
		id: "overview",
		title: "Overview",
		scope: null,
		box: "white",
		body: "Modelled reference-asset revenue from observed monthly prices; assumes the year is twelve repetitions of the month to isolate that month's price effect. Non-euro markets are converted to euros at the ECB monthly average rate.",
	},
	{
		id: "benchmark-construction",
		title: "Benchmark construction",
		scope: "universal",
		box: "silver",
		lead: "Placeholder - universal construction.",
		body: " Reference-asset definition, duration cohorts (1h · 2h · 4h), and how Chronos runs the imperfect-foresight dispatch simulation. To be authored in the Backcast methodology doc.",
	},
	{
		id: "input-assumptions",
		title: "Input assumptions",
		scope: "region",
		box: "silver",
		lead: "Placeholder - Great Britain inputs.",
		body: " Region-specific Chronos assumptions (efficiency, cycling, prequalification). Follows the region selector.",
	},
	{
		id: "calculation",
		title: "Calculation",
		scope: "region",
		box: "silver",
		body: "Dispatch-simulation formulas per stream. Region-specific.",
	},
	{
		id: "governance",
		title: "Governance & updates",
		scope: "universal",
		box: "white",
		body: "Largely shared with the RPB universal text: annual review, out-of-cycle triggers, change notification and version log.",
	},
	{
		id: "limitations",
		title: "Limitations",
		scope: "mixed",
		box: "silver",
		lead: "Placeholder - limitations.",
		body: " General (gross revenues, annualisation as ×12 scaling) plus any GB-specific notes.",
	},
	{
		id: "contact",
		title: "Contact & feedback",
		scope: "universal",
		box: "none",
		body: "For questions, coverage, or to report an inconsistency, contact your Aurora account manager. Feedback feeds the annual methodology review.",
	},
];

const faqs = [
	{
		q: "Is the benchmark free?",
		a: (
			<>
				Yes - the headline index is published openly. Asset-level data and custom
				modelling sit in <b>Flexplorer</b> on EOS.
			</>
		),
	},
	{
		q: "Modelled or observed?",
		a: (
			<>
				Modelled. Chronos simulates dispatch against observed monthly prices, so
				revenues are a modelled measure of what a battery could have earned - not
				metered output.
			</>
		),
	},
	{
		q: "How often is it refreshed?",
		a: (
			<>
				Monthly, once the previous month's prices are final. See{" "}
				<b>Governance &amp; updates</b> for the review and versioning cycle.
			</>
		),
	},
	{
		q: "Which durations are shown?",
		a: (
			<>
				1-hour, 2-hour and 4-hour reference assets, matching the duration cohorts
				in the chart's duration toggles.
			</>
		),
	},
];

/** Small scope badge — "U" (universal) / "R" (region) used in the side navigation */
function NavBadge({ scope }) {
	if (scope === "U") return <span className={styles.navTagU}>U</span>;
	if (scope === "R") return <span className={styles.navTagR}>R</span>;
	if (scope === "UR")
		return (
			<span className={styles.navTagGroup}>
				<span className={styles.navTagU}>U</span>
				<span className={styles.navPlus}>+</span>
				<span className={styles.navTagR}>R</span>
			</span>
		);
	return null;
}

/** Full-width scope badge shown next to a content item's title */
function ItemBadge({ scope }) {
	if (scope === "universal")
		return <span className={styles.badgeGray}>Universal</span>;
	if (scope === "region")
		return <span className={styles.badgeYellow}>Region · Great Britain</span>;
	if (scope === "mixed")
		return (
			<span className={styles.badgeMixed}>
				<span className={styles.badgeGray}>U</span>
				<span className={styles.badgeYellow}>+ R</span>
			</span>
		);
	return null;
}

/** MethodologyPanel — right-side methodology reference for the Battery Benchmark */
export default function MethodologyPanel() {
	const [activeId, setActiveId] = useState("overview");
	const [openFaq, setOpenFaq] = useState(0);

	const goToSection = (id) => {
		setActiveId(id);
		const el = document.getElementById(`method-${id}`);
		if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	return (
		<div className={styles.panel}>
			{/* ── Header ─────────────────────────────────── */}
			<div className={styles.header}>
				<div className={styles.titleGroup}>
					<p className={`${styles.title} font_secondary`}>Methodology</p>
					<span className={styles.meta}>Updated Jul 2026</span>
				</div>
				<span className={styles.regionTag}>
					<i className={styles.regionDot} aria-hidden="true" />
					Great Britain
				</span>
			</div>

			{/* ── Intro ──────────────────────────────────── */}
			<p className={styles.intro}>
				The <b>Aurora Backcast Benchmark</b> models the gross revenue a reference
				storage asset could have earned from the wholesale, capacity and ancillary
				prices observed in a given month, via Aurora's <b>Chronos</b> dispatch
				engine - using imperfect foresight to simulate realistic performance. It is a
				modelled, like-for-like measure of what a battery <b>could</b> have earned.
			</p>

			{/* ── Assumptions row ────────────────────────── */}
			<div className={styles.assumptions}>
				<div className={styles.assumptionLabel}>
					<span className={styles.chipGray}>Universal</span>
					<span className={styles.assumptionText}>Same in every market</span>
				</div>
				<div className={styles.assumptionLabel}>
					<span className={styles.chipYellow}>Region</span>
					<span className={styles.assumptionText}>
						Follows the selector - currently Great Britain
					</span>
				</div>
			</div>

			{/* ── Main content: nav + items ──────────────── */}
			<div className={styles.main}>
				<nav className={styles.nav} aria-label="Methodology sections">
					{navGroups.map((group) => (
						<div key={group.heading} className={styles.navGroup}>
							<p className={styles.navHeading}>{group.heading}</p>
							{group.links.map((link) => (
								<button
									key={link.id}
									type="button"
									onClick={() => goToSection(link.id)}
									className={`${styles.navLink} ${
										activeId === link.id ? styles.navLinkActive : ""
									}`}
								>
									<span className={styles.navLabel}>{link.label}</span>
									<NavBadge scope={link.scope} />
								</button>
							))}
						</div>
					))}
				</nav>

				<div className={styles.items}>
					{items.map((item, i) => (
						<section
							key={item.id}
							id={`method-${item.id}`}
							className={`${styles.item} ${
								i === items.length - 1 ? styles.itemLast : ""
							}`}
						>
							<div className={styles.itemHead}>
								<h4 className={`${styles.itemTitle} font_secondary`}>
									{item.title}
								</h4>
								<ItemBadge scope={item.scope} />
							</div>

							{item.box === "none" ? (
								<p className={styles.itemPlain}>{item.body}</p>
							) : (
								<div
									className={`${styles.itemBox} ${
										item.box === "silver" ? styles.itemBoxSilver : styles.itemBoxWhite
									}`}
								>
									<p className={styles.itemBoxText}>
										{item.lead && <b className={styles.itemLead}>{item.lead}</b>}
										{item.body}
									</p>
								</div>
							)}
						</section>
					))}
				</div>
			</div>

			{/* ── Common questions ───────────────────────── */}
			<div className={styles.faqSection}>
				<p className={`${styles.faqHeading} font_secondary`}>Common questions</p>
				<div className={styles.faqList}>
					{faqs.map((faq, i) => {
						const open = openFaq === i;
						return (
							<div key={faq.q} className={styles.faqItem}>
								<button
									type="button"
									className={styles.faqTrigger}
									aria-expanded={open}
									onClick={() => setOpenFaq(open ? -1 : i)}
								>
									<span className={styles.faqQuestion}>{faq.q}</span>
									<span
										className={`${styles.faqIcon} ${open ? styles.faqIconOpen : ""}`}
										aria-hidden="true"
									/>
								</button>
								{open && <div className={styles.faqAnswer}>{faq.a}</div>}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
