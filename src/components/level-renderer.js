import { createTexture } from "../components/rendering";
import {
  isNorthWall,
  NORTH_WALL,
  WEST_WALL,
  isWestWall,
  isEastWall,
  EAST_WALL,
  isSouthWall,
  SOUTH_WALL,
  isGround,
  GROUND,
} from "../game";

const texture = createTexture(`${window.location.origin}/texture.png`);

function computeCoord(index, width) {
  return [index % width, Math.trunc(index / width)];
}

function getTextCoord(code) {
  return computeCoord(code - 1, 4);
}

function draw(offscreen, tile, size, x, y) {
  const [tx, ty] = getTextCoord(tile);
  offscreen.drawTexture(
    texture,
    tx * 16,
    ty * 16,
    16,
    16,
    x * size,
    y * size,
    size,
    size
  );
}

function render(offscreen, level) {
  const { width, height, data } = level;
  const { width: canvasWidth, height: canvasHeight } = offscreen;
  const tileSize = Math.trunc(
    Math.min(canvasHeight / height, canvasWidth / width)
  );

  data.forEach(function (tile, i) {
    const [x, y] = computeCoord(i, width);
    if (isGround(tile)) {
      draw(offscreen, GROUND, tileSize, x, y);
    }
    if (isNorthWall(tile)) {
      draw(offscreen, NORTH_WALL, tileSize, x, y);
    }
    if (isWestWall(tile)) {
      draw(offscreen, WEST_WALL, tileSize, x, y);
    }
    if (isEastWall(tile)) {
      draw(offscreen, EAST_WALL, tileSize, x, y);
    }
    if (isSouthWall(tile)) {
      draw(offscreen, SOUTH_WALL, tileSize, x, y);
    }
  });
}

export default render;
