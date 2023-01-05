import { main, component, span } from '@core/tags';
import { Component } from '@core/component';
import { Layout } from '@app/components';

export default class ErrorPage extends Component {
  constructor() {
    super();
  }

  createState() {
    return {
      errorType: '404',
      errorText: 'There is no such page',
    };
  }

  create(state, props) {
    // prettier-ignore
    return (
      component(Layout, { children: [
        main('c=error_page',[
          span([props?.errorType ?? state.errorType]),
          span([props?.errorText ?? state.errorText]),
        ])
      ] })
    );
  }
}
