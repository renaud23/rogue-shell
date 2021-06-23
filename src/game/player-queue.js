import activateWorld from "./";

const ACTIONS = [];

function activate(world) {}

function push(action) {
  if (typeof action === "function") {
    ACTIONS.push(action);
  }
}

function clear() {
  ACTIONS.splice(0);
}

const QUEUE = { activate, push, clear };

export default QUEUE;
