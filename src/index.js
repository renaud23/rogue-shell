import React, { useState, useCallback } from "react";
import ReactDom from "react-dom";
import { Console, Canvas } from "./components";
import { interprete } from "./game";
import { createLevel } from "./game";
import levelRenderer from "./components/level-renderer";

const level = createLevel(50, 50);

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
      <Canvas width={200} height={200} render={render} />
      <Console rows={rows} onEnter={onEnter} />
    </div>
  );
}

ReactDom.render(<App />, document.getElementById("root"));
