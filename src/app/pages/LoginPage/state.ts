import {LoginState} from './types';
import {name} from '@app/constants';
import {SigninRequest} from '@api/types';

const {login, password} = name;

const loginState: LoginState = {
  load: false,
  error: '',
  inputData: {
    [login]: '',
    [password]: '',
  } as SigninRequest,
};

export {loginState};
