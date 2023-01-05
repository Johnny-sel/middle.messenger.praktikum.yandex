import './LoginForm.sass';

import { span, h1, main, form, component, a } from '@core/tags';
import { Component } from '@core/component';
import { Router } from '@core/router';
import { Button, Input } from '@app/components';

export default class LoginForm extends Component {
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

  goToLogoutPage(){
    Router.navigateTo('/registration')
  }

  create(state) {
    const { email, password, loading, count } = state;

    const changeEmail = this.onChangeEmail.bind(this);
    const changePassword = this.onChangePassword.bind(this);
    const onSubmit = this.onSubmit.bind(this);
    const goToLogoutPage = this.goToLogoutPage.bind(this)

    // prettier-ignore
    return (
      main('c=login__form;', [
        span('c=login__form__desc text;', ['Welcom to online messeger']),
        form('c=login__form__form form; n=login-form;', [
          component(Input, { name: 'email', placeholder: 'Enter Address' , change: changeEmail }),
          component(Input, { name:'password', placeholder: 'Password' , change: changePassword }),
          component(Button, { text: 'Login', onSubmit: onSubmit }),
        ]),
        a('c=login__form__link link;', ['Create account'], { click: goToLogoutPage}),
      ])
      
    );
  }
} 
