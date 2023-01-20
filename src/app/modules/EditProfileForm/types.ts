import {UpdateProfileRequest, UserResponse} from '@api/types';

export type EditProfileState = {
  load: boolean;
  error?: string;
  user?: UserResponse;
  data: UpdateProfileRequest;
  target?: HTMLButtonElement;
  event?: InputEvent;
};
