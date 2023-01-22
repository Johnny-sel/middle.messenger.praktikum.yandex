import {main, component, span} from '@core/tags';
import {Component} from '@core/component';
import {Layout} from '@app/components';

type ErrorState = {errorType: string; errorText: string};
type ErrorProps = {errorType: string; errorText: string};

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
