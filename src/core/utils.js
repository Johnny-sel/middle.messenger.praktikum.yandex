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

const isObject = (item) => {
  return item && typeof item === 'object' && !Array.isArray(item) && item !== null;
};

export { isArr, isStr, isNum, isFunc, isObject };
export { random, mergeDeep };
