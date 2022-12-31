import { LoginForm } from "@components";
import { Component } from "@framework";
import { IRouterDom } from "@framework/types";

class LoginPage extends Component {
  constructor(routerDom: IRouterDom) {
    super(routerDom);
    this.state = { count: 0 };
  }

  handler() {
    this.routerDom.navigateTo("/")
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
