import {name} from '@app/constants';
import {MessageListState} from './types';

export const messageListState: MessageListState = {
  loadAddUser: false,
  timeoutId: undefined,
  statusAddUser: '',
  error: '',
  allUser: [],
  chatUsers: [],
  addUserTab: true,
  deleteUserTab: false,
  inputData: {[name.login]: ''},
};
