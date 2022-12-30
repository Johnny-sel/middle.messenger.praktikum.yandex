import { IRouterDOM } from './../../libs/framework/types';
import { Component } from "../../libs/framework";

class HomePage extends Component {
  handler() {
    this.routerContext.navigateTo("/login")
  }

  render() {
    return `
      <div>
        <h1>HomePage</h1>
        <button onclick="handler()" class="login__form__button-submit">GO TO LOGIN </button>
      </div>
    `;
  }
}

export default HomePage;
