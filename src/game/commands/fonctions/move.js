import playerQueue from "../../player-queue";
import { DUNGEON_TILES } from "../../../tools";

export function moveUp(world, log) {
  const { player, level } = world;
  const { view } = player;
  const { position } = view;
  const { width, data } = level;
  const next = position - width;

  if (next >= 0 && !DUNGEON_TILES.isNorthWall(data[position])) {
    world.player.view.position = next;
    log(["Vous avancez vers le nord."]);
    return true;
  }
  log(["Impossible d'aller plus loin."]);
  return false;
}

export function moveEast(world, log) {
  const { player, level } = world;
  const { view } = player;
  const { position } = view;
  const { width, data } = level;
  const next = position + 1;

  if (next % width < width - 2 && !DUNGEON_TILES.isEastWall(data[position])) {
    world.player.view.position = next;
    log(["Vous avancez vers l'est'."]);
    return true;
  }
  log(["Impossible d'aller plus loin."]);
  return false;
}

export function moveWest(world, log) {
  const { player, level } = world;
  const { view } = player;
  const { position } = view;
  const { data } = level;
  const next = position - 1;

  if (next >= 0 && !DUNGEON_TILES.isWestWall(data[position])) {
    world.player.view.position = next;
    log(["Vous avancez vers l'ouest'."]);
    return true;
  }
  log(["Impossible d'aller plus loin."]);
  return false;
}

export function moveSouth(world, log) {
  const { player, level } = world;
  const { view } = player;
  const { position } = view;
  const { width, data } = level;
  const next = position + width;

  if (
    Math.trunc(position / width) < width - 1 &&
    !DUNGEON_TILES.isSouthWall(data[position])
  ) {
    world.player.view.position = next;
    log(["Vous avancez vers le sud'."]);
    return true;
  }
  log(["Impossible d'aller plus loin."]);
  return false;
}

function batchCommand(command, how = 1) {
  new Array(how).fill(undefined).forEach(function () {
    playerQueue.push(command);
  });
}

function move(params) {
  if (params["-up"]) {
    const { args } = params["-up"];
    const [how] = args;
    batchCommand(moveUp, how);
  } else if (params["-right"]) {
    const { args } = params["-right"];
    const [how] = args;
    batchCommand(moveEast, how);
  } else if (params["-left"]) {
    const { args } = params["-left"];
    const [how] = args;
    batchCommand(moveWest, how);
  } else if (params["-down"]) {
    const { args } = params["-down"];
    const [how] = args;
    batchCommand(moveSouth, how);
  }
  return 200;
}

export default move;
