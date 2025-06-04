"use client";
// MODULES //
import { useEffect, useState, useRef } from "react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";
import CustomSelect from "./CustomSelect";

// SECTIONS //

// PLUGINS //

// UTILS //
import EqualHeight from "@/utils/EqualHeight";
import { dispatchCustomEvent } from "@/utils/CustomEvent";

// STYLES //
import styles from "@/styles/components/Bundles.module.scss";

// IMAGES //
import Icon from "/public/img/table-icon.png";
import Checkmark from "/public/img/checkmark.svg";
import hoverBg from "/public/img/hoverBundles.png";
import { slugify } from "@/utils";

// DATA //

/** Bundles Section */
export default function Bundles({ data, name }) {
	const [list, setList] = useState(data?.tabs?.[0]);
	const [selectVal, setSelectVal] = useState();

	/**  handleTabChange */
	const handleTabChange = (tab) => {
		setList(tab);
	};

	/** sectionTitle  */
	const sectionTitle = () => {
		if (name === undefined) {
			return {
				id: "eos",
				"data-name": "Eos",
			};
		} else if (name === "") {
			return {};
		} else if (name) {
			return {
				id: slugify(name),
				"data-name": name,
			};
		}
	};

	return (
		<section className={`${styles.Bundles} Bundles `}>
			<div className={`${styles.bg} dark_bg`}>
				<img src={hoverBg.src} />
			</div>
			<div className="pb_60 pt_100">
				<div className="container">
					<h2 className="text_lg font_primary f_w_s_b color_white">
						Asset Lifecycle Management tools <br className="hidden_xs" /> that meet
						your needs
					</h2>
				</div>
				<div className="container">
					<div className={`${styles.table_wrap} pt_40`}>
						<div className={`${styles.tab_wrap}`}>
							<div className={`${styles.tabs}`}>
								{data?.tabs?.map((item, ind) => {
									return (
										<div
											className={`${styles.tab} ${
												list.tabName === item.tabName && styles.active
											}`}
											key={ind}
											onClick={() => {
												handleTabChange(item);
												dispatchCustomEvent("resetCustomSelect1");
											}}
										>
											<p
												className={`${styles.text} text_xs font_primary  ${
													list.tabName === item.tabName ? "" : "color_white"
												}`}
											>
												{item.tabName}
											</p>
										</div>
									);
								})}
							</div>
							<CustomSelect
								eventId="resetCustomSelect1"
								list={data?.bundleTabs.map((item) => item.tabName)}
								defaultId={0}
								placeholder="Sample Packages"
								mode="dark"
								selectVal={selectVal}
								setSelectVal={setSelectVal}
								afterSelect={(e) => {
									const filter = data?.bundleTabs.filter(
										(item) => item.tabName === e.value
									);
									handleTabChange(filter[0]);
								}}
							/>
						</div>
						<div className={`${styles.tableMain}`}>
							<table className={`${styles.table} color_white`}>
								<tbody>
									<tr className="text_xxs f_w_s_b">
										<td>&nbsp;</td>
										<td>
											Strategy <br />& Planning
											<div className={`${styles.arr}`}>
												<img src="/img/bundle-arr.svg" />
											</div>
										</td>
										<td>
											Project <br /> Siting
											<div className={`${styles.arr}`}>
												<img src="/img/bundle-arr.svg" />
											</div>
										</td>
										<td>
											Design & <br /> Optimisation
											<div className={`${styles.arr}`}>
												<img src="/img/bundle-arr.svg" />
											</div>
										</td>
										<td>
											Investment <br /> analysis
											<div className={`${styles.arr}`}>
												<img src="/img/bundle-arr.svg" />
											</div>
										</td>
										<td>
											Financing & <br /> M&A
											<div className={`${styles.arr}`}>
												<img src="/img/bundle-arr.svg" />
											</div>
										</td>
										<td>
											Portfolio <br /> Management <br /> & PPAs
											<div className={`${styles.arr}`}>
												<img src="/img/bundle-arr.svg" />
											</div>
										</td>
										<td>
											Ongoing <br /> Valuation
										</td>
									</tr>
									{list?.list?.map((item, ind) => {
										return (
											<tr
												key={ind}
												className={`${
													item.logoText === "Bespoke expert support" && styles.highlighted
												}`}
											>
												<td className={`${styles.logo}`}>
													<img className={styles.img} src={item?.logo?.node?.mediaItemUrl} />
													<div
														className={`${styles.text} text_xs color_black`}
														style={{ background: item?.bgColor }}
													>
														{item.logoText}
													</div>
												</td>
												<td>
													<div className={`${styles.checkmarks}`}>
														{Array(item?.strategyPlanning || 0)
															.fill()
															.map((_, index) => (
																<img key={index} src={Checkmark.src} />
															))}
													</div>
												</td>
												<td>
													<div className={`${styles.checkmarks}`}>
														{Array(item?.projectSiting || 0)
															.fill()
															.map((_, index) => (
																<img key={index} src={Checkmark.src} />
															))}
													</div>
												</td>
												<td>
													<div className={`${styles.checkmarks}`}>
														{Array(item?.designAndOptimisation || 0)
															.fill()
															.map((_, index) => (
																<img key={index} src={Checkmark.src} />
															))}
													</div>
												</td>
												<td>
													<div className={`${styles.checkmarks}`}>
														{Array(item?.investmentAnalysis || 0)
															.fill()
															.map((_, index) => (
																<img key={index} src={Checkmark.src} />
															))}
													</div>
												</td>
												<td>
													<div className={`${styles.checkmarks}`}>
														{Array(item?.financingMA || 0)
															.fill()
															.map((_, index) => (
																<img key={index} src={Checkmark.src} />
															))}
													</div>
												</td>
												<td>
													<div className={`${styles.checkmarks}`}>
														{Array(item?.portfolioManagementPpas || 0)
															.fill()
															.map((_, index) => (
																<img key={index} src={Checkmark.src} />
															))}
													</div>
												</td>
												<td>
													<div className={`${styles.checkmarks}`}>
														{Array(item?.ongoingValuation || 0)
															.fill()
															.map((_, index) => (
																<img key={index} src={Checkmark.src} />
															))}
													</div>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
