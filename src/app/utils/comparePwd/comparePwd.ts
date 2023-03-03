import {name} from '@app/constants';
import {InputData} from '@app/types';

const {confirmPassword, password} = name;

function comparePasswords(inputData: InputData): boolean {
  return inputData[confirmPassword] === inputData[password];
}

export {comparePasswords};
