import { useEffect, useState, useRef } from "react";

/** useIntersectionObserver */
export function useIntersectionObserver(options = {}) {
	const [isIntersecting, setIsIntersecting] = useState(false);
	const ref = useRef(null);

	useEffect(() => {
		if (!ref.current) return;

		const observer = new IntersectionObserver(([entry]) => {
			setIsIntersecting(entry.isIntersecting);
		}, options);

		observer.observe(ref.current);

		return () => observer.disconnect();
	}, [options]);

	return { ref, isIntersecting };
}
