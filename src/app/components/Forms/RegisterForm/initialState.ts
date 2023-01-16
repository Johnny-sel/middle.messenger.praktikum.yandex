import {name} from '@app/const';

const {email, login, displayName, firstName, phone, secondName, password, confirmPassword} = name;

const initialState = {
  data: {
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

export {initialState};
