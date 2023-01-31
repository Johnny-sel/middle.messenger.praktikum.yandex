import {name} from '@app/constants';

function comparePasswords(inputData: Record<string, unknown>): boolean {
  return inputData[name.confirmPassword] === inputData[name.password];
}

export {comparePasswords};
