import {name} from '@app/constants';

export const messageListState = {
  loadAddUser: false,
  statusAddUser: '',
  error: '',
  allUser: [],
  chatUsers: [],
  addUserTab: true,
  deleteUserTab: false,
  inputData: {[name.login]: ''},
};
