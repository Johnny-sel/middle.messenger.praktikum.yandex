import './Layout.sass';

import { div, component } from '@core/tags';
import { isFunc } from '@core/utils';
import { Component } from '@core/component';
import { Header, Footer } from '@app/layouts';

export default class Layout extends Component {
  constructor() {
    super();
  }

  create(state, props) {
    const { children } = props;

    // prettier-ignore
    return (
      div(`c=layout;`, [
        component(Header),
        ...children.map((child, index) => isFunc(child) ? component(child) : child),
        component(Footer)
      ])
    );
  }
}
