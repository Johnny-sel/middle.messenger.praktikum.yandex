import { component } from '@core/tags';
import { Component } from '@core/component';
import { RegisterForm, Layout } from '@app/components';
``
export default class RegisterPage extends Component {
  constructor() {
    super();
  }

  createState() {
    return {};
  }

  didMount() {}

  create() {
    // prettier-ignore
    return (
      component(Layout, { children: [
        RegisterForm
      ] })
    )
  }
}
