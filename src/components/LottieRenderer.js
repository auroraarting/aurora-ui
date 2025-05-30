import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";

/** LottieFromURL  */
const LottieFromURL = ({ src }) => {
	const url = src;
	const [animationData, setAnimationData] = useState(null);

	useEffect(() => {
		/** fetchAnimation  */
		const fetchAnimation = async () => {
			try {
				const res = await fetch(url);
				const data = await res.json();
				setAnimationData(data);
			} catch (err) {
				console.error("Failed to load Lottie JSON:", err);
			}
		};

		fetchAnimation();
	}, [url]);

	if (!animationData) return <p>Loading...</p>;

	return <Lottie animationData={animationData} loop autoplay />;
};

export default LottieFromURL;
