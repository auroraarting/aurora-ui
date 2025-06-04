/* eslint-disable quotes */
"use client";
// MODULES //
import { useEffect, useState } from "react";

// COMPONENTS //
import { usePathname } from "next/navigation";
import Link from "next/link";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/components/Breadcrumbs.module.scss";

// IMAGES //

// DATA //

// SERVICES //

/** Breadcrumbs  */
export default function Breadcrumbs({ customPage, className = "" }) {
	const pathname = usePathname();
	const segments = pathname.split("/").filter(Boolean);

	if (segments.length === 0) {
		return <div>{`> Articles`}</div>;
	}

	const crumbs = segments.map((segment, index) => {
		const href = "/" + segments.slice(0, index + 1).join("/");
		const label = segment
			.replace(/-/g, " ")
			.replace(/\b\w/g, (c) => c.toUpperCase());
		return { label, href };
	});

	let finalCrumbs = crumbs;

	if (customPage && crumbs.length > 1) {
		finalCrumbs = [
			...crumbs.slice(0, -1),
			{ label: customPage.title, href: customPage.href },
			crumbs[crumbs.length - 1],
		];
	}

	// Add a condition to apply an extra class
	const isSpecialPage = ["webinar", "/articles"].some((item) =>
		item.includes(pathname)
	);
	if (isSpecialPage) {
		return <></>;
	}

	return (
		<div className={`Breadcrumbs ${styles.Breadcrumbs} ${className}`}>
			<div className="">
				<nav
					aria-label="Breadcrumb"
					className="text_xxs text-gray-600 text_uppercase  pt_20 f_w"
				>
					{finalCrumbs.map((crumb, i) => (
						<span key={crumb.href} className="f_w">
							{i > 0 && <img src="/img/icons/leftBreadcrumbs.svg" />}
							<a href={crumb.href} className="hover:underline">
								{crumb.label}
							</a>
						</span>
					))}
				</nav>
			</div>
		</div>
	);
}
