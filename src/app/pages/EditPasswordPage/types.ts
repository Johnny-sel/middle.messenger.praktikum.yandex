import {InputData} from '@app/types';

export type EditPasswordState = {
  load: boolean;
  error?: string;
  inputData: InputData;
  target?: HTMLButtonElement;
  event?: InputEvent;
};
