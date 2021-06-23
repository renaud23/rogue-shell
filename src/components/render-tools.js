import { createTexture } from "../components/rendering";

export const TEXTURE_WALL = createTexture(
  `${window.location.origin}/texture.png`
);

export function computeCoords(index, width) {
  return [index % width, Math.trunc(index / width)];
}

export function getTextCoords(code) {
  return computeCoords(code - 1, 4);
}
