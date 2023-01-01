import { LoginForm } from "@components";
import { Component } from "@framework";
import { IRouterDom } from "@framework/types";

class LoginPage extends Component {
  constructor(routerDom: IRouterDom) {
    super(routerDom);
    this.state = { count: 0, number: 1, userName: 'Evgeny' };
  }

  handler() {
    this.routerDom.navigateTo("/")
  }


  componentDidMount(): void {
    console.log('LoginPage init');
  }

  increment(): void {
    this.setState({
      count: this.state.count + 1,
      number: 2,
      userName: 'Natalya' 
    });
  }

  render() {
    const loginForm1 = new LoginForm(this.routerDom, "loginForm1").init();
    const loginForm2 = new LoginForm(this.routerDom, "loginForm2").init();

    return `
        <button onclick="increment()" class="login__form__button-submit">COUNT +</button>
        <h3> {{count}} </h3>
        <h3> {{number}} </h3>
        <h3> {{userName}} </h3>
        <div style="height: 60px"></div>
        ${loginForm1}
        <div style="height: 60px"></div>
        ${loginForm2}
    `;
  }
}

export default LoginPage;
