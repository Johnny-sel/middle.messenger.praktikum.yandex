import {GetUserResponse} from '@api/types';

export type ProfileState = {
  load: boolean;
  error?: string;
  items: Item[];
  user?: GetUserResponse;
  target?: HTMLInputElement;
};

export type Item = {
  name: string;
  value: string;
};
