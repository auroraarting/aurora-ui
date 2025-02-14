// MODULES //
import { useEffect, useRef, useState } from "react";

// COMPONENTS //

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/components/CustomSelect.module.scss";

// IMAGES //
import DrownDownArrow from "/public/img/softwares/arrow.svg";

// DATA //

/** CustomSelect Component */
export default function CustomSelect({ defaultId, list, afterSelect }) {
	const [open, setOpen] = useState(false);
	const [selectedId, setSelectedId] = useState(defaultId || 0);
	const selectRef = useRef(null);

	/** handleStateOfSelect */
	const handleStateOfSelect = () => {
		setOpen((prev) => !prev);
	};

	/** onSelect */
	const onSelect = (id) => {
		handleStateOfSelect();
		setSelectedId(id);
		afterSelect({ index: id, value: list[id] });
	};

	useEffect(() => {
		/** Close dropdown if clicked outside */
		const handleClickOutside = (event) => {
			if (selectRef.current && !selectRef.current.contains(event.target)) {
				setOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div
			className={`${styles.CustomSelect} ${open && styles.open}`}
			ref={selectRef}
		>
			<div className={`${styles.selected}`} onClick={handleStateOfSelect}>
				<span className={`${styles.selectedText} text_reg text_500`}>
					{list[selectedId]}
				</span>
				<img
					className={`${styles.arrow}`}
					src={DrownDownArrow.src}
					alt="DrownDownArrow"
				/>
			</div>
			<div className={`${styles.list}`}>
				<div className={`${styles.listInner}`}>
					{list?.map((item, ind) => {
						return (
							<p
								className={`${styles.listItem} ${
									selectedId === ind && styles.alreadySelected
								}`}
								key={item}
								onClick={() => onSelect(ind)}
							>
								{item}
							</p>
						);
					})}
				</div>
			</div>
		</div>
	);
}
