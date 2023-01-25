import {main, component, span} from '@core/tags';
import {Component} from '@core/component';
import {Layout} from '@app/components';
import {ErrorProps, ErrorState} from './types';
import {title} from '@app/constants';

export default class ErrorPage extends Component<ErrorState, ErrorProps> {
  constructor() {
    super();
  }

  createState() {
    return {
      errorType: '404',
      errorText: 'There is no such page',
    };
  }

  create() {
    // prettier-ignore
    return (
      component(Layout, {
        title: title.error,
        children: [
          main('c=error-page', [
            span([this.props?.errorType ?? this.state.errorType]),
            span([this.props?.errorText ?? this.state.errorText]),
          ]),
        ],
      })
    );
  }
}
