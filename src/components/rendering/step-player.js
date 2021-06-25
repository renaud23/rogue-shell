import { computeCoords, DUNGEON_TILES } from "../../tools";
import { getSegment } from "../../tools";

function getDistance2(x1, y1, x2, y2) {
  const xx = x1 - x2;
  const yy = y1 - y2;

  return xx * xx + yy * yy;
}

function isVisible(data, segment) {
  const [sx, sy] = segment[0];
  return segment.reduce(function (state, [x, y]) {
    return state;
  }, true);
}

function step(screen, world) {
  const { player, level } = world;
  const { width, data } = level;
  const { view } = player;
  const { position, fov } = view;
  const fov2 = fov * fov;
  const [px, py] = computeCoords(position, width);
  const { tiles } = screen;

  const next = tiles.map(function (tile) {
    const { x, y } = tile;
    const isPlayerPosition = px === x && py === y;
    const distance2 = getDistance2(x, y, px, py);
    const isInFov = distance2 < fov2;
    if (isInFov) {
      const segment = getSegment([px, py], [x, y]);

      return {
        ...tile,
        isPlayerPosition,
        isVisible: isVisible(data, segment),
      };
    }
    return { ...tile, isPlayerPosition, isVisible: false };
  });

  return { ...screen, tiles: next };
}

export default step;
