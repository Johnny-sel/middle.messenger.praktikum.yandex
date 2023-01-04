import './Header.sass';

import { div, img, span, button } from '@core/tags';
import { Component } from '@core/component';

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
        this.state.title = 'Sign in';
        break;
      case '/registration':
        this.state.title = 'Registration';
        break;
    }
  }

  create(state) {
    const { title } = state;
    // prettier-ignore
    return (
      div('c=header;', [
        div('c=header__logo logo;', [
          img(`c=logo_image; src=img/logo.png; alt=logo;`),
        ]),
        div('c=header__greet;', [
          span('c=header__greet__title title;', [title]),
        ]),
        div('c=header__links;', [
          button(`c=header__links__profile_button button;`),
        ]),
      ])
    );
  }
}
