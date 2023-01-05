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


export { isArr, isStr, isNum, isFunc, isObject };