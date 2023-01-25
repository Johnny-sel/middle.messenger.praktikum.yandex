import {User} from '@api/repositories';
import {location, error} from '@app/constants';
import {onChange} from '@app/functions';
import {validateForm} from '@app/utils';
import {Component} from '@core/component';
import {Router} from '@core/router';
import {ReasonResponse} from '@api/types';
import {CHANGE_INPUT, UPDATE_PASSWORD} from '@app/actions';
import {EditPasswordState} from './types';

function handleError(err: ReasonResponse) {
  const {state} = this as Component<EditPasswordState, {}>;
  if (err.reason === error.cookie) return;
  state.error = err.reason ?? error.auth;
}

async function dispatch(type: string) {
  const {state} = this as Component<EditPasswordState, {}>;
  const form = state.target?.form;

  try {
    switch (type) {
      case CHANGE_INPUT: {
        onChange.call(this, state.event);
        break;
      }

      case UPDATE_PASSWORD: {
        state.load = true;
        if (!validateForm(form!)) return;

        await User.updatePassword(state.inputData);
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
