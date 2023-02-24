import {comparePasswords} from './comparePwd';
import {name} from '@app/constants';

const {confirmPassword, password} = name;

test('Compare passwords should return true or false', () => {
  const isFalse = comparePasswords({[password]: 'test', [confirmPassword]: 'test1'});
  const isTrue = comparePasswords({[password]: 'test', [confirmPassword]: 'test'});

  expect(isFalse).toBe(false);
  expect(isTrue).toBe(true);
});
