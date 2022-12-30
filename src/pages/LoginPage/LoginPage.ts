import { IRouterDOM } from './../../libs/framework/types';
import { LoginForm } from "../../components";
import { Component } from "../../libs/framework";

class LoginPage extends Component {
  constructor(routerContext: IRouterDOM) {
    super(routerContext);
    this.state = { count: 0 };
  }

  handler() {
    this.routerContext.navigateTo("/")
  }

  increment() {
    // this.state.count = 10;
  }

  render() {
    const loginForm = new LoginForm().render();

    // const { count } = this.state;

    return `
      <div>
        ${loginForm}
        <h1>${0}</h1>
        <button onclick="handler()" class="login__form__button-submit">GO TO HOME</button>
        <button onclick="increment()" class="login__form__button-submit">COUNT +</button>
      </div>
    `;
  }
}

export default LoginPage;
