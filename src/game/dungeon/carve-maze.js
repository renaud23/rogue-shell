import { DUNGEON_TILES, getRandomInt } from "../../tools";

function carve(laby) {
  const { width, height, data } = laby;
  const visited = new Map();

  let current = getRandomInt(width * height);
  const stack = [];
  let end = false;

  while (!end) {
    end = true;
    visited.set(current, true);
    const possible = [];

    if (
      DUNGEON_TILES.isNorthWall(data[current]) &&
      current - width >= 0 &&
      !visited.has(current - width)
    ) {
      possible.push([
        current - width,
        DUNGEON_TILES.NORTH_WALL,
        DUNGEON_TILES.SOUTH_WALL,
      ]);
    }

    if (
      DUNGEON_TILES.isSouthWall(data[current]) &&
      current + width < width * height - 1 &&
      !visited.has(current + width)
    ) {
      possible.push([
        current + width,
        DUNGEON_TILES.SOUTH_WALL,
        DUNGEON_TILES.NORTH_WALL,
      ]);
    }

    if (
      DUNGEON_TILES.isEastWall(data[current]) &&
      current % width < width - 1 &&
      !visited.has(current + 1)
    ) {
      possible.push([
        current + 1,
        DUNGEON_TILES.EAST_WALL,
        DUNGEON_TILES.WEST_WALL,
      ]);
    }

    if (
      DUNGEON_TILES.isWestWall(data[current]) &&
      current % width > 0 &&
      !visited.has(current - 1)
    ) {
      possible.push([
        current - 1,
        DUNGEON_TILES.WEST_WALL,
        DUNGEON_TILES.EAST_WALL,
      ]);
    }

    if (!possible.length) {
      if (stack.length) {
        current = stack.pop();
        end = false;
      }
    } else {
      const [next, where, other] = possible[getRandomInt(possible.length)];
      data[current] = DUNGEON_TILES.openWall(data[current], where);
      data[next] = DUNGEON_TILES.openWall(data[next], other);
      stack.push(current);
      current = next;
      end = false;
    }
  }

  return laby;
}

function create(width, height) {
  return carve({
    data: new Array(width * height).fill(
      DUNGEON_TILES.GROUND |
        DUNGEON_TILES.NORTH_WALL |
        DUNGEON_TILES.SOUTH_WALL |
        DUNGEON_TILES.EAST_WALL |
        DUNGEON_TILES.WEST_WALL
    ),
    width,
    height,
  });
}

export default create;
