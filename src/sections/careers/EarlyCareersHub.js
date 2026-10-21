"use client";

// MODULES //
import Link from "next/link";

// COMPONENTS //
import InnerBanner from "@/components/InnerBanner";
import AccordianCommon from "@/components/AccordianCommon";
import Button from "@/components/Buttons/Button";
import ContentFromCms from "@/components/ContentFromCms";

// UTILS //
import { scrollToSection } from "@/utils/ScrollToSection";

// STYLES //
import styles from "@/styles/sections/careers/EarlyCareersHub.module.scss";

const exploreId = "explore-programmes";

/** Early careers hub — banner plus the region → city → programme accordion.
 *  @param {{ hero: any, explore: any, regions: Array<{
 *    name: string, slug: string, note?: string,
 *    cities: Array<{ city: string, flagEmoji?: string,
 *      roles: Array<{ label: string, slug: string, accent: string }> }> }> }} props */
export default function EarlyCareersHub({ hero, explore, regions }) {
	/** The banner's "Join us" is a plain #anchor, which Lenis ignores — scroll
	 *  through it instead (see utils/ScrollToSection). */
	const onBannerClick = (e) => {
		if (!e.target.closest?.(`a[href="#${exploreId}"]`)) return;
		e.preventDefault();
		scrollToSection(document.getElementById(exploreId));
	};

	const items = regions.map((region) => ({
		title: region.name,
		children: (
			<div className={styles.regionBody} key={region.slug}>
				{region.cities.map((city) => (
					<div key={city.city} className={styles.cityGroup}>
						<p
							className={`${styles.cityHeader} text_xs text_uppercase f_w_m color_silver_gray f_r_a_center`}
						>
							{city.flagEmoji && (
								<span className={styles.cityFlag} aria-hidden="true">
									{city.flagEmoji}
								</span>
							)}
							{city.city}
						</p>
						{city.roles.map((role) => (
							<Link
								key={role.slug}
								href={`/careers/early-careers/${role.slug}`}
								className={`${styles.roleRow} f_r_aj_between b_r_10`}
							>
								<span className="f_r_a_center">
									<span className={`${styles.roleDot} ${styles[role.accent]}`} />
									<span className="text_reg font_primary f_w_m color_white">
										{role.label}
									</span>
								</span>
								<Button color="secondary" variant="underline" mode="dark">
									View programme
								</Button>
							</Link>
						))}
					</div>
				))}

				{region.note && (
					<div className={`${styles.regionNote} text_sm color_silver_gray b_r_10`}>
						<ContentFromCms>{region.note}</ContentFromCms>
					</div>
				)}
			</div>
		),
	}));

	return (
		<main className={styles.EarlyCareersHub}>
			<div className="pb_100" onClickCapture={onBannerClick}>
				<InnerBanner
					bannerTitle={[hero?.title, hero?.highlight].filter(Boolean).join(" ")}
					bannerDescription={hero?.description}
					desktopImage={hero?.image?.node?.mediaItemUrl}
					mobileImage={hero?.image?.node?.mediaItemUrl}
					btnTxt={hero?.buttonText}
					btnLink={hero?.buttonLink || `#${exploreId}`}
				/>
			</div>

			<section id={exploreId} className={`${styles.explore} ptb_100`}>
				<div className="container">
					{explore?.eyebrow && (
						<p className="text_xs text_uppercase f_w_m color_primary pb_10">
							{explore.eyebrow}
						</p>
					)}
					{explore?.title && (
						<h2 className="text_xl font_primary f_w_s_b color_white pb_30">
							{explore.title}
						</h2>
					)}
					<AccordianCommon
						fontStyle={"text_lg"}
						fontWeight={"f_w_s_b"}
						fontFamily={"font_primary"}
						fontColor={"color_white"}
						items={items}
						firstActive={true}
					/>
				</div>
			</section>
		</main>
	);
}
