import React, { useEffect, useRef } from "react";
import anime from "animejs/lib/anime.es.js";

const WaveText = ({ text, className = "", delay = 0 }) => {
  const el = useRef(null);

  useEffect(() => {
    const letters = el.current.querySelectorAll(".letter");

    anime.timeline().add({
      targets: letters,
      translateY: [100, 0],
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 2000,
      delay: (el, i) => delay + 60 * i,
    });
  }, [delay]);

  return (
    <h1 className={`title ${className}`} ref={el}>
      {text.split("").map((char, i) => (
        <span className="letter" key={i}>
          {char}
        </span>
      ))}
    </h1>
  );
};

export default WaveText;
