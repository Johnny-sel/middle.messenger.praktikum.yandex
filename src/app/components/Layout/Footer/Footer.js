import './Footer.sass';

import { footer, img, span } from '@core/tags';
import { Component } from '@core/component';

export default class Footer extends Component {
  constructor() {
    super();
  }

  create(state) {
    // prettier-ignore
    return (
      footer('c=footer;', [
        span('c=footer__copyright text;', ["© Copyright"]),
        span('c=footer__title title;', [". . ."]),
        img(`c=footer__logo logo; src=/img/footer-logo.png; alt=logo;`),
      ])
    );
  }
}
