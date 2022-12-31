
import { IComponent } from '@framework/types';
import { Component } from "@framework";

class HomePage extends Component implements IComponent {
  handler() {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json))
      .then(_ => {
        this.refresh();
      })

    this.routerDom.navigateTo("/login");

  }

  render() {
    return `
      <div id="HomePage">
        <h1>HomePage</h1>
        <button onclick="handler()" class="login__form__button-submit">GO TO LOGIN </button>
      </div>
    `;
  }
}

export default HomePage;
