"use client";

import { getLenis } from "@/utils/SmoothScrolling";

/** Height of the sticky site header, measured rather than hard-coded.
 *
 *  The header is `position: sticky; top: 0`, so it pins itself over whatever
 *  you scroll to and an unadjusted scroll leaves the top of the target hidden
 *  behind it. Its height changes with the breakpoint and with the language bar
 *  being open, so it is read off the element. `.main_headerBox` is the plain
 *  class Header.js sets alongside its CSS-module one, and is the same selector
 *  InnerGlobalContext measures for the --header_height variable. */
export function getHeaderOffset() {
	if (typeof document === "undefined") return 0;
	const header = document.querySelector(".main_headerBox");
	return header ? Math.round(header.getBoundingClientRect().height) : 0;
}

/** Scroll an element to just below the sticky header.
 *
 *  Goes through Lenis rather than the browser. The site runs Lenis globally
 *  (SmoothScrolling, started in InnerGlobalContext), and it sets the scroll
 *  position from its own rAF loop every frame — so `window.scrollTo` and
 *  `scrollIntoView` are both reverted before they are visible, which is why
 *  scrolling from JS looked like it simply did nothing. Lenis's own scrollTo
 *  takes an `offset`, which is precisely the sticky-header adjustment.
 *
 *  Falls back to the native call for the window before Lenis has started, and
 *  for any page that does not run it.
 *
 *  @param {HTMLElement|null} el
 *  @param {number} [gap] extra breathing room below the header */
export function scrollToSection(el, gap = 0) {
	if (!el || typeof window === "undefined") return;

	const offset = -(getHeaderOffset() + gap);
	const lenis = getLenis();

	if (lenis) {
		// force: true because Lenis drops scrollTo silently while it is stopped
		// or locked — `if (!this.isStopped && !this.isLocked || force)`. Nothing
		// stops it today, but a modal that did would break this again in a way
		// that throws no error and logs nothing.
		lenis.scrollTo(el, { offset, force: true });
		return;
	}

	const top = el.getBoundingClientRect().top + window.scrollY + offset;
	window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
}
