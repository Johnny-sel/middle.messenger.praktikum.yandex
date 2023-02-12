import './Layout.sass';

import {div, main, component} from '@core/tags';
import {Component} from '@core/component';
import {Header, Footer} from '@app/components';
import {VirtualNode} from '@core/types';

export default class Layout extends Component<{}, LayoutProps> {
  constructor() {
    super();
  }

  create() {
    const {children, title} = this.props;

    // prettier-ignore
    return (
      div('c=layout;', [
        component.call(this, Header, {title, key: 1}),
        main('c=main;', [...children]),
        component.call(this, Footer, {key: 2}),
      ])
    );
  }
}

type LayoutProps = {
  children: VirtualNode[];
  title?: string;
};
