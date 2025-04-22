// MODULES //
import { useEffect } from "react";

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";

// SECTIONS //

// PLUGINS //

// UTILS //
import SmoothScrolling from "@/utils/SmoothScrolling";

// STYLES //
import "@/styles/globals/globals.scss";

// IMAGES //

// DATA //

/** App Page */
export default function MyApp({ Component, pageProps }) {
	useEffect(() => {
		SmoothScrolling();

		// Change Global Css Variables
		const header = document
			?.querySelector(".main_headerBox")
			?.getBoundingClientRect();
		const sectionHeader = document
			?.querySelector(".SectionsHeader")
			?.getBoundingClientRect();

		if (header) {
			document.documentElement.style.setProperty(
				"--header_height",
				`${header.height}px`
			);
		}
		if (sectionHeader) {
			document.documentElement.style.setProperty(
				"--section_height",
				`${sectionHeader.height}px`
			);
		}
	}, []);

	return (
		<>
			{/* Header */}
			<Header />
			<Component {...pageProps} />
			{/* Footer */}
			<Footer />
		</>
	);
}
