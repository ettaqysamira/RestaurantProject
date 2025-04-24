import React, { useEffect } from "react";

const CursorEffect = () => {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const smoke = document.createElement("div");
      smoke.className = "smoke";

      const size = 10 + Math.random() * 20;
      const duration = 2.5 + Math.random(); // durée plus longue et réaliste

      smoke.style.left = `${e.pageX - size / 2}px`;
      smoke.style.top = `${e.pageY - size / 2}px`;
      smoke.style.width = `${size}px`;
      smoke.style.height = `${size}px`;
      smoke.style.animationDuration = `${duration}s`;
      smoke.style.transform = `rotate(${Math.random() * 360}deg)`;

      document.body.appendChild(smoke);

      setTimeout(() => {
        smoke.remove();
      }, duration * 1000);
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return null;
};

export default CursorEffect;
