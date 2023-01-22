// core
import {Component} from '@core/component';
import {Router} from '@core/router';
// api
import {Auth} from '@api/repositories';
import {ReasonResponse} from '@api/types';
// app
import {location, error} from '@app/constants';
import {onChange} from '@app/functions';
import {validateForm} from '@app/utils';
import {CHANGE_INPUT, CREATE_USER} from '@app/actions';
import {comparePasswords} from '@app/utils';
// local
import {RegisterState} from './types';

function handleError(err: ReasonResponse) {
  const {state} = this as Component<RegisterState,{}>;
  if (err.reason === error.cookie) return;
  state.error = err.reason ?? error.auth;
}

async function dispatch(type: string) {
  const {state} = this as Component<RegisterState, {}>;
  const form = state.target?.form;

  try {
    switch (type) {
      case CHANGE_INPUT: {
        onChange.call(this, state.event);
        break;
      }

      case CREATE_USER: {
        state.load = true;

        if (!validateForm(form!)) return;
        if (!comparePasswords(state.data)) throw 'Passwords not match';

        await Auth.signup(state.data);
        Router.to(location.chats);
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
