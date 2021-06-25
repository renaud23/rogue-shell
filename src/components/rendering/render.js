import { TEXTURE_WALL, TEXTURE_PLAYER, getTextCoords } from "./render-tools";
import { DUNGEON_TILES, computeCoords } from "../../tools";
import stepDungeon from "./step-dungeon";
import stepPlayer from "./step-player";

function drawPlayer(offscreen, size, x, y) {
  offscreen.drawTexture(
    TEXTURE_PLAYER,
    0,
    0,
    32,
    32,
    x * size,
    y * size,
    size,
    size
  );
}

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

function drawTile(offscreen, tile, tileSize, x, y) {
  const { code, isNorthEastWall, isPlayerPosition, isVisible } = tile;

  if (!isVisible) {
    return false;
  }

  if (DUNGEON_TILES.isGround(code)) {
    draw(offscreen, DUNGEON_TILES.GROUND, tileSize, x, y);
  }

  const isNorth = DUNGEON_TILES.isNorthWall(code);
  const isEast = DUNGEON_TILES.isEastWall(code);
  const isSouth = DUNGEON_TILES.isSouthWall(code);
  const isWest = DUNGEON_TILES.isWestWall(code);

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
  if (isPlayerPosition) {
    drawPlayer(offscreen, tileSize, x, y);
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

function render(offscreen, world) {
  const { width: canvasWidth, height: canvasHeight } = offscreen;
  const { tiles, renderNbTiles } = stepPlayer(stepDungeon(world), world);
  const tileSize = Math.trunc(
    Math.min(canvasHeight / renderNbTiles, canvasWidth / renderNbTiles)
  );
  tiles.forEach(function (tile, i) {
    const [x, y] = computeCoords(i, renderNbTiles);

    drawTile(offscreen, tile, tileSize, x, y);
  });
}

export default render;
