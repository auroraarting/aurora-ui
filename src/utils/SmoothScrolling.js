import Lenis from "@studio-freight/lenis";

/** The running Lenis instance.
 *
 *  Kept at module scope so the rest of the app can reach it. Anything that
 *  wants to move the page *must* go through it: Lenis drives the scroll
 *  position from its own requestAnimationFrame loop, so a native
 *  window.scrollTo or element.scrollIntoView is overwritten on the very next
 *  frame and appears to do nothing. */
let lenis = null;

/** @returns {Lenis|null} the live instance, or null before it has started */
export function getLenis() {
	return lenis;
}

/** Function for smooth scrolling of the website */
export default function SmoothScrolling() {
	// Guard against a second instance: the raf loop below never stops, so
	// mounting twice would leave two of them fighting over the scroll position.
	if (lenis) return lenis;

	lenis = new Lenis();

	/** Function For Smooth Scroll */
	function raf(time) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}
	requestAnimationFrame(raf);

	return lenis;
}
