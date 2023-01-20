import {LoginState} from './types';
import {Auth} from '@api/repositories';
import {location, error} from '@app/const';
import {onChange} from '@app/functions';
import {validateForm} from '@app/utils';
import {Component} from '@core/component';
import {Router} from '@core/router';
import {Reason} from '@api/types';
import {CHANGE_INPUT, GET_USER, LOGIN_USER} from '@app/actions';

function handleError(err: Reason) {
  const {state} = this as Component<LoginState>;
  if (err.reason === error.cookie) return;
  state.error = err.reason ?? error.auth;
}

async function dispatch(type: string) {
  const {state} = this as Component<LoginState>;
  try {
    switch (type) {
      case CHANGE_INPUT: {
        onChange.call(this, this.state.event);
        break;
      }

      case GET_USER: {
        state.load = true;
        await Auth.user();
        Router.to(location.chats);
        break;
      }

      case LOGIN_USER: {
        state.load = true;
        if (!validateForm(state.target!.form!)) return;

        await Auth.signin(state.data);
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
