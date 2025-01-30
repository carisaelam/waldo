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
  if (Math.abs(selected - target) <= 0.2) {
    console.log('it is a match');
    return true;
  } else {
    console.log('nothing to see here');
    return false;
  }
}
