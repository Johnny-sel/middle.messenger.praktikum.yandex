import {random} from '../';

describe('Math utils', () => {
  test('random function should be return number', () => {
    expect(typeof random()).toBe('number');
  });
});
