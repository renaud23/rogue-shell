import React, { useState, useCallback, useEffect } from "react";
import ReactDom from "react-dom";
import { Console, Canvas } from "./components";
import { interpreter, activate, createLevel } from "./game";
import levelRenderer from "./components/level-view-renderer";

const MAZE_SIZE = 11;
const TILE_SIZE = 32;
const FOV = 3;
const VIEW_SIZE = (FOV * 2 + 1) * TILE_SIZE;
const SCALE = 1;

const level = createLevel(MAZE_SIZE, MAZE_SIZE);
const view = { position: Math.trunc((MAZE_SIZE * MAZE_SIZE) / 2), fov: FOV };
const world = { player: { view }, level };

let LOOP_ID;

function startLoop(w, appendRows) {
  let on = false;
  if (LOOP_ID) {
    window.clearInterval(LOOP_ID);
  }

  LOOP_ID = window.setInterval(function () {
    if (!on) {
      on = true;
      activate(w, appendRows);
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
        if (response !== 200) {
          setRows([...rows, response]);
        }
      }

      launch();
    },
    [rows]
  );

  function render(offscreen) {
    levelRenderer(offscreen, level, world);
  }

  const appendRows = useCallback(
    function (messages) {
      setRows([...rows, ...messages]);
    },
    [rows]
  );

  useEffect(
    function () {
      startLoop(world, appendRows);
    },
    [appendRows]
  );

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
