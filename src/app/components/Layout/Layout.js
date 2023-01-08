import './Layout.sass';

import { div, main, component } from '@core/tags';
import { Component } from '@core/component';
import { Header, Footer } from '@app/components';

export default class Layout extends Component {
  constructor() {
    super();
  }

  create(state, props) {
    const { children } = props;

    // prettier-ignore
    return (
      div('c=layout;', [
        component(Header),
        main('c=main;', [
          ...children.map(child => child),
        ]),
        
        component(Footer)
      ])
    );
  }
}
