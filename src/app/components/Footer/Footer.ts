import './Footer.sass';
import footerlogo from '@app/img/footer-logo.png';

import { footer, img, span } from '@core/tags';
import { Component } from '@core/component';

export default class Footer extends Component {
  constructor() {
    super();
  }

  create() {
    // prettier-ignore
    return (
      footer('c=footer;', [
        span('c=footer__copyright text;', ["© Copyright"]),
        span('c=footer__title title;', [". . ."]),
        img(`c=footer__logo logo; src=${footerlogo}; alt=logo;`),
      ])
    );
  }
}
