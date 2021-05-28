import React from "react";
import ReactDom from "react-dom";
import { Console } from "./components";

function App() {
  return (
    <div>
      <Console />
    </div>
  );
}

ReactDom.render(<App />, document.getElementById("root"));
