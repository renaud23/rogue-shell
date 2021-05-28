function create(commands) {
  return function (tree) {
    const { command, params } = tree;
    if (typeof commands[command] === "function") {
      return commands[commands](params);
    }
  };
}
export default create;
