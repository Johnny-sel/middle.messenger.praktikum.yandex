import {name} from '@app/const';
import {Singup} from '@api/types';

const {email, login, displayName, firstName, phone, secondName, password, confirmPassword} = name;

const initialState = {
  error: undefined,
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
  } as Singup,
};

export {initialState};
