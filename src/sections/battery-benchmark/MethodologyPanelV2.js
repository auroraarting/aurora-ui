"use client";

// MODULES //
import { useMemo, useState } from "react";

// COMPONENTS //
import ContentFromCms from "@/components/ContentFromCms";

// STYLES //
// Shares the v1 stylesheet so the two panels are visually identical and only the
// content model differs — the v2-only classes are additions to that same module.
import styles from "@/styles/sections/battery-benchmark/MethodologyPanel.module.scss";

// DATA //
import { regionLabel } from "./benchmarkData";
import methodologyFaqs from "./methodologyFaqs";

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

/** An ACF date field → `{ year, month, day }`, or null if it can't be read.
 *
 *  Dates arrive in two shapes. A date_picker's `return_format` is only applied to
 *  top-level fields, so repeater sub-fields come back as the raw stored value
 *  ("20260817") while top-level ones honour the format ("2026-08-17"). Both are
 *  handled here rather than trusting either.
 *
 *  Parsed by hand rather than via `new Date()`, because `new Date("2026-08-17")`
 *  is UTC midnight and renders as the previous day in negative offsets. */
function parseAcfDate(value) {
	const text = String(value || "").trim();
	if (!text) return null;

	const parts =
		text.match(/^(\d{4})-(\d{2})-(\d{2})$/) || text.match(/^(\d{4})(\d{2})(\d{2})$/);
	if (parts) {
		const month = Number(parts[2]);
		if (month < 1 || month > 12) return null;
		return { year: parts[1], month, day: Number(parts[3]) };
	}

	const parsed = new Date(text);
	if (Number.isNaN(parsed.getTime())) return null;
	return {
		year: String(parsed.getFullYear()),
		month: parsed.getMonth() + 1,
		day: parsed.getDate(),
	};
}

/** "Updated Aug 2026" for the header pill */
function updatedLabel(date) {
	const parsed = parseAcfDate(date);
	if (!parsed) return "";
	return `Updated ${MONTH_SHORT[parsed.month - 1]} ${parsed.year}`;
}

/** "17 Aug 2026" for the version log */
function shortDate(date) {
	const parsed = parseAcfDate(date);
	// An unparseable value is shown as typed rather than hidden, so a bad entry is
	// visible to whoever can fix it — but blank stays an em dash.
	if (!parsed) return String(date || "").trim() || "—";
	return `${parsed.day} ${MONTH_SHORT[parsed.month - 1]} ${parsed.year}`;
}

/** Scope badge. Same vocabulary as v1, but driven by a single select rather than
 *  two taxonomy terms, so "both" is explicit instead of inferred. */
function ScopeBadge({ scope }) {
	if (scope === "universal")
		return <span className={styles.badgeGray}>Universal</span>;
	if (scope === "regional")
		return <span className={styles.badgeYellow}>Regional</span>;
	if (scope === "both")
		return (
			<span className={styles.badgeMixed}>
				<span className={styles.badgeGray}>Universal</span>
				<span className={styles.badgeYellow}>Regional</span>
			</span>
		);
	return null;
}

