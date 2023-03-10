import './Header.sass';
import headerLogo from '@app/img/header-logo.svg';

import {div, img, h1, button, header, nav} from '@core/tags';
import {Component} from '@core/component';
import {Router} from '@core/router';
import {location} from '@app/constants';

const {root, profile} = location;

type HeaderProps = {title: string};
type HeaderState = {title: string};

export default class Header extends Component<HeaderState, HeaderProps> {
  constructor() {
    super();
  }

  createState() {
    return {title: 'Welcome'};
  }

  goToProfilePage() {
    Router.to(profile);
  }

  goToMainPage() {
    Router.to(root);
  }

  create() {
    const goToProfilePage = this.goToProfilePage.bind(this);
    const goToMainPage = this.goToMainPage.bind(this);

    // prettier-ignore
    return (
      header('c=header;', [
        div('c=header__logo logo;', [
          img(`c=logo_image; src=${headerLogo}; alt=logo;`, {
            click: goToMainPage,
          }),
        ]),
        div('c=header__greet;', [
          h1('c=header__greet__title title;', [this.props?.title ?? this.state.title]),
        ]),
        nav('c=header__links;', [
          this.props?.title === 'Account' ?
            button(`c=header__links__home_button; n=profile; t=button`, {
              click: goToMainPage,
            }):
            button(`c=header__links__profile_button; n=home; t=button`, {
              click: goToProfilePage,
            }),
        ]),
      ])
    );
  }
}
