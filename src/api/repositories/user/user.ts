import {api} from '../..';
import {User, UpdateProfile} from '../../types';

const User = {
  updateProfile: (body: UpdateProfile): Promise<string> => {
    return api.put('/user/profile', body);
  },
};

export {User};
