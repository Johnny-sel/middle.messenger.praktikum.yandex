import {debounce} from './debounce';

test('Debounce', () => {
  const cb = function (args: unknown) {
    console.log('test');
    return args;
  };

  const func = debounce(cb, 300);
  const spyFunc = () => {
    func('args');
  };

  expect(typeof func).toBe('function');
  expect(spyFunc).not.toThrow();
});
