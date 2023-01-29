function first(list: unknown[]): unknown | undefined {
  if (list.length === 0) {
    return undefined;
  }
  return list[0];
}

function last(list: unknown[]): unknown | undefined {
  if (list.length === 0) {
    return undefined;
  }
  return list[list.length - 1];
}

function penultimate(list: unknown[]): unknown | undefined {
  if (list.length === 0 || list.length < 2) {
    return undefined;
  }
  return list[list.length - 2];
}

function lastIndex(list: unknown[]): number | undefined {
  if (list.length === 0) {
    return undefined;
  }
  return list.length - 1;
}

function isDiffLength(arr1: unknown[], arr2: unknown[]): boolean {
  return arr1.length !== arr2.length;
}

export {first, last, penultimate, lastIndex, isDiffLength};
