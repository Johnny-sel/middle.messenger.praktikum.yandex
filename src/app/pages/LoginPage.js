import { component } from '@core/tags';
import { Component } from '@core/component';
import { LoginForm } from '@app/modules';
import { Layout } from '@app/layouts';

export default class LoginPage extends Component {
  constructor() {
    super();
  }

  create() {
    // prettier-ignore
    return (
      component(Layout, { children: [
        LoginForm
      ] })
    )
  }
}
