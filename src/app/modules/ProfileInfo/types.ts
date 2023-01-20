import {UserResponse} from '@api/types';

export type ProfileState = {
  load: boolean;
  error?: string;
  items: Item[];
  user?: UserResponse;
  target?: HTMLInputElement;
};

export type Item = {
  name: string;
  value: string;
};
