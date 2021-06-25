import React, { useRef, useState, useEffect } from "react";
import createOffscreen from "./rendering/rendering";

function Canvas({ width, height, render = () => null }) {
  const canvasEl = useRef(null);
  const [offscreen, setOffscreen] = useState(null);

  useEffect(
    function () {
      const { current } = canvasEl;
      if (current && width * height) {
        setOffscreen(createOffscreen(current, width, height));
      }
    },
    [canvasEl, width, height]
  );

  useEffect(
    function () {
      let timer;
      if (offscreen && width * height) {
        timer = window.setInterval(function () {
          offscreen.clear();
          render(offscreen);
          offscreen.render();
        }, 100);
      }

      return function () {
        if (timer) {
          window.clearInterval(timer);
        }
      };
    },
    [offscreen, width, height, render]
  );

  return (
    <canvas
      style={{ width: `${width}px`, height: `${height}px` }}
      ref={canvasEl}
    />
  );
}
export default Canvas;
