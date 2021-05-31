import {
  GROUND,
  WEST_WALL,
  EAST_WALL,
  NORTH_WALL,
  SOUTH_WALL,
} from "../common-tools";

function create(width, height) {
  return {
    width,
    height,
    data: new Array(width * height).fill(GROUND).map(function (code, i) {
      let next = code;
      const row = Math.trunc(i / width);
      const column = i % width;
      if (column === 0) {
        next |= WEST_WALL;
      }
      if (column === width - 1) {
        next |= EAST_WALL;
      }
      if (row === 0) {
        next |= NORTH_WALL;
      }
      if (row === height - 1) {
        next |= SOUTH_WALL;
      }
      return next;
    }),
  };
}

export default create;
