import React, { useEffect, useRef } from "react";
import styles from '../WaveText/WaveText.module.css'  


const WaveText = ({ text, className = "", delay = 0 }) => {
  const el = useRef(null);

  useEffect(() => {
    const letters = el.current.querySelectorAll(`.${styles.letter}`);
    letters.forEach((letter, i) => {
      letter.style.setProperty("--delay", `${(delay + i * 60) / 1000}s`);
      letter.classList.add(styles.animate);
    });
  }, [delay]);

  return (
    <h1 className={`title ${className}`} ref={el}>
      {text.split("").map((char, i) => (
        <span className={styles.letter} key={i}>
          {char}
        </span>
      ))}
    </h1>
  );
};

export default WaveText;
