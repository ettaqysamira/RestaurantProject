import React, { useEffect } from "react";

const CursorEffect = () => {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const smoke = document.createElement("div")
      smoke.className = "smoke"
      smoke.style.left = `${e.pageX - 10}px`
      smoke.style.top = `${e.pageY - 10}px`
      document.body.appendChild(smoke);

      setTimeout(() => {
        smoke.remove()
      }, 1200)
    }

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    }
  }, [])

  return null
}

export default CursorEffect;
