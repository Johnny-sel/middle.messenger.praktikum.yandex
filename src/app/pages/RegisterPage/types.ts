import {SingupRequest} from '@api/types';

export type RegisterState = {
  load: boolean;
  error?: string;
  inputData: SingupRequest;
  target?: HTMLButtonElement;
  event?: InputEvent;
};
