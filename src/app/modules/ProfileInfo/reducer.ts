import {UPLOAD_PHOTO} from './../../actions/index';
import {ReasonResponse} from '@api/types';
import {error, location} from '@app/const';
import {Item, ProfileState} from './types';
import {Component} from '@core/component';
import {Auth, UserResponse} from '@api/repositories';
import {Router} from '@core/router';
import {GET_USER, LOGOUT_USER} from '@app/actions';

function handleError(err: ReasonResponse) {
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
      case LOGOUT_USER: {
        await Auth.logout();
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
        state.user = await UserResponse.updatePhoto(formData);
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
