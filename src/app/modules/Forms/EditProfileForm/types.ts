import {UpdateProfileRequest, GetUserResponse} from '@api/types';

export type EditProfileState = {
  load: boolean;
  error?: string;
  user?: GetUserResponse;
  data: UpdateProfileRequest;
  target?: HTMLButtonElement;
  event?: InputEvent;
};
