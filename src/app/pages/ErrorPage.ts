import {main, component, span} from '@core/tags';
import {Component} from '@core/component';
import {Layout} from '@app/components';
import {Props, State} from '@core/types';

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

  create(state: State, props:Props) {
    // prettier-ignore
    return (
      component(Layout, {
        children: [
          main('c=error-page', [
            span([props?.errorType ?? state.errorType]),
            span([props?.errorText ?? state.errorText]),
          ]),
        ],
      })
    );
  }
}
