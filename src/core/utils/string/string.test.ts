import { capitalizeFirstLetter } from '../';

describe('String utils', () => {
  test('capitalizeFirstLetter function should be return text with capital first letter', () => {
    expect(capitalizeFirstLetter('test')).toBe('Test');
  });
});
