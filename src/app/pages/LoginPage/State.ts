import {LoginState} from './Types';
import {name} from '@app/constants';
import {SigninRequest} from '@api/types';

const {login, password} = name;

const loginState: LoginState = {
  load: false,
  error: '',
  data: {
    [login]: '',
    [password]: '',
  } as SigninRequest,
};

export {loginState};
