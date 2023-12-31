import { useEffect, useRef, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

Counter.propTypes = {
  startNumber: PropTypes.number.isRequired,
  setNumber: PropTypes.func.isRequired,
};

function Counter(props) {
  const { startNumber, setNumber } = props;

  const flipCardRef1 = useRef(null);
  const flipCardRef2 = useRef(null);

  const updateFlipCard = useCallback((flipCardRef, currentValue, nextValue) => {
    const flipCard = flipCardRef.current;
    const topHalf = flipCard.querySelector(".top");
    const bottomHalf = flipCard.querySelector(".bottom");
    const topFlip = document.createElement("div");
    const bottomFlip = document.createElement("div");

    topFlip.classList.add("top-flip");
    bottomFlip.classList.add("bottom-flip");

    bottomHalf.textContent = currentValue;
    topFlip.textContent = currentValue;
    bottomFlip.textContent = nextValue;

    topFlip.addEventListener("animationstart", () => {
      topHalf.textContent = nextValue;
    });

    topFlip.addEventListener("animationend", () => {
      topFlip.remove();
    });

    bottomFlip.addEventListener("animationend", () => {
      bottomHalf.textContent = nextValue;
      bottomFlip.remove();
    });

    flipCard.append(topFlip, bottomFlip);
  }, []);

  const number = useMemo(() => startNumber % 10, [startNumber]);

  useEffect(() => {
    updateFlipCard(flipCardRef1, number, (number + 1) % 10);

    if (Math.floor(startNumber / 9) === 0 || startNumber <= 0) {
      flipCardRef2.current.style.display = 'none';
    } else {
      flipCardRef2.current.style.display = 'inline-flex';
      updateFlipCard(flipCardRef2, Math.floor(startNumber / 10), Math.floor((startNumber + 1) / 10));
    }
  }, [startNumber, updateFlipCard, number]);

  const handleClick = () => {
    setNumber((prevNumber) => (prevNumber + 1) % 100);
  };

  return (
    <>
      <div className="flip-card" ref={flipCardRef2}>
        <div className="top"></div>
        <div className="bottom"></div>
      </div>
      <div className="flip-card" ref={flipCardRef1}>
        <div className="top"></div>
        <div className="bottom"></div>
      </div>
      <button onClick={handleClick}>increase</button>
    </>
  );
}

export default Counter;
