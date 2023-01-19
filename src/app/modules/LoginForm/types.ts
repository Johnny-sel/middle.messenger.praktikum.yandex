import {Signin} from '@api/types';

export type LoginState = {
  load: boolean;
  error?: string;
  data: Signin;
  target?: HTMLButtonElement;
  event?: InputEvent;
};
