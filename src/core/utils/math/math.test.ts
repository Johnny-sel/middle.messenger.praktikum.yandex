import {random} from './math';

describe('Math utils', () => {
  test('random function should be return number', () => {
    expect(typeof random()).toBe('number');
  });
});
