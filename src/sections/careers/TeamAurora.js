// MODULES //
import Link from "next/link";
import { useRef, useState } from "react";

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
	defaultData = [
		{
			content:
				"I get to work on cutting-edge software products, explore new markets and regions all while contributing to the energy transition for a better world. What else could I ask for?",
			designation: "Marketing, Sydney",
			name: "Ethan Yun",
			image: {
				node: {
					mediaItemUrl: "/img/careers/profile_pic.png",
				},
			},
		},
		{
			content:
				"I get to work on cutting-edge software products, explore new markets and regions all while contributing to the energy transition for a better world. What else could I ask for?",
			designation: "Marketing, Sydney",
			name: "Ethan Yun",
			image: {
				node: {
					mediaItemUrl: "/img/careers/profile_pic.png",
				},
			},
		},
		{
			content:
				"I get to work on cutting-edge software products, explore new markets and regions all while contributing to the energy transition for a better world. What else could I ask for?",
			designation: "Marketing, Sydney",
			name: "Ethan Yun",
			image: {
				node: {
					mediaItemUrl: "/img/careers/profile_pic.png",
				},
			},
		},
		{
			content:
				"I get to work on cutting-edge software products, explore new markets and regions all while contributing to the energy transition for a better world. What else could I ask for?",
			designation: "Marketing, Sydney",
			name: "Ethan Yun",
			image: {
				node: {
					mediaItemUrl: "/img/careers/profile_pic.png",
				},
			},
		},
		{
			content:
				"I get to work on cutting-edge software products, explore new markets and regions all while contributing to the energy transition for a better world. What else could I ask for?",
			designation: "Marketing, Sydney",
			name: "Ethan Yun",
			image: {
				node: {
					mediaItemUrl: "/img/careers/profile_pic.png",
				},
			},
		},
		{
			content:
				"I get to work on cutting-edge software products, explore new markets and regions all while contributing to the energy transition for a better world. What else could I ask for?",
			designation: "Marketing, Sydney",
			name: "Ethan Yun",
			image: {
				node: {
					mediaItemUrl: "/img/careers/profile_pic.png",
				},
			},
		},
		{
			content:
				"I get to work on cutting-edge software products, explore new markets and regions all while contributing to the energy transition for a better world. What else could I ask for?",
			designation: "Marketing, Sydney",
			name: "Ethan Yun",
			image: {
				node: {
					mediaItemUrl: "/img/careers/profile_pic.png",
				},
			},
		},
		{
			content:
				"I get to work on cutting-edge software products, explore new markets and regions all while contributing to the energy transition for a better world. What else could I ask for?",
			designation: "Marketing, Sydney",
			name: "Ethan Yun",
			image: {
				node: {
					mediaItemUrl: "/img/careers/profile_pic.png",
				},
			},
		},
	],
}) {
	const [hoverIndex, setHoverIndex] = useState(null);
	const hoverTimeout = useRef(null); // to track timeout

	/** handleMouseEnter  */
	const handleMouseEnter = (index) => {
		clearTimeout(hoverTimeout.current);
		setHoverIndex(index);
	};

	/** handleMouseLeave  */
	const handleMouseLeave = () => {
		// Delay removing z-index to allow animation to finish
		hoverTimeout.current = setTimeout(() => {
			setHoverIndex(null);
		}, 400); // match your SCSS transition duration
	};

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
					{defaultData?.map((item, ind) => {
						return (
							<div
								className={`${styles.teamItem} ${styles.teamItemOne}`}
								key={item?.name}
								onMouseEnter={() => handleMouseEnter(ind)}
								onMouseLeave={handleMouseLeave}
								style={{
									zIndex: hoverIndex === ind ? 3 : 0,
								}}
							>
								<div className={`${styles.teamHoverShow}`}>
									<img src={quate.src} alt="quate" />
									<p className="text_sm font_primary f_w_i f_w_l color_white pt_10">
										{item?.content}
									</p>
								</div>
								<div className={`${styles.teamFlex} f_r_a_center`}>
									{item?.image?.node?.mediaItemUrl && (
										<div className={`${styles.teamLogo}`}>
											<img src={item?.image?.node?.mediaItemUrl} alt={item?.name} />
										</div>
									)}
									<div className={`${styles.teamDescription}`}>
										<h4 className="text_reg font_primary color_secondary f_w_m">
											{item?.name}
										</h4>
										<p className="text_xs color_dark_gray f_w_l">{item?.designation}</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
