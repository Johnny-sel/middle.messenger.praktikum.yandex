import {SigninRequest} from '@api/types';

export type LoginState = {
  load: boolean;
  error?: string;
  inputData: SigninRequest;
  target?: HTMLButtonElement;
  event?: InputEvent;
};
