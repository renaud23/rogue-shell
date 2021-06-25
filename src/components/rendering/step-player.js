import { computeCoords } from "../../tools";

function step(screen, world) {
  const { player, level } = world;
  const { width } = level;
  const { view } = player;
  const { position } = view;
  const [px, py] = computeCoords(position, width);

  const { tiles } = screen;

  const next = tiles.map(function (tile) {
    const { x, y } = tile;
    const isPlayerPosition = px === x && py === y;
    return { ...tile, isPlayerPosition };
  });

  return { ...screen, tiles: next };
}

export default step;
