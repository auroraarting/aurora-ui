// MODULES //
import Link from "next/link";

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/careers/TeamAurora.module.scss";

// IMAGES //
import profile_pic from "../../../public/img/careers/profile_pic.png";
import quate from "../../../public/img/careers/quate.svg";

// DATA //

/** TeamAurora Section */
export default function TeamAurora({
	sectionName = "Graduate Experiences",
	id = "Graduate-Experiences",
}) {
	return (
		<section
			className={`${styles.TeamAurora} pb_50`}
			id={id}
			data-name={sectionName}
		>
			<div className="containerLarge">
				<div className={`${styles.title_wrap}`}>
					<h2 className="text_xl font_primary f_w_s_b color_secondary pb_20">
						What’s it like to be a part of Team Aurora?
					</h2>
					<div className={`${styles.bookBtn}`}>
						<Link href="/careers/our-team">
							<Button color="primary" variant="filled" shape="rounded">
								Our Teams
							</Button>
						</Link>
					</div>
				</div>
				<div className={`${styles.TeamBoxRow} ${styles.TeamBoxRowOne}`}>
					<div className={`${styles.teamItem} ${styles.teamItemOne}`}>
						<div className={`${styles.teamHoverShow}`}>
							<img src={quate.src} alt="quate" />
							<p className="text_sm font_primary f_w_i color_white pt_10">
								In my first few months, I&apos;ve already been given ownership over my
								work while being supported and led by a knowledgeable and dynamic team.
							</p>
						</div>
						<div className={`${styles.teamFlex} f_r_a_center`}>
							<div className={`${styles.teamLogo}`}>
								<img src={profile_pic.src} alt="logo" />
							</div>
							<div className={`${styles.teamDescription}`}>
								<h4 className="text_reg font_primary color_secondary f_w_m">
									John Barry
								</h4>
								<p className="text_xs color_dark_gray f_w_l">Modelling, Oxford</p>
							</div>
						</div>
					</div>
					<div className={`${styles.teamItem} ${styles.teamItemTwo}`}>
						<div className={`${styles.teamHoverShow}`}>
							<img src={quate.src} alt="quate" />
							<p className="text_sm font_primary f_w_i color_white pt_10">
								My work is making a difference both within the company and for our
								clients. I couldn&apos;t imagine a better place to develop myself and
								feel a part of the common goal of green energy.
							</p>
						</div>
						<div className={`${styles.teamFlex} f_r_a_center`}>
							<div className={`${styles.teamLogo}`}>
								<img src={profile_pic.src} alt="logo" />
							</div>
							<div className={`${styles.teamDescription}`}>
								<h4 className="text_reg font_primary color_secondary f_w_m">
									Jonathan Coe
								</h4>
								<p className="text_xs color_dark_gray f_w_l">Modelling, Oxford</p>
							</div>
						</div>
					</div>
					<div className={`${styles.teamItem} ${styles.teamItemThree}`}>
						<div className={`${styles.teamHoverShow}`}>
							<img src={quate.src} alt="quate" />
							<p className="text_sm font_primary f_w_i color_white pt_10">
								My work is making a difference both within the company and for our
								clients. I couldn&apos;t imagine a better place to develop myself and
								feel a part of the common goal of green energy.
							</p>
						</div>
						<div className={`${styles.teamFlex} f_r_a_center`}>
							<div className={`${styles.teamLogo}`}>
								<img src={profile_pic.src} alt="logo" />
							</div>
							<div className={`${styles.teamDescription}`}>
								<h4 className="text_reg font_primary color_secondary f_w_m">
									Richard Bradford
								</h4>
								<p className="text_xs color_dark_gray f_w_l">Modelling, Oxford</p>
							</div>
						</div>
					</div>
					<div className={`${styles.teamItem} ${styles.teamItemFour}`}>
						<div className={`${styles.teamHoverShow}`}>
							<img src={quate.src} alt="quate" />
							<p className="text_sm font_primary f_w_i color_white pt_10">
								My work is making a difference both within the company and for our
								clients. I couldn&apos;t imagine a better place to develop myself and
								feel a part of the common goal of green energy.
							</p>
						</div>
						<div className={`${styles.teamFlex} f_r_a_center`}>
							<div className={`${styles.teamLogo}`}>
								<img src={profile_pic.src} alt="logo" />
							</div>
							<div className={`${styles.teamDescription}`}>
								<h4 className="text_reg font_primary color_secondary f_w_m">
									Oliver Ray
								</h4>
								<p className="text_xs color_dark_gray f_w_l">Modelling, Oxford</p>
							</div>
						</div>
					</div>
					<div className={`${styles.teamItem} ${styles.teamItemFive}`}>
						<div className={`${styles.teamHoverShow}`}>
							<img src={quate.src} alt="quate" />
							<p className="text_sm font_primary f_w_i color_white pt_10">
								My work is making a difference both within the company and for our
								clients. I couldn&apos;t imagine a better place to develop myself and
								feel a part of the common goal of green energy.
							</p>
						</div>
						<div className={`${styles.teamFlex} f_r_a_center`}>
							<div className={`${styles.teamLogo}`}>
								<img src={profile_pic.src} alt="logo" />
							</div>
							<div className={`${styles.teamDescription}`}>
								<h4 className="text_reg font_primary color_secondary f_w_m">
									Steve Hadley
								</h4>
								<p className="text_xs color_dark_gray f_w_l">Modelling, Oxford</p>
							</div>
						</div>
					</div>
					<div className={`${styles.teamItem} ${styles.teamItemSix}`}>
						<div className={`${styles.teamHoverShow}`}>
							<img src={quate.src} alt="quate" />
							<p className="text_sm font_primary f_w_i color_white pt_10">
								My work is making a difference both within the company and for our
								clients. I couldn&apos;t imagine a better place to develop myself and
								feel a part of the common goal of green energy.
							</p>
						</div>
						<div className={`${styles.teamFlex} f_r_a_center`}>
							<div className={`${styles.teamLogo}`}>
								<img src={profile_pic.src} alt="logo" />
							</div>
							<div className={`${styles.teamDescription}`}>
								<h4 className="text_reg font_primary color_secondary f_w_m">
									Lesley Kim
								</h4>
								<p className="text_xs color_dark_gray f_w_l">Modelling, Oxford</p>
							</div>
						</div>
					</div>
					<div className={`${styles.teamItem} ${styles.teamItemSeven}`}>
						<div className={`${styles.teamHoverShow}`}>
							<img src={quate.src} alt="quate" />
							<p className="text_sm font_primary f_w_i color_white pt_10">
								My work is making a difference both within the company and for our
								clients. I couldn&apos;t imagine a better place to develop myself and
								feel a part of the common goal of green energy.
							</p>
						</div>
						<div className={`${styles.teamFlex} f_r_a_center`}>
							<div className={`${styles.teamLogo}`}>
								<img src={profile_pic.src} alt="logo" />
							</div>
							<div className={`${styles.teamDescription}`}>
								<h4 className="text_reg font_primary color_secondary f_w_m">
									John Barry
								</h4>
								<p className="text_xs color_dark_gray f_w_l">Modelling, Oxford</p>
							</div>
						</div>
					</div>
					<div className={`${styles.teamItem} ${styles.teamItemEight}`}>
						<div className={`${styles.teamHoverShow}`}>
							<img src={quate.src} alt="quate" />
							<p className="text_sm font_primary f_w_i color_white pt_10">
								My work is making a difference both within the company and for our
								clients. I couldn&apos;t imagine a better place to develop myself and
								feel a part of the common goal of green energy.
							</p>
						</div>
						<div className={`${styles.teamFlex} f_r_a_center`}>
							<div className={`${styles.teamLogo}`}>
								<img src={profile_pic.src} alt="logo" />
							</div>
							<div className={`${styles.teamDescription}`}>
								<h4 className="text_reg font_primary color_secondary f_w_m">
									Jonathan Coe
								</h4>
								<p className="text_xs color_dark_gray f_w_l">Modelling, Oxford</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
