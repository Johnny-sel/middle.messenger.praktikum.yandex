import {name} from '@app/const';

const {email, login, displayName, firstName, phone, secondName} = name;

const initialState = {
  data: {
    [email]: '',
    [login]: '',
    [firstName]: '',
    [secondName]: '',
    [displayName]: '',
    [phone]: '',
  },
};

export {initialState};
