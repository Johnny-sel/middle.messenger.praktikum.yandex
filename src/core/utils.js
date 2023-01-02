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

function random() {
  return Math.random().toString().slice(2, 11);
}

export { isArr, isStr, isNum, isFunc };
export { random };
