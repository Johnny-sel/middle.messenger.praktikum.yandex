import {UpdatePasswordRequest} from '@api/types';
import {name} from '@app/constants';
import {EditPasswordState} from './types';

const {oldPassword, newPassword} = name;

const editPasswordState: EditPasswordState = {
  load: false,
  error: '',
  data: {
    [oldPassword]: '',
    [newPassword]: '',
  } as UpdatePasswordRequest,
};

export {editPasswordState};
