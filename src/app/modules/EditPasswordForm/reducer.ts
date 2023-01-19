import {User} from '@api/repositories';
import {location, error} from '@app/const';
import {onChange} from '@app/functions';
import {validateForm} from '@app/utils';
import {Component} from '@core/component';
import {Router} from '@core/router';
import {Reason} from '@api/types';
import {CHANGE_INPUT_ACTION, UPDATE_PASSWORD_ACTION} from '@app/actions';
import {EditPasswordState} from './types';

function handleError(err: Reason) {
  const {state} = this as Component<EditPasswordState>;
  if (err.reason === error.cookie) return;
  state.error = err.reason ?? error.auth;
}

async function dispatch(type: string) {
  const {state} = this as Component<EditPasswordState>;
  try {
    switch (type) {
      case CHANGE_INPUT_ACTION: {
        onChange.call(this, this.state.event);
        break;
      }

      case UPDATE_PASSWORD_ACTION: {
        state.load = true;
        if (!validateForm(state.target!.form!)) return;

        await User.updatePassword(state.data);
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
