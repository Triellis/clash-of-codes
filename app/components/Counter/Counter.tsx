import { update } from "@/app/util/userSlice";
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
	const topRef1 = useRef<HTMLDivElement>(null);
	const bottomRef1 = useRef<HTMLDivElement>(null);
	const topRef2 = useRef<HTMLDivElement>(null);
	const bottomRef2 = useRef<HTMLDivElement>(null);

	const updateFlipCard = useCallback(
		(flipCardRef: any, currentValue: number, nextValue: number) => {
			const flipCard = flipCardRef.current;
			const topHalf1 = topRef1.current;
			const bottomHalf1 = bottomRef1.current;
			const topHalf2 = topRef2.current;
			const bottomHalf2 = bottomRef2.current;
			const topFlip = document.createElement("div");
			const bottomFlip = document.createElement("div");

			console.log("vals", currentValue, nextValue);

			if (
				topHalf2 &&
				bottomHalf2 &&
				topHalf1 &&
				bottomHalf1 &&
				topFlip &&
				bottomFlip
			) {
				topFlip.classList.add(styles.topFlip);
				bottomFlip.classList.add(styles.bottomFlip);

				bottomHalf1.textContent = String(currentValue);

				topFlip.textContent = String(currentValue);
				bottomFlip.textContent = String(nextValue);

				topFlip.addEventListener("animationstart", () => {
					console.log("next top", nextValue);
					topHalf1.textContent = String(nextValue);
					topHalf2.textContent = String(currentValue);
				});

				topFlip.addEventListener("animationend", () => {
					topFlip.remove();
				});

				bottomFlip.addEventListener("animationend", () => {
					console.log("next bottom", nextValue);
					bottomHalf1.textContent = String(nextValue);
					bottomHalf2.textContent = String(currentValue);
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
			{/* tens digit */}
			<div className={styles.flipCard} ref={flipCardRef2}>
				<div className={styles.top} ref={topRef2}></div>
				<div className={styles.bottom} ref={bottomRef2}></div>
			</div>
			{/* unit digit */}
			<div className={styles.flipCard} ref={flipCardRef1}>
				<div className={styles.top} ref={topRef1}></div>
				<div className={styles.bottom} ref={bottomRef1}></div>
			</div>

			<button onClick={handleClick}>increase</button>
		</div>
	);
}

export default Counter;
