import { div, p, span, h1, h2, button, section, input, form, label } from '@core/vdom';
import Component from '@core/component';
import Router from '@core/router';

export default class LoginPage extends Component {
  constructor() {
    super();
  }

  createState() {
    return {
      email: '',
      password: '',
    };
  }

  onChangeEmail(event) {
    this.state.email = event.target.value;
  }

  onChangePassword(event) {
    this.state.password = event.target.value;
  }

  onSumbit() {
    console.log(this.state.email);
    console.log(this.state.password);
  }

  create(state) {
    const { email, password } = state;

    // prettier-ignore
    return (
      section(`c=login__form;`, [
        h1(`c=login__form__title title;`, ['Sign in']),
        span(`c=login__form__desc text;`, ['Welcom to online messeger']),
        form(`c=login__form__form form; n=login-form;`, [
          input(`c=login__form__input input; v=${email}; t=email; n=email; p=Email Address; change=onChangeEmail();`, []),
          input(`c=login__form__input input; v=${password}; t=password; n=password; p=Password; change=onChangePassword();`, []),
          button(`c=login__form__button button; t=button; click=onSumbit();`, ['Login']),
        ]),
        
      ])
      
    );
  }
}
