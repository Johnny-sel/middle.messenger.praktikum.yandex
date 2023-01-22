import {component} from '@core/tags';
import {Component} from '@core/component';
import {Layout} from '@app/components';
import {RegisterForm} from '@app/modules';

export default class RegisterPage extends Component<{}, {}> {
  constructor() {
    super();
  }

  create() {
    // prettier-ignore
    return (
      component(Layout, {children: [
        component(RegisterForm),
      ]})
    );
  }
}
