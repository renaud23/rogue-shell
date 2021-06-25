import { DUNGEON_TILES } from "../tools";

function can(world, position) {
  const { level } = world;
  const { data } = level;
  return !DUNGEON_TILES.isNorthWall(data[position]);
}

export default can;
