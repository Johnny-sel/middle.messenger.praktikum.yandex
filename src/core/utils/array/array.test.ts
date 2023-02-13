import {first, isDiffLength, last, penultimate, lastIndex} from '../';

describe('Array utils', () => {
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const empty = [] as [];
  test('first function should be return first element of array', () => {
    expect(first(list)).toBe(1);
    expect(first(empty)).toBeUndefined();
  });
  test('last function should be return last element of array', () => {
    expect(last(list)).toBe(10);
    expect(last(empty)).toBeUndefined();
  });
  test('penultimate function should be return penultimate element of array', () => {
    expect(penultimate(list)).toBe(9);
    expect(penultimate(empty)).toBeUndefined();
  });
  test('lastIndex function should be return lastIndex index of array', () => {
    expect(lastIndex(list)).toBe(9);
    expect(lastIndex(empty)).toBeUndefined();
  });
  test('isDiffLength function should be compare lengths of two array', () => {
    expect(isDiffLength(list, array)).toBe(false);
    expect(isDiffLength(arr, array)).toBe(true);
  });
});
