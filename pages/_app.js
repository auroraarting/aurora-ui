// MODULES //
import { useEffect } from "react";
import { useRouter } from "next/router";

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";

// SECTIONS //

// PLUGINS //

// UTILS //
import SmoothScrolling from "@/utils/SmoothScrolling";

// STYLES //
import "@/styles/globals/globals.scss";
import { getEosPage } from "@/services/Eos.service";
import { fetchNavigationData } from "@/services/Navigation.service";

// IMAGES //

// DATA //

/** Fetch  */
export async function getServerSideProps() {
	const [data] = await Promise.all([fetchNavigationData()]);

	return {
		props: {
			data,
		},
	};
}

/** App Page */
export default function MyApp({ Component, pageProps, data }) {
	const router = useRouter();
	const { search } = router.query;

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

	console.log("data", data);

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
