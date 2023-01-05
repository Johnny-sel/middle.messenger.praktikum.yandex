function first(list) {
  if (list.length === 0) {
    return undefined;
  }
  return list[0];
}

function last(list) {
  if (list.length === 0) {
    return undefined;
  }
  return list[list.length - 1];
}

function penultimate(list) {
  if (list.length === 0 || list.length < 2) {
    return undefined;
  }
  return list[list.length - 2];
}

function lastIndex(list) {
  if (list.length === 0) {
    return undefined;
  }
  return list.length - 1;
}

export { first, last, penultimate, lastIndex };