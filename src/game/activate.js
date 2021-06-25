import activateWorld from "./activate-world";
import QUEUE from "./player-queue";

function activate(world, log) {
  if (QUEUE.activate(world, log)) {
    activateWorld(world, log);
  }
}

export default activate;
