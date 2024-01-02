import PropTypes from "prop-types";
import { useCallback, useEffect, useMemo, useRef } from "react";
import styles from "./Counter.module.css";

Counter.propTypes = {
	startNumber: PropTypes.number.isRequired,
	setNumber: PropTypes.func.isRequired,
};

function Counter({
	startNumber,
	setNumber,
}: {
	startNumber: number;
	setNumber: any;
}) {
	const flipCardRef1 = useRef<HTMLDivElement>(null);
	const flipCardRef2 = useRef<HTMLDivElement>(null);
	const topRef = useRef<HTMLDivElement>(null);
	const bottomRef = useRef<HTMLDivElement>(null);

	const updateFlipCard = useCallback(
		(flipCardRef: any, currentValue: number, nextValue: number) => {
			const flipCard = flipCardRef.current;
			const topHalf = topRef.current;
			const bottomHalf = bottomRef.current;
			const topFlip = document.createElement("div");
			const bottomFlip = document.createElement("div");
			console.log(topHalf, bottomHalf, styles.top, styles.bottom);

			if (topHalf && bottomHalf && topFlip && bottomFlip) {
				topFlip.classList.add(styles.topFlip);
				bottomFlip.classList.add(styles.bottomFlip);
				// print top and bottom halves
				console.log("top", topHalf);
				console.log("bottom", bottomHalf);

				bottomHalf.textContent = String(currentValue);
				topFlip.textContent = String(currentValue);
				bottomFlip.textContent = String(nextValue);
				topFlip.addEventListener("animationstart", () => {
					topHalf.textContent = String(nextValue);
				});

				topFlip.addEventListener("animationend", () => {
					topFlip.remove();
				});

				bottomFlip.addEventListener("animationend", () => {
					bottomHalf.textContent = String(nextValue);
					bottomFlip.remove();
				});

				flipCard.append(topFlip, bottomFlip);
			}
		},
		[]
	);

	const number = useMemo(() => startNumber % 10, [startNumber]);

	useEffect(() => {
		if (flipCardRef2.current) {
			updateFlipCard(flipCardRef1, number, (number + 1) % 10);

			if (Math.floor(startNumber / 9) === 0 || startNumber <= 0) {
				flipCardRef2.current.style.display = "none";
			} else {
				flipCardRef2.current.style.display = "inline-flex";
				updateFlipCard(
					flipCardRef2,
					Math.floor(startNumber / 10),
					Math.floor((startNumber + 1) / 10)
				);
			}
		}
	}, [startNumber, updateFlipCard, number]);

	const handleClick = () => {
		setNumber((prevNumber: number) => (prevNumber + 1) % 100);
	};

	return (
		<div className={styles.main}>
			<div className={styles.flipCard} ref={flipCardRef2}>
				<div className={styles.top} ref={topRef}></div>
				<div className={styles.bottom} ref={bottomRef}></div>
			</div>
			<div className={styles.flipCard} ref={flipCardRef1}>
				<div className={styles.top} ref={topRef}></div>
				<div className={styles.bottom} ref={bottomRef}></div>
			</div>

			<button onClick={handleClick}>increase</button>
		</div>
	);
}

export default Counter;
