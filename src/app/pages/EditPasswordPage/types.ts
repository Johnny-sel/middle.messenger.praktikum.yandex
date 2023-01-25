import {UpdatePasswordRequest} from '@api/types';

export type EditPasswordState = {
  load: boolean;
  error?: string;
  data: UpdatePasswordRequest;
  target?: HTMLButtonElement;
  event?: InputEvent;
};
