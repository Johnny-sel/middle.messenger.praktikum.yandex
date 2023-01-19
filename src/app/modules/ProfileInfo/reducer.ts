import {Reason} from '@api/types';
import {error, location} from '@app/const';
import {Item, ProfileState} from './types';
import {Component} from '@core/component';
import {Auth} from '@api/repositories';
import {Router} from '@core/router';
import { GET_USER_ACTION, LOGOUT_ACTION } from '@app/actions';

function handleError(err: Reason) {
  const {state} = this as Component<ProfileState>;
  state.error = err.reason ?? error.auth;
  Router.to(location.root);
}

async function dispatch(type: string) {
  const {state} = this as Component<ProfileState>;

  state.load = true;
  state.error = undefined;

  try {
    switch (type) {
      case LOGOUT_ACTION: {
        await Auth.logout();
        Router.to(location.root);
        break;
      }
      
      case GET_USER_ACTION: {
        state.user = await Auth.user();
        state.items = Object.entries(state.user!)
          .map(([name, value]) => ({name, value} as Item))
          .filter((e) => e.value !== null);
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
