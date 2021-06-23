import React, { useState, useCallback, useEffect } from "react";
import ReactDom from "react-dom";
import { Console, Canvas } from "./components";
import { createInterpreter, activate, createLevel } from "./game";
import levelRenderer from "./components/level-view-renderer";

const MAZE_SIZE = 101;
const TILE_SIZE = 32;
const FOV = 5;
const VIEW_SIZE = (FOV * 2 + 1) * TILE_SIZE;
const SCALE = 0.5;

const level = createLevel(MAZE_SIZE, MAZE_SIZE);
const view = { position: Math.trunc((MAZE_SIZE * MAZE_SIZE) / 2), fov: FOV };
const world = { player: { view }, level };

const interpreter = createInterpreter(world);

function startLoop(w) {
  let on = false;
  return window.setInterval(function () {
    if (!on) {
      on = true;
      activate(w);
      on = false;
    }
  }, 50);
}

function App() {
  const [rows, setRows] = useState(["Hello!!!"]);

  const onEnter = useCallback(
    function (row) {
      async function launch() {
        const response = await interpreter(row);
        setRows([...rows, response]);
      }

      launch();
    },
    [rows]
  );

  function render(offscreen) {
    levelRenderer(offscreen, level, world);
  }

  useEffect(function () {
    startLoop(world);
  }, []);

  return (
    <div className="application">
      <Canvas
        width={VIEW_SIZE * SCALE}
        height={VIEW_SIZE * SCALE}
        render={render}
      />
      <Console rows={rows} onEnter={onEnter} />
    </div>
  );
}

ReactDom.render(<App />, document.getElementById("root"));
