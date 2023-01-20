import {api} from '../..';
import {UserResponse, UserIdResponse, SigninRequest, SingupRequest} from '@api/types';

const Auth = {
  signin: (body: SigninRequest): Promise<string> => {
    return api.post('/auth/signin', body);
  },
  signup: (body: SingupRequest): Promise<UserIdResponse> => {
    return api.post('/auth/signup', body);
  },
  logout: (): Promise<void> => {
    return api.post('/auth/logout');
  },
  user: (): Promise<UserResponse> => {
    return api.get('/auth/user');
  },
};

export {Auth};
