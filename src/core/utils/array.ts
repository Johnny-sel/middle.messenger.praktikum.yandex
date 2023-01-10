function first<T>(list: T[]): T | undefined {
  if (list.length === 0) {
    return undefined;
  }
  return list[0];
}

function last<T>(list: T[]): T | undefined {
  if (list.length === 0) {
    return undefined;
  }
  return list[list.length - 1];
}

function penultimate<T>(list: T[]): T | undefined {
  if (list.length === 0 || list.length < 2) {
    return undefined;
  }
  return list[list.length - 2];
}

function lastIndex<T>(list: T[]): number | undefined {
  if (list.length === 0) {
    return undefined;
  }
  return list.length - 1;
}

function isDiffLength<T>(arr1: T[], arr2: T[]): boolean {
  return arr1.length !== arr2.length;
}

export { first, last, penultimate, lastIndex, isDiffLength };
