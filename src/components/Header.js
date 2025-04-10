// MODULES //
import { useState } from "react";

// COMPONENTS //
import Image from "next/image";
import Link from "next/link";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/components/Header.module.scss";

// IMAGES //
import Arrow from "@/../public/img/icons/arrow.svg";
import logo from "@/../public/img/logo.svg";
import search from "@/../public/img/icons/search.svg";
import login_icon from "@/../public/img/icons/login_icon.svg";
import menu_hover_arrow from "@/../public/img/icons/menu_hover_arrow.svg";

// DATA //

/** Header Component */
export default function Header() {
	const [openSidebar, setOpenSidebar] = useState(false);
	const [openDropdown, setOpenDropdown] = useState(null);

	/** Open sidebar on click of hamburger */
	const toggleSidebar = () => {
		setOpenSidebar(!openSidebar);
	};

	/** Function to toggle dropdown */
	const toggleDropdown = (dropdownKey) => {
		setOpenDropdown((prevOpenDropdown) =>
			prevOpenDropdown === dropdownKey ? null : dropdownKey
		);
	};

	return (
		<header className={`${styles.main_headerBox}`}>
			<div className={`${styles.headerTopBg} f_r_aj_between`}>
				<div className={`${styles.searchRight}`}>
					<a
						href=""
						className={`${styles.searchFlex} text_sm f_w_m color_dark_gray font_primary f_r_a_center`}
					>
						<img src={search.src} alt="search" />
						<span>Search</span>
					</a>
				</div>
				<div className={`${styles.searchLeft}`}>
					<a
						href=""
						className={`${styles.eosFlex} text_xxs f_w_m font_primary color_secondary f_r_a_center`}
					>
						<img src={login_icon.src} alt="login" />
						<span>EOS Sign in</span>
					</a>
				</div>
			</div>
			<div
				className={`${styles.main_header} ${
					openSidebar ? styles.sidebar_opened : ""
				}`}
			>
				<div className={`${styles.menuListBox} f_r_aj_between`}>
					<div className={`${styles.header_inside}`}>
						{/* Logo wrap */}
						<Link href="/">
							<div className={styles.image_wrap}>
								<img src={logo.src} alt="logo" />
							</div>
						</Link>

						{/* Links Wrap */}
						<div className={`${styles.links_wrap}`}>
							{/* Add "has_dropdown" class if your link has dropdown */}
							<div
								className={`${styles.links} ${styles.has_dropdown} ${
									openDropdown === "company" ? styles.dropdown_opened : ""
								} dropdown`}
								onClick={() => toggleDropdown("company")}
							>
								<div className={styles.link_title}>
									<p className="text_xs font_primary color_dark_gray">Company</p>
									<span className={styles.arrow_img}>
										<Image src={Arrow} alt="Arrow" />
									</span>
								</div>
								{/* Dropdown is opened when link is clicked */}
								<div className={`${styles.dropdown_wrap}`}>
									<div className={`${styles.megaMenuBox} f_w_j`}>
										<div className={`${styles.menuBoxRight}`}>
											<div className={`${styles.pageName}`}>
												<h4 className="text_xxs font_primary color_medium_gray">
													Who We Are
												</h4>
											</div>
											<div className={`${styles.pageLinks} pt_20`}>
												<a
													href=""
													className={`${styles.pageLinksTxt} f_r_a_center text_xs font_primary color_dark_gray`}
												>
													<span>About Us</span>{" "}
													<img src={menu_hover_arrow.src} alt="arrow" />
												</a>
												<a
													href=""
													className={`${styles.pageLinksTxt} f_r_a_center text_xs font_primary color_dark_gray`}
												>
													<span>Global Presence</span>{" "}
													<img src={menu_hover_arrow.src} alt="arrow" />
												</a>
												<a
													href=""
													className={`${styles.pageLinksTxt} f_r_a_center text_xs font_primary color_dark_gray`}
												>
													<span>Press</span> <img src={menu_hover_arrow.src} alt="arrow" />
												</a>
												<a
													href=""
													className={`${styles.pageLinksTxt} f_r_a_center text_xs font_primary color_dark_gray`}
												>
													<span>Contact Us</span>{" "}
													<img src={menu_hover_arrow.src} alt="arrow" />
												</a>
											</div>
										</div>
										<div className={`${styles.menuBoxleft}`}>bcvbc</div>
									</div>
								</div>
							</div>
							<div
								className={`${styles.links} ${styles.has_dropdown} ${
									openDropdown === "WhoAreYou" ? styles.dropdown_opened : ""
								} dropdown`}
								onClick={() => toggleDropdown("WhoAreYou")}
							>
								<div className={styles.link_title}>
									<p className="text_xs font_primary color_dark_gray">Who Are You</p>
									<span className={styles.arrow_img}>
										<Image src={Arrow} alt="Arrow" />
									</span>
								</div>
								{/* Dropdown is opened when link is clicked */}
								<div className={`${styles.dropdown_wrap}`}>
									<Link href="">
										<p className={styles.dropdown_links}>Blog 1</p>
									</Link>
									<Link href="">
										<p className={styles.dropdown_links}>Blog 2</p>
									</Link>
									<Link href="">
										<p className={styles.dropdown_links}>Blog 3</p>
									</Link>
								</div>
							</div>
							<div
								className={`${styles.links} ${styles.has_dropdown} ${
									openDropdown === "HowWeHelp" ? styles.dropdown_opened : ""
								} dropdown`}
								onClick={() => toggleDropdown("HowWeHelp")}
							>
								<div className={styles.link_title}>
									<p className="text_xs font_primary color_dark_gray">How We Help</p>
									<span className={styles.arrow_img}>
										<Image src={Arrow} alt="Arrow" />
									</span>
								</div>
								{/* Dropdown is opened when link is clicked */}
								<div className={`${styles.dropdown_wrap}`}>
									<Link href="">
										<p className={styles.dropdown_links}>Blog 1</p>
									</Link>
									<Link href="">
										<p className={styles.dropdown_links}>Blog 2</p>
									</Link>
									<Link href="">
										<p className={styles.dropdown_links}>Blog 3</p>
									</Link>
								</div>
							</div>
							<div
								className={`${styles.links} ${styles.has_dropdown} ${
									openDropdown === "ProductServices" ? styles.dropdown_opened : ""
								} dropdown`}
								onClick={() => toggleDropdown("ProductServices")}
							>
								<div className={styles.link_title}>
									<p className="text_xs font_primary color_dark_gray">
										Product & Services
									</p>
									<span className={styles.arrow_img}>
										<Image src={Arrow} alt="Arrow" />
									</span>
								</div>
								{/* Dropdown is opened when link is clicked */}
								<div className={`${styles.dropdown_wrap}`}>
									<Link href="">
										<p className={styles.dropdown_links}>Blog 1</p>
									</Link>
									<Link href="">
										<p className={styles.dropdown_links}>Blog 2</p>
									</Link>
									<Link href="">
										<p className={styles.dropdown_links}>Blog 3</p>
									</Link>
								</div>
							</div>
							<div
								className={`${styles.links} ${styles.has_dropdown} ${
									openDropdown === "Resources" ? styles.dropdown_opened : ""
								} dropdown`}
								onClick={() => toggleDropdown("Resources")}
							>
								<div className={styles.link_title}>
									<p className="text_xs font_primary color_dark_gray">Resources</p>
									<span className={styles.arrow_img}>
										<Image src={Arrow} alt="Arrow" />
									</span>
								</div>
								{/* Dropdown is opened when link is clicked */}
								<div className={`${styles.dropdown_wrap}`}>
									<Link href="">
										<p className={styles.dropdown_links}>Blog 1</p>
									</Link>
									<Link href="">
										<p className={styles.dropdown_links}>Blog 2</p>
									</Link>
									<Link href="">
										<p className={styles.dropdown_links}>Blog 3</p>
									</Link>
								</div>
							</div>
							<div className={styles.links}>
								<Link href="">
									<div
										className={`${styles.link_title} text_xs font_primary color_dark_gray`}
									>
										Events
									</div>
								</Link>
							</div>
							<div
								className={`${styles.links} ${styles.has_dropdown} ${
									openDropdown === "Careers" ? styles.dropdown_opened : ""
								} dropdown`}
								onClick={() => toggleDropdown("Careers")}
							>
								<div className={styles.link_title}>
									<p className="text_xs font_primary color_dark_gray">Careers</p>
									<span className={styles.arrow_img}>
										<Image src={Arrow} alt="Arrow" />
									</span>
								</div>
								{/* Dropdown is opened when link is clicked */}
								<div className={`${styles.dropdown_wrap}`}>
									<Link href="">
										<p className={styles.dropdown_links}>Blog 1</p>
									</Link>
									<Link href="">
										<p className={styles.dropdown_links}>Blog 2</p>
									</Link>
									<Link href="">
										<p className={styles.dropdown_links}>Blog 3</p>
									</Link>
								</div>
							</div>
						</div>

						{/* Hamburger icon visible in mobile only */}
						<div className={styles.hamburger_icon} onClick={toggleSidebar}>
							<span className={styles.hamburger_line}></span>
							<span className={styles.hamburger_line}></span>
							<span className={styles.hamburger_line}></span>
						</div>
					</div>
					<div className={`${styles.globalList}`}>
						<p className="text_sm font_primary color_dark_gray f_w_m">
							Global Presence{" "}
						</p>
					</div>
				</div>
			</div>
		</header>
	);
}
