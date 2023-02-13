import {deepCopy} from '../';

const testObject = {
  numbers: {1: '1', 2: '2', 3: '3'},
  strings: {one: 'one', two: 'two', three: 'three'},
  objects: {one: {numbers: {1: '1', 2: '2', 3: '3'}}, two: {strings: {one: 'one', two: 'two'}}},
  arrays: {numbers: [1, 2, 3], string: ['1', '2', '3']},
  nullable: null,
  undef: undefined,
};

describe('Object utils', () => {
  test('deepCopy function should be return deep copy object', () => {
    expect(deepCopy(testObject)).toEqual(testObject);
  });
});
