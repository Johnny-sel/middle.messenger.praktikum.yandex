import {api} from '../..';
import {User, UserId, Signin, Singup} from '@api/types';

const Auth = {
  signin: (body: Signin): Promise<string> => {
    return api.post('/auth/signin', body);
  },
  signup: (body: Singup): Promise<UserId> => {
    return api.post('/auth/signup', body);
  },
  logout: (): Promise<void> => {
    return api.post('/auth/logout');
  },
  user: (): Promise<User> => {
    return api.get('/auth/user');
  },
};

export {Auth};
