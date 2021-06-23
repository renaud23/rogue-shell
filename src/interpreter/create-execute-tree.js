function create(commands) {
  return function (tree, ...args) {
    const { command, params } = tree;
    if (typeof commands[command] === "function") {
      return commands[command](params, ...args);
    }
  };
}
export default create;
