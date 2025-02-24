// MODULES //
import { useEffect, useState } from "react";

// COMPONENTS //

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/components/Count.module.scss";

// IMAGES //

// DATA //

/** Count Component */
export default function Count({ value, duration = 500 }) {
	const [count, setCount] = useState(0);

	useEffect(() => {
		let start = 0;
		const increment = value / (duration / 16); // Approximate step based on 60fps

		const timer = setInterval(() => {
			start += increment;
			if (start >= value) {
				setCount(value);
				clearInterval(timer);
			} else {
				setCount(Math.floor(start));
			}
		}, 16);

		return () => clearInterval(timer);
	}, [value, duration]);

	return count;
}
