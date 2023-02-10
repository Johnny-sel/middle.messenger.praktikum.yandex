import {GetUserResponse} from '@api/types';

export const userStore: UserStore = {
  user: undefined,
};

type UserStore = {
  user: GetUserResponse | undefined;
};
