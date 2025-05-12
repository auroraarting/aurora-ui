/* eslint-disable @next/next/no-img-element */
// MODULES //
import { useState, useEffect } from "react";

// COMPONENTS //

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/components/Pagination.module.scss";

// IMAGES //
import IconArrLeft from "/public/img/icons/pagination-left.png";
import IconArrRight from "/public/img/icons/pagination-right.png";

// DATA //

/** Pagination Component */
export default function Pagination({
	data = [],
	paginationArr = [],
	itemsPerPage = 6,
	setCurrentItems,
	isDark,
}) {
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

	useEffect(() => {
		// Calculate the total number of pages
		const totalPages = Math.ceil(paginationArr.length / itemsPerPage);
		setTotalPages(totalPages);
		setCurrentPage(1);
	}, [paginationArr.length, itemsPerPage]);

	useEffect(() => {
		setCurrentItems(paginationArr.slice(0, itemsPerPage));
	}, [paginationArr.length]);

	/** handlePageClick  */
	const handlePageClick = (page) => {
		setCurrentPage(page);
		setCurrentItems(
			paginationArr.slice((page - 1) * itemsPerPage, page * itemsPerPage)
		);
	};

	/** Helper function to generate page numbers with ellipses  */
	const generatePageNumbers = () => {
		const pageNumbers = [];
		const maxPageNumbers = 5; // Limit the number of page numbers displayed

		/** Show pages around the current page, with ellipses  */
		const startPage = Math.max(currentPage - 2, 1);
		const endPage = Math.min(currentPage + 2, totalPages);

		/** Add "..." if there are pages before the range  */
		if (startPage > 1) {
			pageNumbers.push(1);
			if (startPage > 2) pageNumbers.push("...");
		}

		/** Add pages within the range  */
		for (let i = startPage; i <= endPage; i++) {
			pageNumbers.push(i);
		}

		/**  Add "..." if there are pages after the range */
		if (endPage < totalPages) {
			if (endPage < totalPages - 1) pageNumbers.push("...");
			pageNumbers.push(totalPages);
		}

		return pageNumbers;
	};

	if (totalPages <= 1) return null;

	return (
		<div className={`${styles.pagination} ${isDark ? styles.dark : ""}`}>
			{/* Previous button */}
			<img
				src={IconArrLeft.src}
				alt="IconArrLeft"
				onClick={() => {
					if (currentPage > 1) {
						handlePageClick(currentPage - 1);
					}
				}}
			/>

			{/* Render page numbers with ellipses */}
			{generatePageNumbers().map((page, index) => (
				<button
					key={index}
					className={`${styles.page_number} ${
						currentPage === page ? styles.active : ""
					}`}
					onClick={() => {
						if (page !== "...") {
							handlePageClick(page);
						}
					}}
				>
					{page}
				</button>
			))}

			{/* Next button */}
			<img
				src={IconArrRight.src}
				alt="IconArrRight"
				onClick={() => {
					if (currentPage < totalPages) {
						handlePageClick(currentPage + 1);
					}
				}}
			/>
		</div>
	);
}
