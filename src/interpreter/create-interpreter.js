import { TOKENS_TYPE } from "./tokenizer";

function fillArguments(params, name, value) {
  const param = params[name];
  const { args } = param;
  return { ...params, [name]: { ...param, args: [...args, value] } };
}

function buildAST(tokens) {
  const { command, params } = tokens.reduce(
    function ({ expect, command, params, lastParams }, token, i) {
      if (i === 0) {
        const { type, value } = token;
        if (type === TOKENS_TYPE.command) {
          return {
            command: value,
            params: [],
            expect: [TOKENS_TYPE.parameter],
            last: undefined,
          };
        }

        throw new Error("La ligne doit commencer par une commande !");
      } else {
        const { type, value } = token;
        if (expect && expect.indexOf(type) === -1) {
          throw new Error(
            expect.reduce(
              (a, e) => `${a}${e}|`,
              `${value} ${type} n'est pas du type`
            )
          );
        }
        switch (type) {
          case TOKENS_TYPE.parameter:
            const param = { args: [] };
            return {
              expect: undefined,
              command,
              params: { [value]: param, ...params },
              lastParams: value,
            };
          case TOKENS_TYPE.argument:
            return {
              expect: undefined,
              command,
              lastParams,
              params: fillArguments(params, lastParams, value),
            };
          case TOKENS_TYPE.integer:
            return {
              expect: undefined,
              command,
              lastParams,
              params: fillArguments(params, lastParams, parseInt(value)),
            };

          default:
            throw new Error(`Type non reconnu ${type}`);
        }
      }
    },
    { expect: undefined, params: {}, command: undefined, lastParam: undefined }
  );
  return { command, params };
}

function createExecute(validate, execute) {
  return function (tokens) {
    const tree = buildAST(tokens);
    validate(tree);
    return execute(tree);
  };
}

export default createExecute;
