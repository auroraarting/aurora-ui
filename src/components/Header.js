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
									openDropdown === "aboutUs" ? styles.dropdown_opened : ""
								} dropdown`}
								onClick={() => toggleDropdown("aboutUs")}
							>
								<div className={styles.link_title}>
									<p>About Us</p>
									<span className={styles.arrow_img}>
										<Image src={Arrow} alt="Arrow" />
									</span>
								</div>
								{/* Dropdown is opened when link is clicked */}
								<div className={`${styles.dropdown_wrap}`}>
									<Link href="">
										<p className={styles.dropdown_links}>About 1</p>
									</Link>
									<Link href="">
										<p className={styles.dropdown_links}>About 2</p>
									</Link>
									<Link href="">
										<p className={styles.dropdown_links}>About 3</p>
									</Link>
								</div>
							</div>
							<div
								className={`${styles.links} ${styles.has_dropdown} ${
									openDropdown === "blogs" ? styles.dropdown_opened : ""
								} dropdown`}
								onClick={() => toggleDropdown("blogs")}
							>
								<div className={styles.link_title}>
									<p>Blogs</p>
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
									<div className={styles.link_title}>Career</div>
								</Link>
							</div>
							<div className={styles.links}>
								<Link href="">
									<div className={styles.link_title}>Contact</div>
								</Link>
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
						<p>Global Presence </p>
					</div>
				</div>
			</div>
		</header>
	);
}
