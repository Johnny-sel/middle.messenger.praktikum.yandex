import {UpdatePassword} from '@api/types';

export type EditPasswordState = {
  load: boolean;
  error?: string;
  data: UpdatePassword;
  target?: HTMLButtonElement;
  event?: InputEvent;
};
