// MODULES //

// COMPONENTS //

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/softwares/SoftwareBanner.module.scss";

// IMAGES //
import SoftwareLogo from "../../../public/img/softwares/chronos-logo.png";

// DATA //

/** SoftwareBanner Section */
export default function SoftwareBanner() {
	return (
		<section className={`${styles.SoftwareBanner} ptb_100`}>
			<div className="container">
				<img
					src={SoftwareLogo.src}
					alt="Software Logo"
					className={`${styles.SoftwareLogo}`}
				/>
			</div>
		</section>
	);
}
