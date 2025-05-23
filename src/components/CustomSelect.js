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
export default function CustomSelect({
	defaultId,
	list,
	afterSelect,
	placeholder = "Select",
	mode = "light",
	eventId,
}) {
	const [open, setOpen] = useState(false);
	const [selectedId, setSelectedId] = useState();
	const selectRef = useRef(null);
	const listScrollPrevent = open ? { "data-lenis-prevent": true } : {};

	/** handleStateOfSelect */
	const handleStateOfSelect = () => {
		setOpen((prev) => !prev);
	};

	/** onSelect */
	const onSelect = (id) => {
		handleStateOfSelect();
		setSelectedId(id);
		afterSelect && afterSelect({ index: id, value: list[id] });
	};

	/** reset  */
	const reset = () => {
		setSelectedId();
	};

	useEffect(() => {
		/** Close dropdown if clicked outside */
		const handleClickOutside = (event) => {
			if (selectRef.current && !selectRef.current.contains(event.target)) {
				setOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		if (eventId) window.addEventListener(eventId, reset);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			if (eventId) window.removeEventListener(eventId, reset);
		};
	}, []);

	return (
		<div
			className={`${styles.CustomSelect} CustomSelect  ${open && styles.open} ${
				styles[mode]
			}`}
			ref={selectRef}
		>
			<div className={`${styles.selected}`} onClick={handleStateOfSelect}>
				<span className={`${styles.selectedText} text_xs text_500`}>
					{list?.[selectedId] || placeholder}
				</span>
				<img
					className={`${styles.arrow}`}
					src={DrownDownArrow.src}
					alt="DrownDownArrow"
				/>
			</div>
			<div className={`${styles.list}`} {...listScrollPrevent}>
				<div className={`${styles.listInner}`}>
					{list?.map((item, ind) => {
						return (
							<p
								className={`${styles.listItem} ${
									selectedId === ind && styles.alreadySelected
								} text_xs`}
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
