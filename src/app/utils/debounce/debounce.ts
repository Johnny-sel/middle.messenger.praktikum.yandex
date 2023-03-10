let timeoutId: number;

function debounce(cb: (arg: unknown) => void, ms: number) {
  return function (args: unknown) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      cb(args);
      clearTimeout(timeoutId);
    }, ms);
  };
}

export {debounce};
