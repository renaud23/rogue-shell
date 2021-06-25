import activateWorld from "./activate-world";
import QUEUE from "./player-queue";

function activate(world) {
  if (QUEUE.activate(world)) {
    activateWorld(world);
  }
}

export default activate;
