import {component} from '@core/tags';
import {Component} from '@core/component';
import {Layout} from '@app/components';
import {LoginForm} from '@app/modules';

export default class LoginPage extends Component<{}, {}> {
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