/** A parsed `table_tsv` block */
function CmsTable({ table }) {
	if (!table?.head?.length) return null;
	return (
		<div className={styles.tableScroll}>
			<table>
				{table.caption && <caption>{table.caption}</caption>}
				<thead>
					<tr>
						{table.head.map((cell, i) => (
							<th key={i} scope="col">
								{cell}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{table.rows.map((row, r) => (
						<tr key={r}>
							{row.map((cell, c) => (
								<td key={c}>{cell}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

/** Heading + body + table for one outline node, at level 2 or 3 */
function SubSection({ node, level }) {
	const Tag = level === 2 ? "h5" : "h6";
	return (
		<div className={level === 2 ? styles.subLevel2 : styles.subLevel3}>
			<div className={styles.subHead}>
				<Tag className={`${styles.subTitle} font_secondary`}>
					{node.number && <span className={styles.subNumber}>{node.number}</span>}
					{node.title}
				</Tag>
				<ScopeBadge scope={node.scope} />
			</div>
			{(node.body || node.table) && (
				<div className={`${styles.itemBox} ${styles.itemBoxWhite}`}>
					<div className={styles.itemBoxText}>
						{node.body && <ContentFromCms>{node.body}</ContentFromCms>}
						{node.table && <CmsTable table={node.table} />}
						{node.bodyAfter && <ContentFromCms>{node.bodyAfter}</ContentFromCms>}
					</div>
				</div>
			)}
			{node.children?.map((child) => (
				<SubSection key={child.id} node={child} level={3} />
			))}
		</div>
	);
}

/** Level-1 sections sharing a nav group heading */
function groupSections(sections = []) {
	const groups = [];
	sections.forEach((section) => {
		const heading = section.navGroup || "";
		const existing = groups.find((group) => group.heading === heading);
		if (existing) existing.sections.push(section);
		else groups.push({ heading, sections: [section] });
	});
	return groups;
}

/** MethodologyPanelV2 — the proposed methodology model.
 *
 *  Differs from MethodologyPanel only in what it reads: a linear `outline` of
 *  headings carrying their own level, number, scope and optional table, instead
 *  of a flat list of tabs tagged against two taxonomies. Both components are kept
 *  so the two can be compared on the same page.
 *
 *  `sections` is `pageContent.methodologyV2` and `region` is the selected market.
 *  The "Common questions" list is not a prop: the same questions are shown for
 *  every market, so they are not part of a market's methodology and are not
 *  editable per region. They come from methodologyFaqs.js. */
export default function MethodologyPanelV2({ sections, region }) {
	const published = useMemo(
		() =>
			(Array.isArray(sections) ? sections : []).filter(
				(item) =>
					item?.regionCode &&
					item.status !== "draft" &&
					(item.description || item.sections?.length),
			),
		[sections],
	);

	const section = useMemo(
		() => published.find((item) => item.regionCode === region) || null,
		[published, region],
	);

	const publishedNames = useMemo(
		() => published.map((item) => regionLabel(item.regionCode)),
		[published],
	);

	const groups = useMemo(() => groupSections(section?.sections), [section]);
	const regionName = regionLabel(region) || "";
	const meta = updatedLabel(section?.lastReviewed);

	const [activeId, setActiveId] = useState(null);
	const [openFaq, setOpenFaq] = useState(0);

	const ids = section?.sections?.map((item) => item.id) || [];
	const currentId = ids.includes(activeId) ? activeId : ids[0];

	const goToSection = (id) => {
		setActiveId(id);
		const el = document.getElementById(`methodv2-${id}`);
		if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	// Nothing authored for any market — the caller falls back to v1, so render
	// nothing rather than an empty shell.
	if (!published.length) return null;

	return (
		<div className={styles.panel}>
			{/* ── Header ─────────────────────────────────── */}
			<div className={styles.header}>
				<div className={styles.titleGroup}>
					<p className={`${styles.title} font_secondary`}>Methodology</p>
					{section?.version && (
						<span className={styles.meta}>v{section.version}</span>
					)}
					{meta && <span className={styles.meta}>{meta}</span>}
				</div>
				<span className={styles.regionTag}>
					<i className={styles.regionDot} aria-hidden="true" />
					{regionName}
				</span>
			</div>

			{!section && (
				<div className={styles.main}>
					<div className={styles.items}>
						<section className={`${styles.item} ${styles.itemLast}`}>
							<div className={styles.itemHead}>
								<h4 className={`${styles.itemTitle} font_secondary`}>
									{regionName} methodology is not published yet
								</h4>
							</div>
							{publishedNames.length > 0 && (
								<p className={styles.itemPlain}>
									Published for {publishedNames.join(", ")}.
								</p>
							)}
						</section>
					</div>
				</div>
			)}

			{section && (
				<>
					{section.description && (
						<div className={styles.intro}>
							<ContentFromCms>{section.description}</ContentFromCms>
						</div>
					)}

					{/* Key for the scope badges against each section below */}
					<div className={styles.assumptions}>
						<div className={styles.assumptionLabel}>
							<span className={styles.chipGray}>Universal</span>
						</div>
						<div className={styles.assumptionLabel}>
							<span className={styles.chipYellow}>Regional</span>
						</div>
					</div>

					<div className={styles.main}>
						<nav className={styles.nav} aria-label="Methodology sections">
							{groups.map((group) => (
								<div key={group.heading} className={styles.navGroup}>
									{group.heading && (
										<p className={styles.navHeading}>{group.heading}</p>
									)}
									{group.sections.map((item) => (
										<button
											key={item.id}
											type="button"
											onClick={() => goToSection(item.id)}
											className={`${styles.navLink} ${
												currentId === item.id ? styles.navLinkActive : ""
											}`}
										>
											<span className={styles.navLabel}>
												{item.number && (
													<span className={styles.navNumber}>{item.number}</span>
												)}
												{item.title}
											</span>
										</button>
									))}
								</div>
							))}
						</nav>

						<div className={styles.items}>
							{section.sections.map((item, i) => (
								<section
									key={item.id}
									id={`methodv2-${item.id}`}
									className={`${styles.item} ${
										i === section.sections.length - 1 ? styles.itemLast : ""
									}`}
								>
									<div className={styles.itemHead}>
										<h4 className={`${styles.itemTitle} font_secondary`}>
											{item.number && (
												<span className={styles.itemNumber}>{item.number}</span>
											)}
											{item.title}
										</h4>
										<ScopeBadge scope={item.scope} />
									</div>

									{/* One box per heading, holding its prose and then its table —
									    a table is content like any other, so it gets the same
									    treatment wherever in the outline it appears. */}
									{(item.body || item.table) && (
										<div className={`${styles.itemBox} ${styles.itemBoxWhite}`}>
											<div className={styles.itemBoxText}>
												{item.body && <ContentFromCms>{item.body}</ContentFromCms>}
												{item.table && <CmsTable table={item.table} />}
												{item.bodyAfter && (
													<ContentFromCms>{item.bodyAfter}</ContentFromCms>
												)}
											</div>
										</div>
									)}

									{item.children?.map((child) => (
										<SubSection key={child.id} node={child} level={2} />
									))}
								</section>
							))}
						</div>
					</div>

					{/* ── Version log ────────────────────────── */}
					{section.versionLog?.length > 0 && (
						<div className={styles.versionLog}>
							<p className={`${styles.faqHeading} font_secondary`}>Version log</p>
							{/* Boxed like every other block in the panel — a bare table read as
							    a stray, unstyled one floating between the sections and the FAQs. */}
							<div className={`${styles.itemBox} ${styles.itemBoxWhite}`}>
								<div className={styles.itemBoxText}>
									<div className={styles.tableScroll}>
										<table>
											<thead>
												<tr>
													<th scope="col">Version</th>
													<th scope="col">Effective date</th>
													<th scope="col">Change summary</th>
													<th scope="col">Sections affected</th>
												</tr>
											</thead>
											<tbody>
												{section.versionLog.map((entry, i) => (
													<tr key={`${entry.version}-${i}`}>
														<td>{entry.version || "—"}</td>
														<td>{shortDate(entry.effectiveDate)}</td>
														<td>{entry.changeSummary || "—"}</td>
														<td>{entry.sectionsAffected || "—"}</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					)}
				</>
			)}

			{/* ── Common questions — shared across every market ── */}
			{methodologyFaqs.length > 0 && (
				<div className={styles.faqSection}>
					<p className={`${styles.faqHeading} font_secondary`}>Common questions</p>
					<div className={styles.faqList}>
						{methodologyFaqs.map((faq, i) => {
							const open = openFaq === i;
							return (
								<div key={faq.question} className={styles.faqItem}>
									<button
										type="button"
										className={styles.faqTrigger}
										aria-expanded={open}
										onClick={() => setOpenFaq(open ? -1 : i)}
									>
										<span className={styles.faqQuestion}>{faq.question}</span>
										<span
											className={`${styles.faqIcon} ${open ? styles.faqIconOpen : ""}`}
											aria-hidden="true"
										/>
									</button>
									{open && faq.answer && (
										<div className={styles.faqAnswer}>
											<ContentFromCms>{faq.answer}</ContentFromCms>
										</div>
									)}
								</div>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
}
