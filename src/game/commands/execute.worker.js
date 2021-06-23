/* eslint-disable no-restricted-globals */
import "core-js/stable";
import "regenerator-runtime/runtime";
import { createInterpreter, validate, tokenizer } from "../../interpreter";
import execute from "./execute";

let INTERPRETER;

function getInterpreter() {
  if (!INTERPRETER) {
    INTERPRETER = createInterpreter(validate, execute);
  }
  return INTERPRETER;
}

self.onmessage = function (e) {
  try {
    const { data } = e;
    const { row, world } = data;
    const interpreter = getInterpreter();
    const response = interpreter(tokenizer(row), world);
    self.postMessage(response);
  } catch (e) {
    console.error(e);
    self.postMessage(e.message);
  }
};
