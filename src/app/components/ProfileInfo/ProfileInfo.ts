import './ProfileInfo.sass';
// core
import {section, div, component, a, span} from '@core/tags';
import {Component} from '@core/component';
import {Router} from '@core/router';
// app
import {ProfilePhoto, InfoLine} from '@app/components';
import {location} from '@app/const';
import {initialState} from './initialState';
// api
import {Auth} from '@api/repositories';
import {Reason} from '@api/types';

type Item = {name: string; value: string};

const {root, profileEdit, passwordEdit} = location;

export default class ProfileInfo extends Component<typeof initialState> {
  constructor() {
    super();
  }

  createState() {
    return initialState;
  }

  goToChangeData() {
    Router.to(profileEdit);
  }

  goToChangePassword() {
    Router.to(passwordEdit);
  }

  async onLogout() {
    this.state.load = true;
    this.state.error = undefined;

    try {
      const res = await Auth.logout();
      if ((res as Reason)?.reason) throw (res as Reason).reason;

      Router.to(root);
    } catch (error) {
      this.state.error = error;
    } finally {
      this.state.load = false;
    }
  }

  create(state: typeof initialState) {
    const {profileName, items, error, load} = state;

    const goToChangeData = this.goToChangeData.bind(this);
    const goToChangePassword = this.goToChangePassword.bind(this);
    const onLogout = this.onLogout.bind(this);

    // prettier-ignore
    return (
      section('c=profile__info section;', [
        component(ProfilePhoto, {profileName}),
        ...items.map((item: Item) => {
          return component(InfoLine, {name: item.name, value: item.value});
        }),
        div('c=profile__info__group_link;', [
          a('c=profile__info__group_link__link link;',
              ['Change account'], {click: goToChangeData},
          ),
          a('c=profile__info__group_link__link link;',
              ['Change password'], {click: goToChangePassword},
          ),
          a('c=profile__info__group_link__link link;',
              [load? 'Wait...' : 'Logout'], {click: onLogout},
          ),
          span(`c=${error? 'error':'hidden'};`, [error ?? '']),
        ]),
      ])
    );
  }
}
