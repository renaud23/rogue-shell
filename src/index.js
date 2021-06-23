import React, { useState, useCallback } from "react";
import ReactDom from "react-dom";
import { Console, Canvas } from "./components";
import { interprete } from "./game";
import { createLevel } from "./game";
import levelRenderer from "./components/level-renderer";

const SIZE = 30;
const TILE_SIZE = 32;
const SCALE = 0.5;

const level = createLevel(SIZE, SIZE);

function App() {
  const [rows, setRows] = useState(["Hello!!!"]);

  const onEnter = useCallback(
    function (row) {
      async function launch() {
        const response = await interprete(row);
        setRows([...rows, response]);
      }

      launch();
    },
    [rows]
  );

  function render(offscreen) {
    levelRenderer(offscreen, level);
  }

  return (
    <div className="application">
      <Canvas
        width={TILE_SIZE * SIZE * SCALE}
        height={TILE_SIZE * SIZE * SCALE}
        render={render}
      />
      <Console rows={rows} onEnter={onEnter} />
    </div>
  );
}

ReactDom.render(<App />, document.getElementById("root"));
