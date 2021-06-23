import { TEXTURE_WALL, getTextCoords } from "./render-tools";
import { DUNGEON_TILES } from "../tools";
import { computeCoords } from "../tools";

function draw(offscreen, tile, size, x, y) {
  const [tx, ty] = getTextCoords(tile);
  offscreen.drawTexture(
    TEXTURE_WALL,
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

function drawTile(offscreen, tile, tileSize, x, y, isNorthEastWall, isPlayer) {
  if (DUNGEON_TILES.isGround(tile)) {
    draw(offscreen, DUNGEON_TILES.GROUND, tileSize, x, y);
  }

  const isNorth = DUNGEON_TILES.isNorthWall(tile);
  const isEast = DUNGEON_TILES.isEastWall(tile);
  const isSouth = DUNGEON_TILES.isSouthWall(tile);
  const isWest = DUNGEON_TILES.isWestWall(tile);

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
  if (isPlayer) {
    offscreen.fillRect("red", x * tileSize, y * tileSize, tileSize, tileSize);
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
}

function render(offscreen, level, world) {
  const { player } = world;
  const { view } = player;
  const { position, fov } = view;
  const viewNbTiles = fov * 2 + 1;
  const { width, data } = level;
  const { width: canvasWidth, height: canvasHeight } = offscreen;
  const tileSize = Math.trunc(
    Math.min(canvasHeight / viewNbTiles, canvasWidth / viewNbTiles)
  );
  const [vx, vy] = computeCoords(position, width);
  const anchorTop = Math.max(vy - fov, 0);
  const anchorLeft = Math.max(vx - fov, 0);

  new Array(viewNbTiles * viewNbTiles).fill(undefined).forEach(function (_, i) {
    const [x, y] = computeCoords(i, viewNbTiles);
    const lx = x + anchorLeft;
    const ly = y + anchorTop;
    const xy = lx + ly * width;
    const tile = data[xy];

    const isNorthEastWall =
      Math.trunc(xy / width) - 1 >= 0 &&
      DUNGEON_TILES.isEastWall(data[xy - width]);
    const isPlayer = lx === vx && ly === vy;

    drawTile(offscreen, tile, tileSize, x, y, isNorthEastWall, isPlayer);
  });
}

export default render;
