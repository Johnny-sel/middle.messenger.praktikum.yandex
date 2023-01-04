import { component } from '@core/tags';
import { Component } from '@core/component';
import { RegisterForm } from '@modules';
import { Layout } from '@layouts';

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
