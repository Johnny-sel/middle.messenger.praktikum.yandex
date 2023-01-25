import { SingupRequest} from '@api/types';

export type RegisterState = {
  load: boolean;
  error?: string;
  data: SingupRequest;
  target?: HTMLButtonElement;
  event?: InputEvent;
};

