import {isEmpty} from './multi';

describe('Common utils', () => {
  const map1 = new Map();
  map1.set('a', 1);
  test('isEmpty should be check any target to empty value', () => {
    expect(isEmpty({})).toBe(true);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty('')).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
    expect(isEmpty(5)).toBe(true);
    expect(isEmpty('string')).toBe(false);
    expect(isEmpty([1, 2, 3])).toBe(false);
    expect(isEmpty(new Map())).toBe(true);
    expect(isEmpty(map1)).toBe(false);
    expect(isEmpty(() => {})).toBe(false);
  });
});
