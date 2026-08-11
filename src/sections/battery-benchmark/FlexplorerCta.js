// UTILS //
import { OpenIframePopup } from "@/utils";
import { EOS_LOGIN_URL, FLEXPLORER_DEMO_FORM } from "./eosLinks";

// STYLES //
import styles from "@/styles/sections/battery-benchmark/FlexplorerCta.module.scss";

// IMAGES //
import iconForecast from "../../../public/img/battery-benchmark/icon-forecast.svg";
import iconPeer from "../../../public/img/battery-benchmark/icon-peer-benchmark.svg";
import iconConfig from "../../../public/img/battery-benchmark/icon-custom-config.svg";
import iconSettlement from "../../../public/img/battery-benchmark/icon-daily-settlement.svg";

// DATA //
const features = [
	{
		icon: iconForecast,
		title: "Forward forecasts",
		text: "Backcast plus 25-year forecasts under Aurora scenarios",
	},
	{
		icon: iconPeer,
		title: "Asset-level peer benchmarking",
		text: "Compare your battery against the operational fleet",
	},
	{
		icon: iconConfig,
		title: "Custom configurations",
		text: "Any duration, augmentation, cycling and degradation profile",
	},
	{
		icon: iconSettlement,
		title: "Daily settlement",
		text: "Real Performance refreshed every weekday across covered markets",
	},
];

/** FlexplorerCta — closing full-width CTA band for the Battery Benchmark page */
export default function FlexplorerCta() {
	return (
		<section className={styles.cta}>
			<div className="container">
				<div className={styles.layout}>
					{/* ── Left: message + actions ─────────────── */}
					<div className={styles.lead}>
						<div className={styles.copy}>
							<span className={`${styles.eyebrow} text_400`}>
								Flexplorer · the full intelligence layer
							</span>
							<div className={styles.headingGroup}>
								<h2 className={`${styles.heading} text_600`}>
									You&apos;ve seen the benchmark.
									<br />
									Now see the assets.
								</h2>
								<p className={styles.desc}>
									The Aurora Battery Benchmark gives you the headline.{" "}
									<span className={styles.highlight}>Flexplorer</span> gives you the full
									revenue stream breakdown, 25-year forward forecasts, investment-case
									modelling and fleet-level peer benchmarking — all within EOS,
									Aurora&apos;s energy intelligence platform.
								</p>
							</div>
						</div>

						<div className={styles.actions}>
							<button
								type="button"
								className={`${styles.btn} ${styles.btnPrimary}`}
								onClick={() => OpenIframePopup("iframePopup", FLEXPLORER_DEMO_FORM)}
							>
								Request a Flexplorer demo
							</button>
							<a
								href={EOS_LOGIN_URL}
								target="_blank"
								rel="noreferrer"
								className={`${styles.btn} ${styles.btnSecondary}`}
							>
								Sign in to EOS
							</a>
						</div>
					</div>

					{/* ── Right: feature grid ─────────────────── */}
					<ul className={styles.features}>
						{features.map((feature) => (
							<li key={feature.title} className={styles.feature}>
								<span className={styles.featureIcon}>
									<img src={feature.icon.src} alt="" aria-hidden="true" />
								</span>
								<div className={styles.featureBody}>
									<p className={styles.featureTitle}>{feature.title}</p>
									<p className={styles.featureText}>{feature.text}</p>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
}
