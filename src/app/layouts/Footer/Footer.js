import './Footer.sass';

import { div, img, span } from '@core/tags';
import { Component } from '@core/component';

export default class Footer extends Component {
  constructor() {
    super();
  }

  create(state) {
    // prettier-ignore
    return (
      div('c=footer;', [
        span('c=footer__copyright text;', ["© Copyright"]),
        span('c=footer__title title;', ["Footer"]),
        img(`c=footer__logo logo; src=img/logo.png; alt=logo;`),
      ])
    );
  }
}
