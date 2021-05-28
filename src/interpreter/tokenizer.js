export const TOKENS_TYPE = {
  command: "token/command",
  parameter: "token/parameter",
  integer: "token/integer",
  argument: "token/argument",
};

const TOKENS = {
  command: { pattern: /^(move|help)/, type: TOKENS_TYPE.command },
  parameter: { pattern: /^-[a-z](\w+)?/, type: TOKENS_TYPE.parameter },
  integer: { pattern: /^[1-9]([0-9]+)?/, type: TOKENS_TYPE.integer },
  argument: { pattern: /\w+/, type: TOKENS_TYPE.argument },
};

function readNext(input, parts, pos) {
  let consumed = 0;
  if (/\s/.test(input[pos])) {
    while (consumed < input.length && /\s/.test(input[pos + ++consumed])) {}
  } else {
    while (consumed < input.length && !/\s/.test(input[pos + ++consumed])) {}
    parts.push(input.substr(pos, consumed));
  }
  return pos + consumed;
}

function split(input) {
  const parts = [];
  let current = 0;
  while (current < input.length) {
    current = readNext(input, parts, current);
  }
  return parts;
}

function identify(value, patterns) {
  const finded = Object.values(patterns).reduce(function (
    f,
    { pattern, type }
  ) {
    if (!f) {
      const match = value.match(pattern);
      if (match) {
        const [token] = match;
        if (value === token) {
          return { value, type };
        }
      }
    }
    return f;
  },
  undefined);
  if (finded) {
    return finded;
  }
  return { value, type: "unknow" };
}

function tokenize(input) {
  if (typeof input === "string" && input.length) {
    const parts = split(input);
    return parts.map(function (part) {
      return identify(part, TOKENS);
    });
  }
  return [];
}

export default tokenize;
