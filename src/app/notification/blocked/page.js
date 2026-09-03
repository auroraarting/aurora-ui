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
import styles from "@/styles/pages/notification/Blocked.module.scss";

// IMAGES //

// DATA //

/** Meta Data */
export const metadata = {
	title: "Access Blocked | Aurora",
	description: "Aurora",
	robots: {
		index: false,
		follow: false,
	},
	alternates: {
		canonical: "https://auroraer.com/notification/blocked", // 👈 canonical URL
	},
};

/** Blocked Page */
export default function Blocked() {
	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags Title={"Access Blocked"} Desc={""} OgImg={""} Url={"/notification/blocked"} /> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.TermsPage}>
				<section className={`${styles.TermsInside} pt_60 pb_100`}>
					<div className="container">
						<h1 className="text_xl font_primary f_w_s_b color_secondary pb_20 text_uppercase">
							Access Blocked
						</h1>
						<div className={`${styles.termsContent}`}>
							<p className="pb_10">
								Thank you for your interest in our content. Unfortunately, we are unable
								to accept your form submission. This is likely because:
							</p>
							<ul className="pb_10">
								<li>You registered using a personal email address, or</li>
								<li>Your email domain is associated with a competing organisation.</li>
							</ul>
							<p>
								We apologise for any inconvenience this may cause and appreciate your
								understanding. If you believe this decision has been made in error, or
								would like to discuss your eligibility, please contact our team at{" "}
								<a href="mailto:insightsemea@auroraer.com">insightsemea@auroraer.com</a>
							</p>
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
