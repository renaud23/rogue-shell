// eslint-disable-next-line
// import InterpreteWorker from "./execute.worker";
import { createInterpreter, validate, tokenizer } from "../../interpreter";
import execute from "./execute";

const interpreter = createInterpreter(validate, execute);

export function isWorkerCompatible() {
  if (window.Worker) {
    return true;
  }
  return false;
}

function withWorker(row, world) {
  const WORKER = new Worker("./execute.worker", { type: "module" }); //new InterpreteWorker();

  return new Promise(function (resolve) {
    WORKER.postMessage({ row, world });
    WORKER.addEventListener("message", function (e) {
      const { data } = e;
      resolve(data);
    });
  });
}

function create(world) {
  return async function compute(row) {
    try {
      if (isWorkerCompatible()) {
        return withWorker(row, world);
      }
      return interpreter(tokenizer(row), world);
    } catch (e) {
      console.error(e);
      return e.message;
    }
  };
}

export default create;
