import React, { useEffect } from "react";
import Fumer from "../assets/fumerEffect.png";

const CursorEffect = () => {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const smoke = document.createElement("img");
      smoke.src = Fumer;
      smoke.className = "smoke";

      const size = 40 + Math.random() * 40;
      const duration = 2.5 + Math.random();

      smoke.style.position = "absolute";
      smoke.style.left = `${e.pageX - size / 2}px`;
      smoke.style.top = `${e.pageY - size / 2}px`;
      smoke.style.width = `${size}px`;
      smoke.style.height = `${size}px`;
      smoke.style.pointerEvents = "none";
      smoke.style.animation = `floatUp ${duration}s ease-out forwards`;
      smoke.style.opacity = `${0.3 + Math.random() * 0.2}`;
      smoke.style.zIndex = 9999;

      document.body.appendChild(smoke);

      setTimeout(() => {
        smoke.remove();
      }, duration * 1000);
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return null;
};

export default CursorEffect;
