import './Header.sass';

import { div, img, span, button, header } from '@core/tags';
import { Component } from '@core/component';
import { Router } from '@core/router';

export default class Header extends Component {
  constructor() {
    super();
  }

  createState() {
    return {
      title: 'Welcome',
    };
  }

  didMount() {
    switch (window.location.pathname) {
      case '/':
        this.state.title = 'Sign in to chat';
        break;
      case '/registration':
        this.state.title = 'Registration';
        break;
      case '/profile':
        this.state.title = 'Profile';
        break;
      case '/profile/edit':
        this.state.title = 'Change profile';
        break;
      case '/password/edit':
        this.state.title = 'Change password';
        break;
      case '/error-404':
        this.state.title = 'ERROR';
        break;
      case '/error-500':
        this.state.title = 'THE SITE IS TEMPORARILY DOWN';
        break;
    }
  }

  goToProfilePage() {
    Router.navigateTo('/profile');
  }

  goToMainPage() {
    Router.navigateTo('/');
  }

  create(state) {
    const { title } = state;
    const goToProfilePage = this.goToProfilePage.bind(this);
    const goToMainPage = this.goToMainPage.bind(this);

    // prettier-ignore
    return (
      header('c=header;', [
        div('c=header__logo logo;', [
          img(`c=logo_image; src=/img/logo.png; alt=logo;`, [], {
            click: goToMainPage
          }),
        ]),
        div('c=header__greet;', [
          span('c=header__greet__title title;', [title]),
        ]),
        div('c=header__links;', [
          button(`c=header__links__profile_button; n=profile`, [], {
            click: goToProfilePage
          }),
        ]),
      ])
    );
  }
}
