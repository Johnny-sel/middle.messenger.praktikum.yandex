import { Singup} from '@api/types';

export type RegisterState = {
  load: boolean;
  error?: string;
  data: Singup;
  target?: HTMLButtonElement;
  event?: InputEvent;
};

