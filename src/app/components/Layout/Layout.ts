import './Layout.sass';

import {div, main, component} from '@core/tags';
import {Component} from '@core/component';
import {Header, Footer} from '@app/components';
import {VirtualNode} from '@core/types';

type LayoutProps = {
  children: VirtualNode[];
  title?: string
};

export default class Layout extends Component<{}, LayoutProps> {
  constructor() {
    super();
  }

  create() {
    const {children, title} = this.props;

    // prettier-ignore
    return (
      div('c=layout;', [
        component(Header, {title}),
        main('c=main;', [
          ...children,
        ]),
        component(Footer),
      ])
    );
  }
}
