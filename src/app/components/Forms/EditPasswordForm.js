import { section, form, component, a } from '@core/tags';
import { Component } from '@core/component';
import { Router } from '@core/router';
import { Button, Input } from '@app/components';

const data = {
  email: '',
  password: '',
};

export default class EditPasswordForm extends Component {
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

  goBack() {
    Router.goBack();
  }

  create(state) {
    const onChange = this.onChange.bind(this);
    const onSubmit = this.onSubmit.bind(this);
    const goBack = this.goBack.bind(this);

    // prettier-ignore
    return (
      section([
        form('c=form; n=login-form;', [
          component(Input, { name: 'password', placeholder: 'New Password' , change: onChange }),
          component(Input, { name: 'confirm-password', placeholder: 'Confirm New Password' , change: onChange }),
          component(Button, { text: 'Change password', onSubmit: onSubmit }),
        ]),
        a('c=login__form__link link;', ['Go back'], { click: goBack}),
      ])
    );
  }
}
