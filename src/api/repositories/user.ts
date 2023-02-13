import {api} from '..';
import {GetUserResponse, UpdateProfileRequest} from '@api/types';
import {UpdatePasswordRequest, SearchUserRequest} from '@api/types';

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
  searchUser: (body: SearchUserRequest): Promise<GetUserResponse[]> => {
    return api.post('/user/search', body);
  },
};

export {User};
