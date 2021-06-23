import playerQueue from "../../player-queue";

function moveUp(world) {
  return false;
}

function move(params, world) {
  if (params["-up"]) {
    const { args } = params["-up"];
    const how = args || 1;
    new Array(how).fill(undefined).forEach(function () {
      playerQueue.push(moveUp);
    });
  }
  return 200;
}

export default move;
