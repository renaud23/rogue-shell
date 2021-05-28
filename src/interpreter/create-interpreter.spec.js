import createInterpreter from "./create-interpreter";
import validate from "./validate-tree";
import cretateExecute from "./create-execute-tree";
import tokenize from "./tokenizer";

function move(params) {
  console.log("move", params);
  return 200;
}

const interprete = createInterpreter(validate, cretateExecute({ move }));

describe("create-interpreter", function () {
  it("first", function () {
    const tokens = tokenize("       move -up 10 toto   ");
    interprete(tokens);
    // TODO
  });
});
