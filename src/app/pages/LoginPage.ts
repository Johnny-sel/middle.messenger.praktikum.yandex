import {component} from '@core/tags';
import {Component} from '@core/component';
import {LoginForm, Layout} from '@app/components';

export default class LoginPage extends Component<{}> {
  constructor() {
    super();
  }

  create() {
    // prettier-ignore
    return (
      component(Layout, {children: [
        component(LoginForm),
      ]})
    );
  }
}
