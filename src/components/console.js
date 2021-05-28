import React, { useState, useRef, useCallback, useEffect } from "react";
import "./console.scss";

function Console({ rows = [], onEnter = () => null }) {
  const [value, setValue] = useState("");
  const inputEl = useRef();
  const ulEl = useRef();

  const onKeyDown = useCallback(
    function (e) {
      const { key } = e;
      if (key === "Enter") {
        setValue("");
        onEnter(value);
      }
    },
    [onEnter, value]
  );

  useEffect(
    function () {
      const { current } = ulEl;
      if (current) {
        current.scrollTop = current.scrollHeight - current.clientHeight;
      }
    },
    [rows, ulEl]
  );

  return (
    <div className="console" ref={ulEl}>
      <ul>
        {rows.map((s, i) => (
          <li className="row" key={i}>
            {s}
          </li>
        ))}
        <li>
          <span className="prompt">&gt;</span>
          <input
            type="text"
            onKeyDown={onKeyDown}
            ref={inputEl}
            onChange={(e) => {
              e.preventDefault();
              setValue(e.target.value);
            }}
            value={value}
          />
        </li>
      </ul>
    </div>
  );
}

export default Console;
