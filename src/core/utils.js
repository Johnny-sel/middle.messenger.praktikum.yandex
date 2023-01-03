// types
function isArr(arr) {
  return Array.isArray(arr);
}

function isStr(str) {
  return typeof str === 'string';
}

function isNum(str) {
  return typeof str === 'number';
}

function isFunc(str) {
  return typeof str === 'function';
}

function isNull(value) {
  return typeof value === null;
}

function isObject(item) {
  if (!isArr(item) && !isNull(item)) {
    return typeof item === 'object';
  }
  return false;
}

// math
function random() {
  return Math.random().toString().slice(2, 11);
}

// list
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

export { isArr, isStr, isNum, isFunc, isObject };
export { random };
export { first, last, penultimate, lastIndex };
