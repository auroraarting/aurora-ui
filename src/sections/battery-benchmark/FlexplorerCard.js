// COMPONENTS //

// UTILS //
import { OpenIframePopup } from "@/utils";
import { EOS_LOGIN_URL, FLEXPLORER_DEMO_FORM } from "./eosLinks";

// STYLES //
import styles from "@/styles/sections/battery-benchmark/FlexplorerCard.module.scss";

// IMAGES //
import flexplorerLogo from "../../../public/img/battery-benchmark/flexplorer-logo.png";
import checkIcon from "../../../public/img/battery-benchmark/check-circle.svg";

// DATA //
const features = [
	"Full revenue stream breakdown by market service",
	"25-year forward forecasts under Aurora scenarios",
	"Investment-case modelling & custom configurations",
	"Fleet-level peer benchmarking (not asset-specific)",
];

/** FlexplorerCard — Flexplorer promo / CTA card (sidebar column) */
export default function FlexplorerCard() {
	return (
		<aside className={styles.card}>
			{/* ── Heading ─────────────────────────────────── */}
			<div className={styles.head}>
				<div className={styles.brand}>
					<img
						src={flexplorerLogo.src}
						className={styles.brandLogo}
						alt=""
						aria-hidden="true"
					/>
					<span className={`${styles.eyebrow} text_400`}>Flexplorer</span>
				</div>
				<h3 className={`${styles.title} text_600`}>
					The full picture sits in Flexplorer
				</h3>
			</div>

			{/* ── Feature list ────────────────────────────── */}
			<ul className={styles.features}>
				{features.map((feature) => (
					<li key={feature} className={styles.feature}>
						<img
							src={checkIcon.src}
							className={styles.featureIcon}
							alt=""
							aria-hidden="true"
						/>
						<span className={`${styles.featureText} text_xxs text_400`}>
							{feature}
						</span>
					</li>
				))}
			</ul>

			{/* ── Actions ─────────────────────────────────── */}
			<div className={styles.actions}>
				<button
					type="button"
					className={`${styles.cta} ${styles.ctaPrimary}`}
					onClick={() => OpenIframePopup("iframePopup", FLEXPLORER_DEMO_FORM)}
				>
					Request a Flexplorer demo
				</button>
				<a
					href={EOS_LOGIN_URL}
					target="_blank"
					rel="noreferrer"
					className={`${styles.cta} ${styles.ctaSecondary}`}
				>
					Sign in to EOS
				</a>
			</div>
		</aside>
	);
}
