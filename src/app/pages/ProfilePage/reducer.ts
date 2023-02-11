import {ReasonResponse} from '@api/types';
import {Auth, User} from '@api/repositories';
// core
import {Component} from '@core/component';
import {Router} from '@core/router';
// app
import {error, location} from '@app/constants';
import {GET_USER, LOGOUT_USER, UPLOAD_PHOTO} from '@app/actions';
// local
import {Item, ProfileState} from './types';

function handleError(err: ReasonResponse) {
  const {state} = this as Component<ProfileState, {}>;

  state.error = err.reason ?? error.server;
  state.error === error.cookie ? Router.to(location.root) : Router.to(location.profile);
}

async function dispatch(type: string) {
  const {state} = this as Component<ProfileState, {}>;

  state.load = true;
  state.error = undefined;

  try {
    switch (type) {
      case LOGOUT_USER: {
        await Auth.logout();
        localStorage.removeItem('user')
        Router.to(location.root);
        break;
      }

      case GET_USER: {
        state.user = await Auth.user();
        state.items = Object.entries(state.user!)
          .map(([name, value]) => ({name, value} as Item))
          .filter((e) => e.value !== null && e.name !== 'avatar');
        break;
      }

      case UPLOAD_PHOTO: {
        const formData = new FormData();
        const image = state.target!.files?.item(0);

        if (!image) return;

        formData.append('avatar', image);

        state.user = await User.updatePhoto(formData);
        state.items = Object.entries(state.user!)
          .map(([name, value]) => ({name, value} as Item))
          .filter((e) => e.value !== null && e.name !== 'avatar');
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
