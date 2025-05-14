"use client";
// MODULES //
import { useEffect, useState } from "react";

// COMPONENTS //

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/events/CountdownTimer.module.scss";

// IMAGES //

// DATA //

/** CountdownTimer  */
const CountdownTimer = ({ targetDate }) => {
	const [timeLeft, setTimeLeft] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});

	useEffect(() => {
		const target = new Date(targetDate).getTime(); // UTC to local automatically

		const interval = setInterval(() => {
			const now = new Date().getTime(); // local time
			const distance = target - now;

			if (distance <= 0) {
				clearInterval(interval);
				setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
			} else {
				setTimeLeft({
					days: Math.floor(distance / (1000 * 60 * 60 * 24)),
					hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
					minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
					seconds: Math.floor((distance % (1000 * 60)) / 1000),
				});
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [targetDate]);

	// Don't render anything if timeLeft hasn't been calculated yet or all values are 0
	if (
		!timeLeft ||
		(timeLeft.days === 0 &&
			timeLeft.hours === 0 &&
			timeLeft.minutes === 0 &&
			timeLeft.seconds === 0)
	) {
		return <></>;
	}

	return (
		<div className={`${styles.CountdownTimer} text_uppercase`}>
			<div className="container">
				<div className={`${styles.wrap}`}>
					<p className="color_white text_md">Event Countdown</p>
					<div className={`${styles.numbers}`}>
						<p className="color_white text_xxs">
							{timeLeft.days} <br /> Days
						</p>
						<p className="color_white text_xxs">
							{timeLeft.hours}
							<br />
							HOURS
						</p>
						<p className="color_white text_xxs">
							{timeLeft.minutes}
							<br /> MINUTES{" "}
						</p>
						<p className="color_white text_xxs">
							{timeLeft.seconds}
							<br /> Seconds{" "}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CountdownTimer;
