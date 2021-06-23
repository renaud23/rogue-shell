import { createTexture } from "../components/rendering";
import { DUNGEON_TILES, isEastWall } from "../tools";

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
    tx * 32,
    ty * 32,
    32,
    32,
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
    if (DUNGEON_TILES.isGround(tile)) {
      draw(offscreen, DUNGEON_TILES.GROUND, tileSize, x, y);
    }

    const isNorth = DUNGEON_TILES.isNorthWall(tile);
    const isEast = DUNGEON_TILES.isEastWall(tile);
    const isSouth = DUNGEON_TILES.isSouthWall(tile);
    const isWest = DUNGEON_TILES.isWestWall(tile);

    const isNorthEastWall =
      Math.trunc(i / width) - 1 >= 0 && isEastWall(data[i - width]);

    if (isNorth) {
      draw(offscreen, DUNGEON_TILES.NORTH_WALL, tileSize, x, y);
    }

    if (isEast) {
      if (isNorthEastWall && !isNorth) {
        draw(offscreen, DUNGEON_TILES.EAST_WALL, tileSize, x, y);
      } else {
        draw(offscreen, DUNGEON_TILES.EAST_ENDED_WALL, tileSize, x, y);
      }
    }

    if (isSouth) {
      draw(offscreen, DUNGEON_TILES.SOUTH_WALL, tileSize, x, y);
    }
    if (isWest) {
      draw(offscreen, DUNGEON_TILES.WEST_WALL, tileSize, x, y);
    }

    if (!isWest && !isSouth) {
      draw(offscreen, DUNGEON_TILES.SOUTH_WEST_CORNER, tileSize, x, y);
    }

    if (!isNorth && !isWest) {
      draw(offscreen, DUNGEON_TILES.NORTH_WEST_CORNER, tileSize, x, y);
    }

    if (!isSouth && !isEast) {
      draw(offscreen, DUNGEON_TILES.SOUTH_EAST_CORNER, tileSize, x, y);
    }

    if (!isEast && !isNorth) {
      if (isNorthEastWall) {
        draw(offscreen, DUNGEON_TILES.NORTH_EAST_CORNER, tileSize, x, y);
      } else {
        draw(offscreen, DUNGEON_TILES.NORTH_EAST_END_CORNER, tileSize, x, y);
      }
    }
  });
}

export default render;
