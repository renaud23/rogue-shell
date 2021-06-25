function compute(position, width) {
  return [position % width, Math.trunc(position / width)];
}

export default compute;
