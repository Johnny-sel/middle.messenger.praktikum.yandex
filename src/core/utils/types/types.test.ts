import {isArr, isFunc, isNull, isNum, isObject, isStr} from '../';

describe('Types utils', () => {
  const array = ['1', '2'];
  const object = {};
  const string = 'String';
  const number = 5;
  const nullable = null;
  const undef = undefined;
  const func = () => {};

  test('isArr function should be check type on array', () => {
    expect(isArr(array)).toBe(true);
    expect(isArr(object)).toBe(false);
    expect(isArr(string)).toBe(false);
    expect(isArr(number)).toBe(false);
    expect(isArr(nullable)).toBe(false);
    expect(isArr(undef)).toBe(false);
    expect(isArr(func)).toBe(false);
  });
  test('isStr function should be check type on string', () => {
    expect(isStr(array)).toBe(false);
    expect(isStr(object)).toBe(false);
    expect(isStr(string)).toBe(true);
    expect(isStr(number)).toBe(false);
    expect(isStr(nullable)).toBe(false);
    expect(isStr(undef)).toBe(false);
    expect(isStr(func)).toBe(false);
  });
  test('isNum function should be check type on number', () => {
    expect(isNum(array)).toBe(false);
    expect(isNum(object)).toBe(false);
    expect(isNum(string)).toBe(false);
    expect(isNum(number)).toBe(true);
    expect(isNum(nullable)).toBe(false);
    expect(isNum(undef)).toBe(false);
    expect(isNum(func)).toBe(false);
  });
  test('isNull function should be check type on null', () => {
    expect(isNull(array)).toBe(false);
    expect(isNull(object)).toBe(false);
    expect(isNull(string)).toBe(false);
    expect(isNull(number)).toBe(false);
    expect(isNull(nullable)).toBe(true);
    expect(isNull(undef)).toBe(false);
    expect(isNull(func)).toBe(false);
  });
  test('isObject function should be check type on object', () => {
    expect(isObject(array)).toBe(false);
    expect(isObject(object)).toBe(true);
    expect(isObject(string)).toBe(false);
    expect(isObject(number)).toBe(false);
    expect(isObject(nullable)).toBe(false);
    expect(isObject(undef)).toBe(false);
    expect(isObject(func)).toBe(false);
  });
  test('isFunc function should be check type on function', () => {
    expect(isFunc(array)).toBe(false);
    expect(isFunc(object)).toBe(false);
    expect(isFunc(string)).toBe(false);
    expect(isFunc(number)).toBe(false);
    expect(isFunc(nullable)).toBe(false);
    expect(isFunc(undef)).toBe(false);
    expect(isFunc(func)).toBe(true);
  });
});
