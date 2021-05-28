import React, { useState, useCallback } from "react";
import ReactDom from "react-dom";
import { Console } from "./components";
import { interprete } from "./game";

function App() {
  const [rows, setRows] = useState(["Hello!!!"]);

  const onEnter = useCallback(
    function (row) {
      async function launch() {
        const response = await interprete(row);
        console.log(response);
        // setRows([...rows, response]);
      }

      launch();
    },
    [rows]
  );

  return (
    <div className="application">
      <Console rows={rows} onEnter={onEnter} />
    </div>
  );
}

ReactDom.render(<App />, document.getElementById("root"));
