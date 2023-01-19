import {UpdateProfile} from '@api/types';
import {name} from '@app/const';
import {EditProfileState} from './types';

const {email, login, displayName, firstName, phone, secondName} = name;

const editProfileState: EditProfileState = {
  load: false,
  error: '',
  user: undefined,
  data: {
    [email]: '',
    [login]: '',
    [firstName]: '',
    [secondName]: '',
    [displayName]: '',
    [phone]: '',
  } as UpdateProfile,
};

export {editProfileState};
