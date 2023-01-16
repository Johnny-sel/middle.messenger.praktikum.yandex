import './Header.sass';
import headerLogo from '@app/img/header-logo.svg';

import {div, img, h1, button, header, nav} from '@core/tags';
import {Component} from '@core/component';
import {Router} from '@core/router';
import {location} from '@app/const';
import {State} from '@core/types';


const {root, error, chats, registration, profile, profileEdit, passwordEdit} = location;

const titles = {
  [root]: 'Sign in chats',
  [error]: 'ERROR',
  [chats]: 'Chats',
  [registration]: 'Registration',
  [profile]: 'Account',
  [profileEdit]: 'Change account',
  [passwordEdit]: 'Change password',
};

export default class Header extends Component {
  constructor() {
    super();
  }

  createState() {
    return {title: 'Welcome'};
  }

  didMount() {
    const path = window.location.pathname;
    this.state.title = titles[path];
  }

  goToProfilePage() {
    Router.to(profile);
  }

  goToMainPage() {
    Router.to(root);
  }

  create(state: State) {
    const goToProfilePage = this.goToProfilePage.bind(this);
    const goToMainPage = this.goToMainPage.bind(this);

    // prettier-ignore
    return (
      header('c=header;', [
        div('c=header__logo logo;', [
          img(`c=logo_image; src=${headerLogo}; alt=logo;`, [], {
            click: goToMainPage,
          }),
        ]),
        div('c=header__greet;', [
          h1('c=header__greet__title title;', [state.title]),
        ]),
        nav('c=header__links;', [
          button(`c=header__links__profile_button; n=profile; t=button`, [], {
            click: goToProfilePage,
          }),
        ]),
      ])
    );
  }
}
