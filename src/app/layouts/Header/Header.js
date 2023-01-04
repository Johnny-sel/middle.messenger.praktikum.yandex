import './Header.sass';

import { div, img, span,button } from '@core/tags';
import { Component } from '@core/component';

export default class Header extends Component {
  constructor() {
    super();
  }

  create(state) {
    // prettier-ignore
    return (
      div('c=header;', [
        div('c=header__logo logo;', [
          img(`c=logo_image; src=img/logo.png; alt=logo;`),
        ]),
        div('c=header__greet;', [
          span('c=header__greet__title title;', ["Welcom to messenger"]),
        ]),
        div('c=header__links;', [
          button(`c=header__links__profile_button button;`),
        ]),
      ])
    );
  }
}
