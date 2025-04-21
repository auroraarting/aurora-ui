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
