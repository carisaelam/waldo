export function getNormalizedCoordinates(e) {
  const boundingClient = e.target.getBoundingClientRect();

  const relativeX = e.clientX - boundingClient.left;
  const relativeY = e.clientY - boundingClient.top;

  if (!e.target.naturalWidth || !e.target.naturalHeight) {
    console.error('Image not fully loaded');
    return { normalizedX: 0, normalizedY: 0 };
  }

  const normalizedX = relativeX / boundingClient.width;
  const normalizedY = relativeY / boundingClient.height;

  return { normalizedX, normalizedY };
}

export function compareSelectedAndTarget(selected, target) {
  const THRESHOLD = 0.05;
  if (
    Math.abs(selected[0] - target[0]) <= THRESHOLD &&
    Math.abs(selected[1] - target[1] <= THRESHOLD)
  ) {
    console.log('it is a match');
    console.log('selected,target', selected, target);
    return true;
  } else {
    console.log('nothing to see here');
    return false;
  }
}
