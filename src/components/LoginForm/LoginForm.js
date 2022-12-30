import { Component } from "../../services/component";

class LoginForm extends Component {
  render() {
    return `
      <main id="login__form">
        <div class="login__form__title">
          <h2>Sign in</h2>
        </div>
        <input class="login__form__input input" name="login" type="email" placeholder="Email Address">
        <input class="login__form__input input" name="password" type="password" placeholder="Passwrod">
        <button onclick="onClick()" class="login__form__registration-link">Create account</button>
        <button class="login__form__button-submit">Login</button>
      </main>
    `;
  }
}

export default LoginForm;
