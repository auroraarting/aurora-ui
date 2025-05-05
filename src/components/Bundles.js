// MODULES //
import { useEffect, useState, useRef } from "react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";
import CustomSelect from "./CustomSelect";

// SECTIONS //

// PLUGINS //

// UTILS //
import EqualHeight from "../utils/EqualHeight";
import { dispatchCustomEvent } from "@/utils/CustomEvent";

// STYLES //
import styles from "@/styles/components/Bundles.module.scss";

// IMAGES //
import Icon from "/public/img/table-icon.png";
import Checkmark from "/public/img/checkmark.png";

// DATA //

/** Bundles Section */
export default function Bundles({ data }) {
	const [list, setList] = useState(data?.tabs?.[0]);
	const [selectVal, setSelectVal] = useState();

	/**  handleTabChange */
	const handleTabChange = (tab) => {
		setList(tab);
	};

	return (
		<section className={`${styles.Bundles} Bundles`} id="eos" data-name="Eos">
			<div className="container">
				<h2 className="text_lg font_primary f_w_s_b color_white pb_20">
					Asset Lifecycle Management tools <br /> that meet your needs
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
											className={`${styles.text} text_xs font_primary f_w_b  ${
												list.tabName === item.tabName ? "" : "color_white"
											}`}
										>
											{item.tabName}
										</p>
									</div>
								);
							})}
							{/* <div className={`${styles.tab} ${styles.active}`}>
								<p className={`${styles.text} text_xs font_primary f_w_b`}>
									Subscription Analytics
								</p>
							</div>
							<div className={`${styles.tab}`}>
								<p className={`${styles.text} text_xs font_primary f_w_b color_white`}>
									Subscription Analytics
								</p>
							</div> */}
						</div>
						<div className="pb_10">
							<CustomSelect
								eventId="resetCustomSelect1"
								list={data?.bundleTabs.map((item) => item.tabName)}
								defaultId={0}
								placeholder="Sample Packagess"
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
					</div>
					<table className={`${styles.table} color_white`}>
						<tbody>
							<tr className="text_xxs">
								<td>&nbsp;</td>
								<td>
									Strategy <br />& Planning
								</td>
								<td>
									Project <br /> Siting
								</td>
								<td>
									Design and <br /> Optimisation
								</td>
								<td>
									Investment <br /> analysis
								</td>
								<td>
									Financing & <br /> M&A
								</td>
								<td>
									Portfolio <br /> Management <br /> & PPAs
								</td>
								<td>
									Ongoing <br /> Valuation
								</td>
							</tr>
							{list?.list?.map((item, ind) => {
								return (
									<tr key={ind}>
										<td className={`${styles.logo}`}>
											<img className={styles.img} src={item?.logo?.node?.sourceUrl} />
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
		</section>
	);
}
