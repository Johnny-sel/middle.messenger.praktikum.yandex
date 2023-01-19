import {EditProfileState} from './types';
import {Auth, User} from '@api/repositories';
import {location, error} from '@app/const';
import {onChange} from '../../functions/onChange';
import {validateForm} from '../../utils/validateForm';
import {Component} from '@core/component';
import {Router} from '@core/router';
import {Reason, UpdateProfile} from '@api/types';
import {CHANGE_INPUT_ACTION,  GET_USER_ACTION,  UPDATE_USER_ACTION} from '@app/actions';

function handleError(err: Reason) {
  const {state} = this as Component<EditProfileState>;
  if (err.reason === error.cookie) return;
  state.error = err.reason ?? error.auth;
}

async function dispatch(type: string) {
  const {state} = this as Component<EditProfileState>;
  try {
    switch (type) {
      case CHANGE_INPUT_ACTION: {
        onChange.call(this, this.state.event);
        break;
      }

      case GET_USER_ACTION: {
        state.load = true;
        state.user = await Auth.user();
        for (const prop in state.data) {
          if (Object.prototype.hasOwnProperty.call(state.data, prop)) {
            (state.data as any)[prop] = (state.user as any)[prop] ?? '';
          }
        }
        break;
      }

      case UPDATE_USER_ACTION: {
        state.load = true;
        if (!validateForm(state.target!.form!)) return;

        await User.updateProfile(state.data);
        Router.to(location.profile);

        break;
      }
    }
  } catch (error) {
    handleError.call(this, error);
  } finally {
    state.load = false;
  }
}

export {dispatch};
