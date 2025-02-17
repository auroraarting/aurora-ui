// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/components/TrustedLeaders.module.scss";

// IMAGES //
import erste from "../../public/img/softwares/erste.png";

// DATA //

/** TrustedLeaders Section */
export default function TrustedLeaders() {
	const LogoData = [
		{
			logos: erste.src,
		},
		{
			logos: erste.src,
		},
		{
			logos: erste.src,
		},
		{
			logos: erste.src,
		},
		{
			logos: erste.src,
		},
		{
			logos: erste.src,
		},
		{
			logos: erste.src,
		},
		{
			logos: erste.src,
		},
		{
			logos: erste.src,
		},
		{
			logos: erste.src,
		},
		{
			logos: erste.src,
		},
		{
			logos: erste.src,
		},
		{
			logos: erste.src,
		},
	];
	return (
		<section className={`${styles.TrustedLeaders} pb_100`}>
			<div className="container">
				<div className="pb_40">
					<h2 className="text_xl font_primary f_w_s_b color_secondary">
						Trusted by industry leaders
					</h2>
				</div>
				<div className={`${styles.box_wrap}`}>
					{LogoData.map((item, ind) => (
						<div className={`${styles.box_item}`} key={ind}>
							<div className={`${styles.imgBox}`}>
								<img src={item.logos} className="b_r_10" alt="story img" />
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
