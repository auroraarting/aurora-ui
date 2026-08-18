"use client";

// MODULES //
import { useMemo, useState } from "react";

// COMPONENTS //
import ContentFromCms from "@/components/ContentFromCms";

// STYLES //
import styles from "@/styles/sections/battery-benchmark/MethodologyPanel.module.scss";

// DATA //
import { regionLabel } from "./benchmarkData";

// Fallback copy, used when the Battery Benchmarks page in WordPress has no
// methodology rows (or none for any market the explorer can select).
const navGroups = [
	{
		heading: "The benchmark",
		links: [
			{ id: "overview", label: "Overview", scope: null },
			{
				id: "benchmark-construction",
				label: "Benchmark construction",
				scope: "U",
			},
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
		body:
			"Modelled reference-asset revenue from observed monthly prices; assumes the year is twelve repetitions of the month to isolate that month's price effect. Non-euro markets are converted to euros at the ECB monthly average rate.",
	},
	{
		id: "benchmark-construction",
		title: "Benchmark construction",
		scope: "universal",
		box: "silver",
		lead: "Placeholder - universal construction.",
		body:
			" Reference-asset definition, duration cohorts (1h · 2h · 4h), and how Chronos runs the imperfect-foresight dispatch simulation. To be authored in the Backcast methodology doc.",
	},
	{
		id: "input-assumptions",
		title: "Input assumptions",
		scope: "region",
		box: "silver",
		lead: "Placeholder - Great Britain inputs.",
		body:
			" Region-specific Chronos assumptions (efficiency, cycling, prequalification). Follows the region selector.",
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
		body:
			"Largely shared with the RPB universal text: annual review, out-of-cycle triggers, change notification and version log.",
	},
	{
		id: "limitations",
		title: "Limitations",
		scope: "mixed",
		box: "silver",
		lead: "Placeholder - limitations.",
		body:
			" General (gross revenues, annualisation as ×12 scaling) plus any GB-specific notes.",
	},
	{
		id: "contact",
		title: "Contact & feedback",
		scope: "universal",
		box: "none",
		body:
			"For questions, coverage, or to report an inconsistency, contact your Aurora account manager. Feedback feeds the annual methodology review.",
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
				1-hour, 2-hour and 4-hour reference assets, matching the duration cohorts in
				the chart's duration toggles.
			</>
		),
	},
	{
		q: "Can I personalise the benchmark to fit my asset?",
		a: (
			<>
				Yes — the benchmark can be customised to your specific asset, so you can see
				exactly how it would have performed across different markets. For more
				information, please contact your Aurora account manager.
			</>
		),
	},
];

const MONTH_SHORT = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

/** "Updated Jul 2026" from the page's modified date. Formatted by hand rather
 *  than through toLocaleDateString so the server and client always agree. */
function updatedLabel(updated) {
	if (!updated) return "";
	const date = new Date(updated);
	if (Number.isNaN(date.getTime())) return "";
	return `Updated ${MONTH_SHORT[date.getMonth()]} ${date.getFullYear()}`;
}

/** Editors paste copy out of the rendered page, so it can carry CSS-module class
 *  names from an older build ("MethodologyPanel_itemLead__9p_DB"). Re-point them
 *  at this build's hashes, and drop the ones that no longer exist. */
function rewriteCmsClasses(html) {
	if (!html) return html;
	return html.replace(
		/MethodologyPanel_([A-Za-z0-9]+)__[A-Za-z0-9_-]+/g,
		(match, key) => styles[key] || match,
	);
}

/** Slugs of a tab's scope terms ("universal" / "region") */
function scopeSlugs(tab) {
	return (tab?.scopes || [])
		.map((term) => term?.slug || term?.name?.toLowerCase() || "")
		.filter(Boolean);
}

/** Scope terms → the badge key ItemBadge takes */
function scopeKeys(tab) {
	const slugs = scopeSlugs(tab);
	const universal = slugs.includes("universal");
	const region = slugs.includes("region");
	if (universal && region) return { item: "mixed" };
	if (universal) return { item: "universal" };
	if (region) return { item: "region" };
	return { item: null };
}

/** Scope badge shown next to a content item's title */
function ItemBadge({ scope }) {
	if (scope === "universal")
		return <span className={styles.badgeGray}>Universal</span>;
	if (scope === "region")
		return <span className={styles.badgeYellow}>Regional</span>;
	if (scope === "mixed")
		return (
			<span className={styles.badgeMixed}>
				<span className={styles.badgeGray}>Universal</span>
				<span className={styles.badgeYellow}>Regional</span>
			</span>
		);
	return null;
}

/** CMS rows that carry content, keyed on the market they were written for */
function usableSections(sections) {
	return (Array.isArray(sections) ? sections : [])
		.map((section) => ({
			...section,
			tabs: (section?.tabs || []).filter((tab) => tab?.title || tab?.description),
		}))
		.filter(
			(section) =>
				section.regionCode && (section.description || section.tabs.length),
		);
}

