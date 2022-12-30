
import { Component } from "../../services/component";

class HomePage extends Component {
  handler() {
    this.navigateTo('login');
  }

  render() {
    console.log(this.props)
    return `
    <div>
      <h1>HomePage</h1>
      <button onclick="handler()" class="login__form__button-submit">GO TO LOGIN </button>
    </div>
  `;
  }
}

export default HomePage;
