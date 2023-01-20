import './ProfileInfo.sass';
// core
import {section, div, component, a, span} from '@core/tags';
import {Component} from '@core/component';
import {Router} from '@core/router';
// app
import {GET_USER, LOGOUT_USER} from '@app/actions';
import {ProfilePhoto, InfoLine} from '@app/components';
import {location} from '@app/const';
// local
import {dispatch} from './reducer';
import {Item, ProfileState} from './types';
import {profileState} from './state';

export default class ProfileInfo extends Component<ProfileState> {
  constructor() {
    super();
  }

  createState() {
    return profileState;
  }

  logout(): void {
    dispatch.call(this, LOGOUT_USER);
  }

  didMount(): void {
    dispatch.call(this, GET_USER);
  }

  create() {
    const {user, items, error, load} = this.state;
    const logout = this.logout.bind(this);

    // prettier-ignore
    return (
      section('c=profile__info section;', [
        component(ProfilePhoto, {
          profileName: user? `${user?.first_name} ${user?.second_name}` : 'Loading...',
          photoUrl: user?.avatar,
        }),
        ...items.map((item: Item) => {
          return component(InfoLine, {name: item.name, value: item.value});
        }),
        div('c=profile__info__group_link;', [
          a('c=profile__info__group_link__link link;', ['Change account'], 
            {click: ()=> Router.to(location.profileEdit)},
          ),
          a('c=profile__info__group_link__link link;', ['Change password'], 
            {click: ()=> Router.to(location.passwordEdit)},
          ),
          a('c=profile__info__group_link__link link;', [load? 'Wait...' : 'Logout'], 
            {click: logout},
          ),
          span(`c=${error? 'error':'hidden'};`, [error ?? '']),
        ]),
      ])
    );
  }
}
