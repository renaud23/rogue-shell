export const EMPTY = 0b0;
export const NORTH_WALL = 0b0001; // 1
export const SOUTH_WALL = 0b0010; // 2
export const EAST_WALL = 0b0100; // 4
export const WEST_WALL = 0b1000; // 8
export const GROUND = 0b10000; // 16

export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
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
