import React from "react";
import "./console.scss";

function Console({ messages }) {
  return (
    <div className="console">
      <ul>
        <li>
          <span className="prompt">&gt;</span>
          <input type="text" />
        </li>
      </ul>
    </div>
  );
}

export default Console;
