import { createTexture } from "./rendering";

export const TEXTURE_WALL = createTexture(
  `${window.location.origin}/texture.png`
);

export const TEXTURE_PLAYER = createTexture(
  `${window.location.origin}/texture_player.png`
);

export function computeCoords(index, width) {
  return [index % width, Math.trunc(index / width)];
}

export function getTextCoords(code) {
  return computeCoords(code - 1, 4);
}
