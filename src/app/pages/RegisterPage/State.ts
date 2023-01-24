import {name} from '@app/constants';
import {SingupRequest} from '@api/types';
import {RegisterState} from './Types';

const {email, login, displayName, firstName, phone, secondName, password, confirmPassword} = name;

const registerState: RegisterState = {
  error: '',
  load: false,
  data: {
    [email]: '',
    [login]: '',
    [firstName]: '',
    [secondName]: '',
    [displayName]: '',
    [phone]: '',
    [password]: '',
    [confirmPassword]: '',
  } as SingupRequest,
};

export {registerState};
