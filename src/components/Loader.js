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
export default function Loader() {
	return (
		<div className={styles.loaderWrap}>
			<div className={styles.loader}></div>
		</div>
	);
}
