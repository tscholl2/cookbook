export function debounce(fn: () => void) {
  let isCalling: boolean;
  let shouldCall: boolean;
  return function debounced() {
    if (isCalling) {
      shouldCall = true;
      return;
    }
    isCalling = true;
    requestAnimationFrame(() => {
      fn();
      isCalling = false;
      if (shouldCall) {
        shouldCall = false;
        debounced();
      }
    });
  };
}