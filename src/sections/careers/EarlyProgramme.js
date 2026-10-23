// MODULES //
import Link from "next/link";
import parse from "html-react-parser";

// COMPONENTS //
import InnerBanner from "@/components/InnerBanner";
import Button from "@/components/Buttons/Button";
import ContentFromCms from "@/components/ContentFromCms";

// UTILS //
import { removeHTML } from "@/utils";

// STYLES //
import styles from "@/styles/sections/careers/EarlyProgramme.module.scss";

const accents = new Set(["teal", "gold", "blue"]);

/** One region + programme page, e.g. EMEA Graduate Analyst.
 *  @param {{ data: any }} props — a programme in the data/earlyCareersProgrammes
 *  shape (CMS programmes are mapped to it by toProgrammeData) */
export default function EarlyProgramme({ data }) {
	const fields = data?.programmes || {};
	const { header, map, overview, bodySections, locations } = fields;
	const accent = accents.has(header?.accent) ? header.accent : "teal";
	const cards = overview?.cards?.filter((c) => c?.label || c?.value) || [];
	const sections = bodySections?.filter((s) => s?.heading || s?.content) || [];
	const cities = locations?.cities?.filter((c) => c?.city) || [];

	return (
		<main className={`${styles.EarlyProgramme} ${styles[accent]}`}>
			<div className={`${styles.topBar} container f_r_a_center pt_30`}>
				<Link href="/careers/early-careers">
					<Button color="secondary" variant="underline">
						← {header?.breadcrumb || "Early Careers"}
					</Button>
				</Link>
				{header?.tag && (
					<span
						className={`${styles.tag} text_xxs text_uppercase f_w_m color_secondary b_r_5`}
					>
						{header.tag}
					</span>
				)}
			</div>

			<InnerBanner
				bannerTitle={removeHTML(data?.title)}
				showHeadingWithHTML
				bannerDescription={header?.intro}
				showContentOnly
			/>

			{map?.image?.node?.mediaItemUrl && (
				<section className="dark_bg ptb_60">
					<div className="container">
						{map?.eyebrow && (
							<p className="text_xs text_uppercase f_w_m color_silver_gray pb_20">
								{map.eyebrow}
							</p>
						)}
						<img
							src={map.image.node.mediaItemUrl}
							alt={map.image.node.altText || map?.eyebrow || ""}
							className={styles.mapImg}
						/>
					</div>
				</section>
			)}

			{(cards.length > 0 || sections.length > 0) && (
				<section className={`${styles.content} ptb_100`}>
					<div className="container">
						{cards.length > 0 && (
							<div className="pb_60">
								{overview?.eyebrow && (
									<p className="text_xs text_uppercase f_w_m color_light_gray pb_20">
										{overview.eyebrow}
									</p>
								)}
								<div className={styles.ovGrid}>
									{cards.map((card, i) => (
										<div className={`${styles.ovCard} b_r_10`} key={i}>
											<p className="text_xxs text_uppercase f_w_m color_light_gray">
												{card.label}
											</p>
											<p className="text_md font_primary f_w_m color_secondary pt_10">
												{card.value}
											</p>
										</div>
									))}
								</div>
							</div>
						)}
						{sections.map((section, i) => (
							<div className={`${styles.bodySection} pb_40`} key={i}>
								{section.heading && (
									<h3 className="text_lg font_primary f_w_m color_secondary pb_20">
										{/* CMS headings arrive as "<p>What you&#8217;ll do</p>" —
										    tags dropped, entities decoded. */}
										{parse(removeHTML(section.heading).trim())}
									</h3>
								)}
								<div className="text_reg color_dark_gray">
									<ContentFromCms>{section.content}</ContentFromCms>
								</div>
							</div>
						))}
					</div>
				</section>
			)}

			{cities.length > 0 && (
				<section className="dark_bg ptb_100">
					<div className="container">
						{locations?.title && (
							<h2 className="text_xl font_primary f_w_s_b color_white pb_10">
								{locations.title}
							</h2>
						)}
						{locations?.subtitle && (
							<p className="text_reg color_silver_gray pb_40">{locations.subtitle}</p>
						)}
						<div className={styles.cardsGrid}>
							{cities.map((city) => {
								const facts =
									city.facts?.map((f) => f?.text || f).filter(Boolean) || [];
								return (
									<div
										key={city.city}
										className={`${styles.cityCard} b_r_10 ${city.available ? "" : styles.unavail}`}
									>
										{city.flagEmoji && (
											<span className={styles.cardFlag} aria-hidden="true">
												{city.flagEmoji}
											</span>
										)}
										<p className="text_md font_primary f_w_m color_white pb_10">
											{city.city}
										</p>
										<div className={`${styles.cardFacts} pb_15`}>
											{facts.map((fact, i) => (
												<p className="text_xs color_silver_gray" key={i}>
													{fact}
												</p>
											))}
										</div>
										{city.available && city.deadline && (
											<span
												className={`${styles.deadline} text_xxs f_w_m color_primary b_r_5`}
											>
												{city.deadline}
											</span>
										)}
										<div className={styles.cardAction}>
											{city.available && city.applyUrl ? (
												<a href={city.applyUrl} target="_blank" rel="noopener noreferrer">
													<Button
														color="primary"
														variant="filled"
														shape="rounded"
														mode="dark"
													>
														{city.applyText || "Apply via Pinpoint"}
													</Button>
												</a>
											) : (
												<p className="text_xs color_medium_gray">
													{city.available ? "Opening soon" : "Not available"}
												</p>
											)}
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</section>
			)}
		</main>
	);
}
