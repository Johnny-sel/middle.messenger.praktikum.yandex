import {UpdateProfile, User} from '@api/types';

export type EditProfileState = {
  load: boolean;
  error?: string;
  user?: User;
  data: UpdateProfile;
  target?: HTMLButtonElement;
  event?: InputEvent;
};
