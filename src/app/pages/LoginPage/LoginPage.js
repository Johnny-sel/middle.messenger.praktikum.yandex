import { component } from '@core/tags';
import { Component } from '@core/component';
import { LoginForm } from '@modules';
import { Layout, Header, Footer } from '@layouts';

export default class LoginPage extends Component {
  constructor() {
    super();
  }

  create() {
    // prettier-ignore
    return component(Layout, { children: [LoginForm] })
  }
}
