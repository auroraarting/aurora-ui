// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

// MODULES //

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/notification/Mailinglist.module.scss";

// IMAGES //
import dropdown_arrow from "/public/img/icons/dropdown_arrow.svg";

// DATA //

/** Meta Data */
export const metadata = {
	title: "Thank You | Aurora",
	description: "Aurora",
};

/** Cookies Page */
export default function Cookies() {
	return (
		<div>
			{/* Metatags */}
			<MetaTags Title={"Cookies"} Desc={""} OgImg={""} Url={"/cookies"} />

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.TermsPage}>
				<section className={`${styles.TermsInside} pt_60 pb_100`}>
					<div className="container">
						<h1 className="text_xl font_primary f_w_s_b color_secondary pb_20 text_uppercase">
							Thank You
						</h1>
						<div className={`${styles.termsContent}`}>
							<h2>You have been subscribed to our mailing list.</h2>
						</div>
					</div>
				</section>
			</main>
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
