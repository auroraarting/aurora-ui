// MODULES //

// COMPONENTS //

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/components/Loader.module.scss";

// IMAGES //

// DATA //

/** Loader Component */
export default function Loader({ hide }) {
	return (
		<div className={`loaderWrap ${styles.loaderWrap} ${hide && "hide"}`}>
			<div className={styles.loader}></div>
		</div>
	);
}
