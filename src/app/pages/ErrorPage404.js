import { main, component, span } from '@core/tags';
import { Component } from '@core/component';
import { Layout } from '@app/components';

export default class ErrorPage404 extends Component {
  constructor() {
    super();
  }

  create(state, props) {
    // prettier-ignore
    return (
      component(Layout, { children: [
        main('c=error_page',[
          span(['404']),
          span(['There is no such page']),
        ])
      ] })
    );
  }
}
