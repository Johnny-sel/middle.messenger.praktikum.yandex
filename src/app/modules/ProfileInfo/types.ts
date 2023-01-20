import {User} from '@api/types';

export type ProfileState = {
  load: boolean;
  error?: string;
  items: Item[];
  user?: User;
  target?: HTMLInputElement;
};

export type Item = {
  name: string;
  value: string;
};
