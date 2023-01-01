import { IRouterDom } from '@framework/types';
import { Component } from "@framework";

class LoginForm extends Component {
  constructor(router: IRouterDom, props: any) {
    super(router, props);
    this.state = { count: 0 };
  }

  navToMain() {
    this.routerDom.navigateTo("/");
  }

  increment(): void {
    this.setState({ count: this.state.count + 1 });
  }

  componentDidMount(): void {
    console.log(`${this.props} init`)
  }

  render() {
    return `
      <main id="login__form" style="padding: 20px">
        <div class="login__form__title">
          <h2>Sign in</h2>
        </div>
        <input class="login__form__input input" name="login" type="email" placeholder="Email Address">
        <input class="login__form__input input" name="password" type="password" placeholder="Passwrod">
        <button class="login__form__registration-link">Create account</button>
        <button class="login__form__button-submit">Login</button>
        
        <br>
        <h1 link=1221321> ${this.props} </h1>
        <h3> {{count}} </h3>
        <button onclick="navToMain()" class="login__form__button-submit">GO TO HOME</button>
        <button onclick="increment()" class="login__form__button-submit">COUNT +</button>
      </main>
    `;
  }
}

export default LoginForm;
