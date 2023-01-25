import {UpdateProfileRequest, GetUserResponse} from '@api/types';

export type EditProfileState = {
  load: boolean;
  error?: string;
  user?: GetUserResponse;
  inputData: UpdateProfileRequest;
  target?: HTMLButtonElement;
  event?: InputEvent;
};
