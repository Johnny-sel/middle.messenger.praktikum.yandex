import { GetUserResponse} from '@api/types';
import { InputData } from '@app/types';

export type EditProfileState = {
  load: boolean;
  error?: string;
  user?: GetUserResponse;
  inputData: InputData;
  target?: HTMLButtonElement;
  event?: InputEvent;
};
