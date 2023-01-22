import {api} from '..';
import {GetUserResponse, UpdateProfileRequest, UpdatePasswordRequest} from '@api/types';

const User = {
  updateProfile: (body: UpdateProfileRequest): Promise<string> => {
    return api.put('/user/profile', body);
  },
  updatePassword: (body: UpdatePasswordRequest): Promise<string> => {
    return api.put('/user/password', body);
  },
  updatePhoto: (body: FormData): Promise<GetUserResponse> => {
    return api.put('/user/profile/avatar', body);
  },
};

export {User};
