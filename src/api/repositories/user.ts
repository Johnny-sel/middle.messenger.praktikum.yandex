import {api} from '..';
import {UserResponse, UpdateProfileRequest, UpdatePasswordRequest} from '@api/types';

const User = {
  updateProfile: (body: UpdateProfileRequest): Promise<string> => {
    return api.put('/user/profile', body);
  },
  updatePassword: (body: UpdatePasswordRequest): Promise<string> => {
    return api.put('/user/password', body);
  },
  updatePhoto: (body: FormData): Promise<UserResponse> => {
    return api.put('/user/profile/avatar', body);
  },
};

export {User};
