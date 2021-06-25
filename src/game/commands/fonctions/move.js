import playerQueue from "../../player-queue";
import canWalkOn from "../../can-walk-on";

function moveUp(world) {
  const { player, level } = world;
  const { view } = player;
  const { position } = view;
  const { width } = level;
  const next = position - width;

  if (position - width >= 0 && canWalkOn(world, position)) {
    world.player.view.position = next;
    return true;
  }

  return false;
}

function move(params) {
  if (params["-up"]) {
    const { args } = params["-up"];
    const [how = 1] = args;
    if (how) {
      new Array(how).fill(undefined).forEach(function () {
        playerQueue.push(moveUp);
      });
    }
  }
  return 200;
}

export default move;
