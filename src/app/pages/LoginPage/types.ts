import {InputData} from '@app/types';

export type LoginState = {
  load: boolean;
  error?: string;
  inputData: InputData;
  target?: HTMLButtonElement;
  event?: InputEvent;
};