/** ["Great Britain", "Germany", "France"] → "Great Britain, Germany and France" */
function listNames(names = []) {
	if (names.length < 2) return names[0] || "";
	return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

/** Tabs grouped under their `section_tag` heading, both in CMS order */
function groupTabs(tabs = []) {
	const groups = [];
	tabs.forEach((tab) => {
		const heading = tab?.section?.name || "";
		const existing = groups.find((group) => group.heading === heading);
		if (existing) existing.tabs.push(tab);
		else groups.push({ heading, tabs: [tab] });
	});
	return groups;
}

/** MethodologyPanel — right-side methodology reference for the Battery Benchmark.
 *  `sections` is the CMS methodology repeater, one row per market; `region` is
 *  the market the explorer is showing. */
export default function MethodologyPanel({ sections, region, updated }) {
	const published = useMemo(() => usableSections(sections), [sections]);
	// `region_code` is the identifier: the panel only ever shows the row written
	// for the selected market, never another market's copy.
	const section = useMemo(
		() => published.find((item) => item.regionCode === region) || null,
		[published, region],
	);
	const fromCms = Boolean(section);
	// Markets the CMS has methodology for, named for the empty state
	const publishedNames = useMemo(
		() => published.map((item) => regionLabel(item.regionCode)),
		[published],
	);
	const missing = !section && published.length > 0;
	const groups = useMemo(() => groupTabs(section?.tabs), [section]);
	const regionName = regionLabel(region) || "Great Britain";
	const meta = updatedLabel(updated) || "Updated Jul 2026";

	const [activeId, setActiveId] = useState(null);
	const [openFaq, setOpenFaq] = useState(0);

	// Tab ids are per market, so a switch of region drops the highlight back to
	// the first tab of the market now being shown.
	const tabIds = fromCms
		? section.tabs.map((tab) => tab.id)
		: items.map((item) => item.id);
	const currentId = tabIds.includes(activeId) ? activeId : tabIds[0];

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
					<span className={styles.meta}>{meta}</span>
				</div>
				<span className={styles.regionTag}>
					<i className={styles.regionDot} aria-hidden="true" />
					{regionName}
				</span>
			</div>

			{/* ── Intro ──────────────────────────────────── */}
			{fromCms && section.description && (
				<div className={styles.intro}>
					<ContentFromCms>{rewriteCmsClasses(section.description)}</ContentFromCms>
				</div>
			)}
			{!fromCms && !missing && (
				<p className={styles.intro}>
					The <b>Aurora Backcast Benchmark</b> models the gross revenue a reference
					storage asset could have earned from the wholesale, capacity and ancillary
					prices observed in a given month, via Aurora's <b>Chronos</b> dispatch
					engine - using imperfect foresight to simulate realistic performance. It is
					a modelled, like-for-like measure of what a battery <b>could</b> have
					earned.
				</p>
			)}

			{/* ── Nothing written for this market yet ────── */}
			{missing && (
				<div className={styles.main}>
					<div className={styles.items}>
						<section className={`${styles.item} ${styles.itemLast}`}>
							<div className={styles.itemHead}>
								<h4 className={`${styles.itemTitle} font_secondary`}>
									{regionName} methodology is not published yet
								</h4>
							</div>
							<div className={`${styles.itemBox} ${styles.itemBoxWhite}`}>
								<p className={styles.itemBoxText}>
									Aurora publishes the benchmark methodology market by market
									{publishedNames.length
										? ` — available so far for ${listNames(publishedNames)}`
										: ""}
									.
								</p>
							</div>
						</section>
					</div>
				</div>
			)}

			{/* ── Assumptions row ────────────────────────── */}
			{!missing && (
				<>
					{/* Key for the scope badges against each section below */}
					<div className={styles.assumptions}>
						<div className={styles.assumptionLabel}>
							<span className={styles.chipGray}>Universal</span>
						</div>
						<div className={styles.assumptionLabel}>
							<span className={styles.chipYellow}>Regional</span>
						</div>
					</div>

					{/* ── Main content: nav + items ──────────────── */}
					<div className={styles.main}>
						<nav className={styles.nav} aria-label="Methodology sections">
							{fromCms
								? groups.map((group) => (
										<div key={group.heading} className={styles.navGroup}>
											{group.heading && (
												<p className={styles.navHeading}>{group.heading}</p>
											)}
											{group.tabs.map((tab) => (
												<button
													key={tab.id}
													type="button"
													onClick={() => goToSection(tab.id)}
													className={`${styles.navLink} ${
														currentId === tab.id ? styles.navLinkActive : ""
													}`}
												>
													<span className={styles.navLabel}>{tab.title}</span>
												</button>
											))}
										</div>
									))
								: navGroups.map((group) => (
										<div key={group.heading} className={styles.navGroup}>
											<p className={styles.navHeading}>{group.heading}</p>
											{group.links.map((link) => (
												<button
													key={link.id}
													type="button"
													onClick={() => goToSection(link.id)}
													className={`${styles.navLink} ${
														currentId === link.id ? styles.navLinkActive : ""
													}`}
												>
													<span className={styles.navLabel}>{link.label}</span>
												</button>
											))}
										</div>
									))}
						</nav>

						<div className={styles.items}>
							{fromCms
								? section.tabs.map((tab, i) => {
										const body = rewriteCmsClasses(tab.description);
										// Copy that opens with a lead-in sits on the tinted card, the
										// way the placeholder blocks do in the design.
										const silver = body?.includes(styles.itemLead);
										return (
											<section
												key={tab.id}
												id={`method-${tab.id}`}
												className={`${styles.item} ${
													i === section.tabs.length - 1 ? styles.itemLast : ""
												}`}
											>
												<div className={styles.itemHead}>
													<h4 className={`${styles.itemTitle} font_secondary`}>
														{tab.title}
													</h4>
													<ItemBadge scope={scopeKeys(tab).item} />
												</div>

												{body && (
													<div
														className={`${styles.itemBox} ${
															silver ? styles.itemBoxSilver : styles.itemBoxWhite
														}`}
													>
														<div className={styles.itemBoxText}>
															<ContentFromCms>{body}</ContentFromCms>
														</div>
													</div>
												)}
											</section>
										);
									})
								: items.map((item, i) => (
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
				</>
			)}

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
