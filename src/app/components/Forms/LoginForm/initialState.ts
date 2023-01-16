import {name} from '@app/const';

const {email, password} = name;

const initialState = {
  data: {
    [email]: '',
    [password]: '',
  },
};

export {initialState};
