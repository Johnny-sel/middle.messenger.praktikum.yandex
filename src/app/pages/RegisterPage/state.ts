import {name} from '@app/constants';
import {RegisterState} from './types';

const {email, login, displayName, firstName} = name;
const {phone, secondName, password, confirmPassword} = name;

const registerState: RegisterState = {
  error: '',
  load: false,
  inputData: {
    [email]: '',
    [login]: '',
    [firstName]: '',
    [secondName]: '',
    [displayName]: '',
    [phone]: '',
    [password]: '',
    [confirmPassword]: '',
  },
};

export {registerState};
