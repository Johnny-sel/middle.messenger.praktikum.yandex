import './RegisterForm.sass';

import { span, h1, main, form, component, a } from '@core/tags';
import { Component } from '@core/component';
import { Router } from '@core/router';
import { Button, Input } from '@components';

export default class RegisterForm extends Component {
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
    console.log('state:', this.state);
  }

  goToLoginPage() {
    Router.navigateTo('/');
  }

  create(state) {
    const { email, password, loading, count } = state;

    const changeEmail = this.onChangeEmail.bind(this);
    const changePassword = this.onChangePassword.bind(this);
    const onSubmit = this.onSubmit.bind(this);
    const goToLoginPage = this.goToLoginPage.bind(this);

    // prettier-ignore
    return (
      main('c=register__form;', [
        form('c=register__form__form form; n=login-form;', [
          component(Input, { name: 'email', placeholder: 'Enter Address' , change: changeEmail }),
          component(Input, { name:'login', placeholder: 'Login' , change: changePassword }),
          component(Input, { name:'name', placeholder: 'Name' , change: changePassword }),
          component(Input, { name:'surname', placeholder: 'Surname' , change: changePassword }),
          component(Input, { name:'number', placeholder: 'Telephone number' , change: changePassword }),
          component(Input, { name:'password', placeholder: 'Password' , change: changePassword }),
          component(Input, { name:'repeat-password', placeholder: 'Repeat Password' , change: changePassword }),
          component(Button, { text: 'Create account', onSubmit: onSubmit }),
        ]),
        a('c=register__form__link link;', ['Sign in'], { click: goToLoginPage}),
      ])
      
    );
  }
}
