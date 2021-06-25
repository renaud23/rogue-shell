const ACTIONS = [];

function activate(world) {
  if (ACTIONS.length) {
    const next = ACTIONS.shift();
    const is = next(world);
    if (!is) {
      clear();
    }
    return true;
  }
  return false;
}

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
