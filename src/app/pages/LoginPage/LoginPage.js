import { span, h1, section, input, form, component } from '@core/tags';
import { Component } from '@core/component';
import { Button } from '@components';
import './LoginPage.sass';

export default class LoginPage extends Component {
  constructor() {
    super();
  }

  createState() {
    return {
      email: '',
      password: '',
      loading: false,
      count: 0,
    };
  }

  onChangeEmail(event) {
    this.state.email = event.target.value;
  }

  onChangePassword(event) {
    this.state.password = event.target.value;
  }

  onSubmit() {
    console.log('this:', this.state);
  }

  // didMount() {
  //   setInterval(() => {
  //     this.state.count++;
  //   }, 1000);
  // }

  create(state) {
    const { email, password, loading, count } = state;

    const changeEmail = this.onChangeEmail.bind(this);
    const changePassword = this.onChangePassword.bind(this);

    // prettier-ignore
    return (
      section(`c=login__form;`, [
        h1(`c=login__form__title title;`, ['Sign in']),
        span(`c=login__form__desc text;`, ['Welcom to online messeger']),
        form(`c=login__form__form form; n=login-form;`, [
          input(`c=login__form__input input; v=${email}; t=email; n=email; p=Email Address;`, [], { change: changeEmail }),
          input(`c=login__form__input input; v=${password}; t=password; n=password; p=Password`, [], { change: changePassword }),
          component(Button, { text: 'Login', onSubmit: this.onSubmit.bind(this) }),
        ]),
        span(`c=login__form__desc text;`, [`Count ${count}`]),
      ])
      
    );
  }
}
