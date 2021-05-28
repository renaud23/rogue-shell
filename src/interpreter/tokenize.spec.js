import tokenize, { TOKENS_TYPE } from "./tokenizer";

describe("tokenize", function () {
  it("todo", function () {
    const result = tokenize("move -toto 250 -titi 50 left");
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(6);
    const { value, type } = result[0];
    expect(value).toBe("move");
    expect(type).toBe(TOKENS_TYPE.command);
  });
});
