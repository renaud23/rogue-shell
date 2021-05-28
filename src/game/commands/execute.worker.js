/* eslint-disable no-restricted-globals */
import "core-js/stable";
import "regenerator-runtime/runtime";
import { createInterpreter, validate, tokenizer } from "../../interpreter";
import execute from "./execute";

self.onmessage = function (e) {
  try {
    const interprete = createInterpreter(validate, execute);
    const response = interprete(tokenizer(e.data));
    self.postMessage(response);
  } catch ({ message }) {
    self.postMessage(message);
  }
};
