// Force SSR (like getServerSideProps)
// // export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

// MODULES //

// COMPONENTS //

// SECTIONS //
import FaqWrap from "@/sections/careers/FaqWrap";

// PLUGINS //

// UTILS //

// STYLES //

// IMAGES //

// DATA //

// SERVICES //
import { getFaqPage } from "@/services/Faq.service";

/** Meta Data */
export const metadata = {
	title: "FAQ | Aurora",
	description: "Aurora",
};

/** Faq Page */
export default async function Faq() {
	const [pageFetch] = await Promise.all([await getFaqPage()]);
	const page = pageFetch.data.page.faq;

	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags Title={"Faq"} Desc={""} OgImg={""} Url={"/careers/faq"} /> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<FaqWrap page={page} />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
