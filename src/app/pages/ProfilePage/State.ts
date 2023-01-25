
import {ProfileState} from './types';

const profileState: ProfileState = {
  load: false,
  error: '',
  user: undefined,
  items: [
    {name: 'id', value: ''},
    {name: 'first_name', value: ''},
    {name: 'second_name', value: ''},
    {name: 'login', value: ''},
    {name: 'email', value: ''},
    {name: 'phone', value: ''},
  ],
};

export {profileState};
