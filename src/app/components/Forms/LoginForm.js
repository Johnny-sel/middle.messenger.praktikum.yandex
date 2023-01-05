import { span, section, form, component, a } from '@core/tags';
import { Component } from '@core/component';
import { Router } from '@core/router';
import { Button, Input } from '@app/components';

const data = {
  email: '',
  password: '',
};

export default class LoginForm extends Component {
  constructor() {
    super();
  }

  createState() {
    return {
      data,
      loading: false,
    };
  }

  onChange(event) {
    const name = event.target.name;
    this.state.data[name] = event.target.value;
  }

  onSubmit() {
    console.log('state:', this.state.data);
  }

  goToRegisterPage() {
    Router.navigateTo('/registration');
  }

  create(state) {
    const onChange = this.onChange.bind(this);
    const onSubmit = this.onSubmit.bind(this);
    const goToRegisterPage = this.goToRegisterPage.bind(this);

    // prettier-ignore
    return (
      section([
        span('c=text;', ['Welcom to online messeger']),
        form('c=form;', [
          component(Input, { name: 'email', placeholder: 'Enter Address' , change: onChange }),
          component(Input, { name: 'password', placeholder: 'Password' , change: onChange }),
          component(Button, { text: 'Login', onSubmit: onSubmit }),
        ]),
        a('c=link;', ['Create account'], { click: goToRegisterPage}),
      ])
    );
  }
}
