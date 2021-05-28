// eslint-disable-next-line
// import InterpreteWorker from "./execute.worker";
import { createInterpreter, validate, tokenizer } from "../../interpreter";
import execute from "./execute";

const interprete = createInterpreter(validate, execute);

export function isWorkerCompatible() {
  if (window.Worker) {
    return true;
  }
  return false;
}

function withWorker(row) {
  const WORKER = new Worker("./execute.worker", { type: "module" }); //new InterpreteWorker();

  return new Promise(function (resolve) {
    WORKER.postMessage(row);
    WORKER.addEventListener("message", function (e) {
      const { data } = e;
      resolve(data);
    });
  });
}

async function compute(row) {
  try {
    if (isWorkerCompatible()) {
      return withWorker(row);
    }
    return interprete(tokenizer(row));
  } catch (e) {
    console.error(e);
    return e.message;
  }
}

export default compute;
