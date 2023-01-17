import {Auth} from '@api/repositories';
import {Signin} from '@api/types';
import {name, location, error} from '@app/const';
import {Router} from '@core/router';
import {onChange} from '../utils/onChange';
import {validateForm} from '../utils/validateForm';

type InitialState = {
  load: boolean;
  error: string;
  data: Signin;
  target?: HTMLElement;
  event?: InputEvent;
};

const initialState: InitialState = {
  load: false,
  error: '',
  data: {[name.login]: '', [name.password]: ''} as Signin,
};

const handleError = (state: typeof initialState, err: any) => {
  if (err.reason === error.cookie) return;
  state.error = err.reason ?? error.auth;
};

const dispatch = async function (type: string) {
  try {
    switch (type) {
      case 'CHANGE_INPUT': {
        onChange.call(this, this.state.event);
        break;
      }

      case 'GET_USER': {
        this.state.load = true;
        await Auth.user();
        Router.to(location.chats);
        break;
      }

      case 'LOGIN_USER': {
        this.state.load = true;

        const isValid = validateForm((this.state.target as any).form);
        if (!isValid) return;

        await Auth.signin(this.state.data);
        Router.to(location.chats);
        break;
      }
    }
  } catch (error) {
    handleError(this.state, error);
  } finally {
    this.state.load = false;
  }
};

export {initialState, dispatch};
