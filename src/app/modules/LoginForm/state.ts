import {LoginState} from './types';
import {name} from '@app/const';
import {Signin} from '@api/types';

const {login, password} = name;

const loginState: LoginState = {
  load: false,
  error: '',
  data: {
    [login]: '',
    [password]: '',
  } as Signin,
};

export {loginState};
