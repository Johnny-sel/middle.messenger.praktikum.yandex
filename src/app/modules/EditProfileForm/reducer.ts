import {EditProfileState} from './types';
import {Auth, User} from '@api/repositories';
import {location, error} from '@app/const';
import {onChange} from '@app/functions';
import {validateForm} from '@app/utils';
import {Component} from '@core/component';
import {Router} from '@core/router';
import {ReasonResponse} from '@api/types';
import {CHANGE_INPUT, GET_USER, UPDATE_USER} from '@app/actions';

function handleError(err: ReasonResponse) {
  const {state} = this as Component<EditProfileState>;
  if (err.reason === error.cookie) return;
  state.error = err.reason ?? error.auth;
}

async function dispatch(type: string) {
  const {state} = this as Component<EditProfileState>;
  const form = state.target?.form;

  try {
    switch (type) {
      case CHANGE_INPUT: {
        onChange.call(this, state.event);
        break;
      }

      case GET_USER: {
        state.load = true;
        state.user = await Auth.user();

        for (const prop in state.data) {
          if (!state.data.hasOwnProperty(prop)) continue;
          (state.data as any)[prop] = (state.user as any)[prop] ?? '';
        }

        break;
      }

      case UPDATE_USER: {
        state.load = true;
        if (!validateForm(form!)) return;

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
