import './Layout.sass';

import { div, main, component } from '@core/tags';
import { Component } from '@core/component';
import { Header, Footer } from '@app/components';
import { Props, State } from '@core/types';

export default class Layout extends Component {
  constructor() {
    super();
  }

  create(_: State, props: Props) {
    const { children } = props as { children: unknown[] };

    // prettier-ignore
    return (
      div('c=layout;', [
        component(Header),
        main('c=main;', [
          ...children.map((child: unknown) => child),
        ]),

        component(Footer)
      ])
    );
  }
}
