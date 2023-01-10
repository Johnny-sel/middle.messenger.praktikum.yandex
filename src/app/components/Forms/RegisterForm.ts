import { section, form, component, a } from '@core/tags';
import { Component } from '@core/component';
import { Router } from '@core/router';
import { Button, Input } from '@app/components';
import { location } from '@app/const';
import { TInput } from './types';
import { State } from '@core/types';

const inputs: TInput[] = [
  { name: 'email', placeholder: 'Email Address' },
  { name: 'login', placeholder: 'Login' },
  { name: 'first_name', placeholder: 'Name' },
  { name: 'second_name', placeholder: 'Surname' },
  { name: 'display_name', placeholder: 'Chat Name' },
  { name: 'phone', placeholder: 'Phone number' },
  { name: 'password', placeholder: 'Password' },
  { name: 'confirm-password', placeholder: 'Confirm Password' },
];

const data = {
  email: '',
  login: '',
  first_name: '',
  second_name: '',
  display_name: '',
  phone: '',
  password: '',
  confirm_password: '',
};

export default class RegisterForm extends Component {
  constructor() {
    super();
  }

  createState() {
    return { data, inputs };
  }

  onChange(event: InputEvent) {
    const name = (event.target as any).name;
    this.state.data[name] = (event.target as any).value;
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    Router.to(location.chats);
  }

  goToLoginPage() {
    Router.to(location.root);
  }

  create(state: State) {
    const { inputs } = state;

    const onSubmit = this.onSubmit.bind(this);
    const goToLoginPage = this.goToLoginPage.bind(this);
    const onChange = this.onChange.bind(this);

    // prettier-ignore
    return (
      section('c=section', [
        form('c=form;', [
          ...inputs.map((inputData: TInput) => {
            return component(Input, { ...inputData, change: onChange })
          }),
          component(Button, { text: 'Create account', onSubmit: onSubmit, type: 'submit' }),
        ]),
        a('c=link;', ['Go to login'], { click: goToLoginPage }),
      ])

    );
  }
}
