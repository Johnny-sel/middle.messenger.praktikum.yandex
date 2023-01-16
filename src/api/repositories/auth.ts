import {api} from '../api';
import {User, UserId, Signin, Singup, Reason} from './../types';

const Auth = {
  signin: (body: Signin): Promise<string | Reason> => {
    return api.post('/auth/signin', body, false);
  },

  signup: (body: Singup): Promise<UserId | Reason> => {
    return api.post('/auth/signup', body);
  },

  logout: (): Promise<void | Reason> => {
    return api.post('/auth/logout', {}, false);
  },

  user: (): Promise<User | Reason> => {
    return api.get('/auth/user');
  },
};

export {Auth};
