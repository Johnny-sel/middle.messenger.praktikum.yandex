import {UpdatePassword} from '@api/types';
import {name} from '@app/const';
import {EditPasswordState} from './types';

const {oldPassword, newPassword} = name;

const editPasswordState: EditPasswordState = {
  load: false,
  error: '',
  data: {
    [oldPassword]: '',
    [newPassword]: '',
  } as UpdatePassword,
};

export {editPasswordState};
