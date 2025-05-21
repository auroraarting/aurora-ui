// Force SSR (like getServerSideProps)
export const dynamic = "force-dynamic"; // ⚠️ Important!
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
import styles from "@/styles/pages/legal/Terms.module.scss";

// IMAGES //
import dropdown_arrow from "/public/img/icons/dropdown_arrow.svg";

// DATA //

/** Meta Data */
export const metadata = {
	title: "Cookies | Aurora",
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
				<section className={`${styles.TermsInside} ptb_100`}>
					<div className="container">
						<h1 className="text_xl font_primary f_w_s_b color_secondary pb_20 text_uppercase">
							Cookies Policy
						</h1>
						<div className={`${styles.termsContent}`}>
							<h2>1. What are Cookies?</h2>
							<p>
								Our website uses small electronic files of letters and numbers called
								cookies. Cookies help us to tell you apart from other visitors, to
								deliver a consistent experience while visiting our site. Storing these
								cookies on your browser or the hard drive of your computer helps us to
								provide you with a good experience when you browse our website and also
								allows us to improve our site.
							</p>
							<p>We use the following types of cookies:</p>
							<ul>
								<li>
									<b>Strictly necessary cookies:</b> These are cookies that are required
									for the operation of our website. They include, for example, cookies
									that enable you to log into secure areas of our website. These are
									placed automatically when you first arrive at the site and as you
									navigate around it, including when you sign into our EOS platform.
								</li>
								<li>
									<b>Analytical or performance cookies:</b> These allow us to recognise
									and count the number of visitors and to see how visitors move around
									our website when they are using it. This helps us to improve the way
									our website works, for example, by ensuring that users are finding what
									they are looking for easily.
								</li>
								<li>
									<b>Functionality cookies:</b> These are used to recognise you when you
									return to our website and the EOS platform. This enables us to
									personalise our content for you and remember your preferences (for
									example, your choice of language or region).
								</li>
							</ul>
							<h2>2. What we collect</h2>
							<p>
								You can find more information about the individual cookies we use and
								the purposes for which we use them in the table below. With the
								exception of strictly necessary cookies we need your agreement before we
								can place any of the other cookies listed below. This information will
								help you to decide whether you want to agree to cookies being placed and
								to know more about what data they collect and what is done with it.
							</p>
							<div className={`${styles.tableBox} `}>
								<table>
									<tbody>
										<tr>
											<th>Cookie Title / Name </th>
											<th>Purpose</th>
											<th>More information</th>
										</tr>
										<tr>
											<td>
												eos-sid <br />
												JSESSIONID
											</td>
											<td>
												Keeps track of individual users in the EOS platform, so they can
												remain logged in, and so that they are shown the right information
												for the services they subscribe to.
											</td>
											<td>-</td>
										</tr>
										<tr>
											<td>
												_ga <br />
												_gid
												<br />
												_gat
											</td>
											<td>
												Google Analytics to support usage analytics of the website and the
												EOS platform, so we can monitor things like number of visitors, most
												visited pages, etc.
											</td>
											<td>
												Read more from Google{" "}
												<a href="https://developers.google.com/analytics/legacy/universal-analytics">
													here.
												</a>
											</td>
										</tr>
										<tr>
											<td>geo</td>
											<td>
												Functional cookie for Apple Podcasts used for identifying the
												geographical location by country of the user
											</td>
											<td>
												Read{" "}
												<a href="https://www.apple.com/ca/legal/privacy/en-ww/cookies/">
													Cookie Policy
												</a>{" "}
												from Apple.
											</td>
										</tr>
										<tr>
											<td>gscs</td>
											<td>
												Registers data on visitor’s website behaviour. This is used for
												internal analysis and website optimization. Provided by MSLETB via
												Getsitecontrol.com
											</td>
											<td>
												<a href="https://getsitecontrol.com/">
													https://getsitecontrol.com.
												</a>{" "}
												Read the{" "}
												<a href="https://getsitecontrol.com/privacy/">Privacy Policy</a>{" "}
												from Getsitecontrol.com.
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							<h2>3. Third party cookie usage</h2>
							<p>
								Please note that the following third parties may also use cookies, over
								which we have no control. These named third parties may include, for
								example, advertising networks and providers of external services like
								web traffic analysis services. These third party cookies are likely to
								be analytical cookies or performance cookies or targeting cookies:
							</p>
							<ul>
								<li>Apple Podcasts</li>
								<li>Google Analytics</li>
								<li>WordPress</li>
							</ul>
							<h2>4. Blocking cookies</h2>
							<p>
								You can block cookies by activating the setting on your browser that
								allows you to refuse the setting of all or some cookies. However, if you
								use your browser settings to block all cookies (including essential
								cookies) you may not be able to access all or parts of our website.
							</p>
							<p>
								All cookies over which we have control will expire after one month. The
								third-party cookies on our website, which we do not have control over,
								expire after two years.
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
