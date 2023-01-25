import {UpdatePasswordRequest} from '@api/types';

export type EditPasswordState = {
  load: boolean;
  error?: string;
  inputData: UpdatePasswordRequest;
  target?: HTMLButtonElement;
  event?: InputEvent;
};
