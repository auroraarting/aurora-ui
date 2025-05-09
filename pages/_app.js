// MODULES //
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Loader from "@/components/Loader";

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
	const router = useRouter();
	const { search } = router.query;
	const [loading, setLoading] = useState(false);

	/** highlightMatches  */
	function highlightMatches(node, term) {
		if (!term || !node || node.nodeType !== 1) return;

		// eslint-disable-next-line @typescript-eslint/naming-convention
		const TEXT_NODE = 3;

		for (let child of Array.from(node.childNodes)) {
			if (child.nodeType === TEXT_NODE) {
				const val = child.nodeValue;
				const idx = val.toLowerCase().indexOf(term);

				if (idx !== -1) {
					const span = document.createElement("span");
					span.className = "highlight";
					span.textContent = val.slice(idx, idx + term.length);

					const after = document.createTextNode(val.slice(idx + term.length));
					const before = document.createTextNode(val.slice(0, idx));

					const parent = child.parentNode;
					parent.replaceChild(after, child);
					parent.insertBefore(span, after);
					parent.insertBefore(before, span);
				}
			} else if (child.nodeType === 1) {
				highlightMatches(child, term);
			}
		}
	}

	/** addCssVariables  */
	const addCssVariables = () => {
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
	};

	useEffect(() => {
		SmoothScrolling();
		addCssVariables();
		setTimeout(() => {
			addCssVariables();
		}, 1000);
	}, []);

	useEffect(() => {
		if (search) {
			highlightMatches(document.body, search.toLowerCase());
		}
	}, [search]);

	useEffect(() => {
		/** handleStart  */
		const handleStart = () => setLoading(true);
		/** handleComplete  */
		const handleComplete = () => setLoading(false);

		router.events.on("routeChangeStart", handleStart);
		router.events.on("routeChangeComplete", handleComplete);
		router.events.on("routeChangeError", handleComplete);

		return () => {
			router.events.off("routeChangeStart", handleStart);
			router.events.off("routeChangeComplete", handleComplete);
			router.events.off("routeChangeError", handleComplete);
		};
	}, [router]);

	console.log(loading, "loading");

	return (
		<>
			{/* Header */}
			<Header />
			{loading && <Loader />}
			<Component {...pageProps} />
			{/* Footer */}
			<Footer />
		</>
	);
}
