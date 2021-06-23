import carveMaze from "./carve-maze";

function create(width, height) {
  return carveMaze(width, height);

  // return {
  //   width,
  //   height,
  //   data: new Array(height * width)
  //     .fill(DUNGEON_TILES.GROUND)
  //     .map(function (code, i) {
  //       let next = code;
  //       const row = Math.trunc(i / width);
  //       const column = i % width;
  //       if (column === 0) {
  //         next |= DUNGEON_TILES.WEST_WALL;
  //       }
  //       if (column === width - 1) {
  //         next |= DUNGEON_TILES.EAST_WALL;
  //       }
  //       if (row === 0) {
  //         next |= DUNGEON_TILES.NORTH_WALL;
  //       }
  //       if (row === height - 1) {
  //         next |= DUNGEON_TILES.SOUTH_WALL;
  //       }
  //       return next;
  //     }),
  // };
}

export default create;
