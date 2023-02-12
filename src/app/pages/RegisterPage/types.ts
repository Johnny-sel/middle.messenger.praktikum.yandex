import {InputData} from '@app/types';

export type RegisterState = {
  load: boolean;
  error?: string;
  inputData: InputData;
  target?: HTMLButtonElement;
  event?: InputEvent;
};
