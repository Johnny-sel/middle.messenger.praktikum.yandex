import {UserResponse} from '@api/repositories';
import {location, error} from '@app/const';
import {onChange} from '@app/functions';
import {validateForm} from '@app/utils';
import {Component} from '@core/component';
import {Router} from '@core/router';
import {ReasonResponse} from '@api/types';
import {CHANGE_INPUT, UPDATE_PASSWORD} from '@app/actions';
import {EditPasswordState} from './types';

function handleError(err: ReasonResponse) {
  const {state} = this as Component<EditPasswordState>;
  if (err.reason === error.cookie) return;
  state.error = err.reason ?? error.auth;
}

async function dispatch(type: string) {
  const {state} = this as Component<EditPasswordState>;
  try {
    switch (type) {
      case CHANGE_INPUT: {
        onChange.call(this, this.state.event);
        break;
      }

      case UPDATE_PASSWORD: {
        state.load = true;
        if (!validateForm(state.target!.form!)) return;

        await UserResponse.updatePassword(state.data);
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
