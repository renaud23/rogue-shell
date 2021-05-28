function create(commands) {
  return function (tree) {
    const { command, params } = tree;
    if (typeof commands[command] === "function") {
      return commands[command](params);
    }
  };
}
export default create;
