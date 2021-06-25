import { createInterpreter, validate, tokenizer } from "../../interpreter";
import execute from "./execute";

const interpreter = createInterpreter(validate, execute);

// export function isWorkerCompatible() {
//   if (window.Worker) {
//     return true;
//   }
//   return false;
// }

// function withWorker(row, world) {
// const WORKER = new Worker("./execute.worker.js", { type: "module" });
// return new Promise(function (resolve) {
//   WORKER.postMessage({ row, world });
//   WORKER.addEventListener("message", function (e) {
//     const { data } = e;
//     resolve(data);
//   });
// });
// }

async function compute(row) {
  // try {
  //   if (isWorkerCompatible()) {
  //     return withWorker(row, world);
  //   }
  //
  //   return interpreter(tokenizer(row), world);
  // } catch (e) {
  //   console.error(e);
  //   return e.message;
  // }

  try {
    return interpreter(tokenizer(row));
  } catch (e) {
    console.error(e);
    return e.message;
  }
}

export default compute;
