export const EMPTY = 0b0;
export const NORTH_WALL = 0b0001; // 1
export const SOUTH_WALL = 0b0010; // 2
export const EAST_ENDED_WALL = 0b0011; // 3
export const EAST_WALL = 0b0100; // 4
export const WEST_WALL = 0b1000; // 8
export const GROUND = 0b10000; // 16

const NORTH_EAST_CORNER = 13;
const NORTH_EAST_END_CORNER = 14;
const NORTH_WEST_CORNER = 15;
const SOUTH_EAST_CORNER = 10;
const SOUTH_WEST_CORNER = 11;
const INNER_CORNER = 0b0101;

function isInnerCorner(code) {
  return (INNER_CORNER & code) === INNER_CORNER;
}

export function isNorthWall(code) {
  return NORTH_WALL & code;
}

export function isSouthWall(code) {
  return SOUTH_WALL & code;
}

export function isEastWall(code) {
  return EAST_WALL & code;
}

export function isWestWall(code) {
  return WEST_WALL & code;
}

export function isGround(code) {
  return GROUND & code;
}

export function isEmpty(code) {
  return EMPTY & code;
}

function openWall(code, wall) {
  return code & (code ^ wall);
}

export const DUNGEON_TILES = {
  EMPTY,
  NORTH_WALL,
  SOUTH_WALL,
  EAST_WALL,
  EAST_ENDED_WALL,
  WEST_WALL,

  INNER_CORNER,
  NORTH_EAST_CORNER,
  NORTH_EAST_END_CORNER,
  NORTH_WEST_CORNER,
  SOUTH_EAST_CORNER,
  SOUTH_WEST_CORNER,

  GROUND,
  isEmpty,
  isGround,
  isWestWall,
  isEastWall,
  isSouthWall,
  isNorthWall,
  isInnerCorner,
  openWall,
};
