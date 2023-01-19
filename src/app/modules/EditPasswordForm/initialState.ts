import {name} from '@app/const';

const {confirmPassword, password} = name;

const initialState = {
  data: {
    [password]: '',
    [confirmPassword]: '',
  },
};

export {initialState};
