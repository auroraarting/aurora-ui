/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
// MODULES //
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import Link from "next/link";

// COMPONENTS //

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/components/Footer.module.scss";

// IMAGES //
import footer_logo from "../../public/img/footer_logo.svg";
import ting_logo from "../../public/img/ting_logo.svg";
import white_plus_arrow from "../../public/img/icons/white_plus_arrow.png";
import white_minus_arrow from "../../public/img/icons/white_minus_arrow.svg";
import black_right from "../../public/img/icons/black_right.svg";
import x from "../../public/img/icons/social/x.svg";
import footer_linkedin from "../../public/img/icons/social/footer_linkedin.svg";
import footer_youtube from "../../public/img/icons/social/footer_youtube.svg";
import soundcloud from "../../public/img/icons/social/soundcloud.svg";

// DATA //

// SERVICES //
import { fetchNavigationData } from "@/services/Navigation.service";

/** Footer Component */
export default function Footer() {
	const currentYear = new Date().getFullYear();
	const [toggleState, settoggleState] = useState(0);
	const [data, setData] = useState();

	/** toggleTab */
	const toggleTab = (index) => {
		if (toggleState == index) {
			return settoggleState(null);
		}
		settoggleState(index);
	};

	/** fetchData  */
	async function fetchData() {
		const obj = await fetchNavigationData();
		setData(obj);
	}

	useEffect(() => {
		fetchData();
	}, []);

	console.log("data", data);

	return (
		<footer className={`${styles.main_footer}`}>
			<div className={`${styles.bg_footer}`}>
				<div className={`${styles.footerMenuMain}`}>
					<div className="container">
						<div className={`${styles.footerMenuFlex}`}>
							<div className={`${styles.footerMenuItem_left}`}>
								<div className={`${styles.footerLogo}`}>
									<Link href="/">
										<a>
											<img src={footer_logo.src} alt="logo" />
										</a>
									</Link>
								</div>
								<div className={`${styles.social_media} pt_40`}>
									<ul className={`${styles.footerMenuInnerItem}`}>
										<li>
											<Link href="https://x.com/i/flow/login?redirect_after_login=%2Fauroraer_oxford">
												<a target="_blank" rel="noreferrer">
													<img src={x.src} alt="x" />
												</a>
											</Link>
										</li>
										<li>
											<Link href="https://www.linkedin.com/company/aurora-energy-research-limited">
												<a target="_blank" rel="noreferrer">
													<img src={footer_linkedin.src} alt="linkedin" />
												</a>
											</Link>
										</li>
										<li>
											<Link href="https://www.youtube.com/channel/UCp62kF6LHu7IycqpxQ7IqbQ">
												<a target="_blank" rel="noreferrer">
													<img src={footer_youtube.src} alt="youtube" />
												</a>
											</Link>
										</li>
										<li>
											<Link href="https://www.youtube.com/channel/UCp62kF6LHu7IycqpxQ7IqbQ">
												<a target="_blank" rel="noreferrer">
													<img src={soundcloud.src} alt="soundcloud" />
												</a>
											</Link>
										</li>
									</ul>
								</div>
							</div>
							<div className={`${styles.footerMenuItem_center}`}>
								<div className={`${styles.footerMenuInnerFlex}`}>
									<ul className={`${styles.footerMenuInnerItem}`}>
										<li>
											<Link href="/about">About Us</Link>
										</li>
										<li
											className={`${styles.sub_menu_box} ${
												toggleState === 1 && styles.drop_down_active
											}`}
											onClick={() => toggleTab(1)}
										>
											<div className={`${styles.sub_menu_flex} d_f`}>
												<a className="">Who Are You</a>
												<img
													src={white_plus_arrow.src}
													className={`${styles.white_plus_arrow}`}
													alt="down"
												/>
												<img
													src={white_minus_arrow.src}
													className={`${styles.white_minus_arrow}`}
													alt="down"
												/>
											</div>
											<div className={`${styles.sub_menu_list}`}>
												{data?.whoareyous?.map((item, ind) => {
													return (
														<p key={ind}>
															<a href={`/who-are-you/${item?.slug}`}>
																<p className="">{item?.title}</p>
															</a>
															<img
																src={black_right.src}
																className={`${styles.black_right}`}
																alt="down"
															/>
														</p>
													);
												})}
												{/* <p>
													<Link href="">
														<a className="">Flexible Energy</a>
													</Link>
													<img
														src={black_right.src}
														className={`${styles.black_right}`}
														alt="down"
													/>
												</p>
												<p>
													<Link href="">
														<a className="">Power & Renewable</a>
													</Link>
													<img
														src={black_right.src}
														className={`${styles.black_right}`}
														alt="down"
													/>
												</p>
												<p>
													<Link href="">
														<a className="">Hydrogen</a>
													</Link>
													<img
														src={black_right.src}
														className={`${styles.black_right}`}
														alt="down"
													/>
												</p> */}
											</div>
										</li>
										<li
											className={`${styles.sub_menu_box} ${
												toggleState === 2 && styles.drop_down_active
											}`}
											onClick={() => toggleTab(2)}
										>
											<div className={`${styles.sub_menu_flex} d_f`}>
												<a className="">How We Help</a>
												<img
													src={white_plus_arrow.src}
													className={`${styles.white_plus_arrow}`}
													alt="down"
												/>
												<img
													src={white_minus_arrow.src}
													className={`${styles.white_minus_arrow}`}
													alt="down"
												/>
											</div>
											<div className={`${styles.sub_menu_list}`}>
												{data?.howWeHelps?.map((item, ind) => {
													return (
														<p key={ind}>
															<a href={`/how-we-help/${item?.slug}`}>
																<p className="">{item?.title}</p>
															</a>
															<img
																src={black_right.src}
																className={`${styles.black_right}`}
																alt="down"
															/>
														</p>
													);
												})}
												{/* <p>
													<Link href="">
														<a className="">Flexible Energy</a>
													</Link>
													<img
														src={black_right.src}
														className={`${styles.black_right}`}
														alt="down"
													/>
												</p>
												<p>
													<Link href="">
														<a className="">Power & Renewable</a>
													</Link>
													<img
														src={black_right.src}
														className={`${styles.black_right}`}
														alt="down"
													/>
												</p>
												<p>
													<Link href="">
														<a className="">Hydrogen</a>
													</Link>
													<img
														src={black_right.src}
														className={`${styles.black_right}`}
														alt="down"
													/>
												</p> */}
											</div>
										</li>
										<li
											className={`${styles.sub_menu_box} ${
												toggleState === 3 && styles.drop_down_active
											}`}
											onClick={() => toggleTab(3)}
										>
											<div className={`${styles.sub_menu_flex} d_f`}>
												<a className="/careers">Careers</a>
												<img
													src={white_plus_arrow.src}
													className={`${styles.white_plus_arrow}`}
													alt="down"
												/>
												<img
													src={white_minus_arrow.src}
													className={`${styles.white_minus_arrow}`}
													alt="down"
												/>
											</div>
											<div className={`${styles.sub_menu_list}`}>
												<p>
													<a href="/careers/flexible-energy">
														<p className="">Flexible Energy</p>
													</a>
													<img
														src={black_right.src}
														className={`${styles.black_right}`}
														alt="down"
													/>
												</p>
												<p>
													<a href="/careers/power-renewable">
														<p className="">Power & Renewable</p>
													</a>
													<img
														src={black_right.src}
														className={`${styles.black_right}`}
														alt="down"
													/>
												</p>
												<p>
													<a href="/careers/hydrogen">
														<p className="">Hydrogen</p>
													</a>
													<img
														src={black_right.src}
														className={`${styles.black_right}`}
														alt="down"
													/>
												</p>
											</div>
										</li>
									</ul>
									<ul className={`${styles.footerMenuInnerItem}`}>
										<li>
											<a href="/eos">EOS Platform</a>
										</li>
										<li
											className={`${styles.sub_menu_box} ${
												toggleState === 4 && styles.drop_down_active
											}`}
											onClick={() => toggleTab(4)}
										>
											<div className={`${styles.sub_menu_flex} d_f`}>
												<a className="/softwares">Software</a>
												<img
													src={white_plus_arrow.src}
													className={`${styles.white_plus_arrow}`}
													alt="down"
												/>
												<img
													src={white_minus_arrow.src}
													className={`${styles.white_minus_arrow}`}
													alt="down"
												/>
											</div>
											<div className={`${styles.sub_menu_list}`}>
												{data?.softwares?.map((item, ind) => {
													return (
														<p key={ind}>
															<a href={`/softwares/${item?.slug}`}>
																<p className="">{item?.title}</p>
															</a>
															<img
																src={black_right.src}
																className={`${styles.black_right}`}
																alt="down"
															/>
														</p>
													);
												})}
												{/* <p>
													<Link href="">
														<a className="">Flexible Energy</a>
													</Link>
													<img
														src={black_right.src}
														className={`${styles.black_right}`}
														alt="down"
													/>
												</p>
												<p>
													<Link href="">
														<a className="">Power & Renewable</a>
													</Link>
													<img
														src={black_right.src}
														className={`${styles.black_right}`}
														alt="down"
													/>
												</p>
												<p>
													<Link href="">
														<a className="">Hydrogen</a>
													</Link>
													<img
														src={black_right.src}
														className={`${styles.black_right}`}
														alt="down"
													/>
												</p> */}
											</div>
										</li>
										<li
											className={`${styles.sub_menu_box} ${
												toggleState === 5 && styles.drop_down_active
											}`}
											onClick={() => toggleTab(5)}
										>
											<div className={`${styles.sub_menu_flex} d_f`}>
												<a className="/products">Subscription Analytics</a>
												<img
													src={white_plus_arrow.src}
													className={`${styles.white_plus_arrow}`}
													alt="down"
												/>
												<img
													src={white_minus_arrow.src}
													className={`${styles.white_minus_arrow}`}
													alt="down"
												/>
											</div>
											<div className={`${styles.sub_menu_list}`}>
												{data?.products?.map((item, ind) => {
													return (
														<p key={ind}>
															<a href={`/products/${item?.slug}`}>
																<p className="">{item?.title}</p>
															</a>
															<img
																src={black_right.src}
																className={`${styles.black_right}`}
																alt="down"
															/>
														</p>
													);
												})}
												{/* <p>
													<Link href="">
														<a className="">Flexible Energy</a>
													</Link>
													<img
														src={black_right.src}
														className={`${styles.black_right}`}
														alt="down"
													/>
												</p>
												<p>
													<Link href="">
														<a className="">Power & Renewable</a>
													</Link>
													<img
														src={black_right.src}
														className={`${styles.black_right}`}
														alt="down"
													/>
												</p>
												<p>
													<Link href="">
														<a className="">Hydrogen</a>
													</Link>
													<img
														src={black_right.src}
														className={`${styles.black_right}`}
														alt="down"
													/>
												</p> */}
											</div>
										</li>
										{data?.services?.map((item, ind) => {
											return (
												<li key={ind}>
													<a href={`/services/${item?.slug}`}>{item?.title}</a>
												</li>
											);
										})}
									</ul>

									<ul className={`${styles.footerMenuInnerItem}`}>
										<li>
											<a href="/press">Press</a>
										</li>
										<li>
											<a href="/events">Events</a>
										</li>
										<li>
											<a href="/resources">Resources</a>
										</li>
										<li>
											<a href="/contact">Contact Us</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div className={`${styles.footerGlobal} m_t_30`}>
							<p className="font_primary color_white f_r_aj_between">
								<span>Global Presence</span>
								<img
									src={white_plus_arrow.src}
									className={`${styles.white_plus_arrow}`}
									alt="down"
								/>
							</p>
						</div>
						<div className={`${styles.footerBtmFlex} f_w_j a_center`}>
							<div className={`${styles.footerBtmItem}`}>
								<p className="text_sm  color_silver_gray">
									© {currentYear} Aurora Energy Research
								</p>
							</div>
							<div className={`${styles.footerBtmItem}`}>
								<ul>
									<li className="color_silver_gray">
										<a href="/legal/terms">Terms</a>
									</li>
									<li className="color_silver_gray">
										<a href="/legal/cookies">Cookies</a>
									</li>
									<li className="color_silver_gray">
										<a href="/policies-and-compliance">Policies and Compliance</a>
									</li>
								</ul>
							</div>
							<div className={`${styles.footerBtmItem}`}>
								<a
									href="https://www.ting.in/"
									className="text_reg text_500"
									target="_blank"
									rel="noreferrer"
								>
									<img src={ting_logo.src} alt="ting logo" />
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <p>© {new Date().getFullYear()} Copyright</p> */}
		</footer>
	);
}
