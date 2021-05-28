import { createInterpreter, validate, tokenize } from "../../interpreter";
import execute from "./execute";

const interprete = createInterpreter(validate, execute);

function compute(row) {
  try {
    return interprete(tokenize(row));
  } catch (e) {
    return e;
  }
}

export default compute;
