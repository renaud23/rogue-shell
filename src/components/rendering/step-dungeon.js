import { computeCoords, DUNGEON_TILES } from "../../tools";

function step(world) {
  const { player, screenSize, level } = world;
  const { view } = player;
  const { position } = view;
  const renderNbTiles = screenSize * 2 + 1;
  const { width, height, data } = level;

  const [vx, vy] = computeCoords(position, width);
  const anchorTop = Math.min(
    Math.max(vy - screenSize, 0),
    height - renderNbTiles
  );
  const anchorLeft = Math.min(
    Math.max(vx - screenSize, 0),
    width - renderNbTiles
  );

  const tiles = new Array(renderNbTiles * renderNbTiles)
    .fill(undefined)
    .map(function (_, i) {
      const [lx, ly] = computeCoords(i, renderNbTiles);
      const x = lx + anchorLeft;
      const y = ly + anchorTop;
      const xy = x + y * width;
      const code = data[xy];
      const isNorthEastWall =
        Math.trunc(xy / width) - 1 >= 0 &&
        DUNGEON_TILES.isEastWall(data[xy - width]);

      return { code, x, y, isNorthEastWall };
    });

  return { tiles, anchorTop, anchorLeft, renderNbTiles };
}

export default step;
