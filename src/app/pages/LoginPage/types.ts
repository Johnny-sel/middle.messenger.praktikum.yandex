import {SigninRequest} from '@api/types';

export type LoginState = {
  load: boolean;
  error?: string;
  data: SigninRequest;
  target?: HTMLButtonElement;
  event?: InputEvent;
};
