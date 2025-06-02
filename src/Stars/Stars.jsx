// src/Stars/Stars.jsx
import React, { useEffect, useRef } from "react";
import styles from '../Stars/Stars.module.css';

const Stars = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const stars = [];
    const starCount = 100;

    // Create stars with random sizes and positions
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      star.className = styles.star;
      star.style.width = `${Math.random() * 3 + 1}px`;
      star.style.height = star.style.width;
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 2}s`;
      container.appendChild(star);
      stars.push(star);
    }

    // Cleanup stars on unmount
    return () => {
      stars.forEach((star) => container.removeChild(star));
    };
  }, []);

  return <div ref={containerRef} className={styles.starsContainer} />;
};

export default Stars;
