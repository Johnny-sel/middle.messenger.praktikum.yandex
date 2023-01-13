import { section, form, component, a } from '@core/tags';
import { Component } from '@core/component';
import { Router } from '@core/router';
import { Button, Input } from '@app/components';
import { location } from '@app/const';
import { TInput } from './types';
import { State } from '@core/types';
import { regInputs as inputs } from './resources';

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
    const value = (event.target as any).value;

    this.state.data = { ...this.state.data, [name]: value };
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    // Router.to(location.chats);
    console.log(this.state.data)
  }

  goToLoginPage() {
    Router.to(location.root);
  }

  create(state: State) {
    const { inputs, data } = state;

    const onSubmit = this.onSubmit.bind(this);
    const goToLoginPage = this.goToLoginPage.bind(this);
    const onChange = this.onChange.bind(this);

    // prettier-ignore
    return (
      section('c=section', [
        form('c=form;', [
          ...inputs.map((input: TInput) => {
            return component(Input, { ...input, change: onChange, value: data[input.name] })
          }),
          component(Button, { text: 'Create account', onSubmit: onSubmit, type: 'submit' }),
        ]),
        a('c=link;', ['Go to login'], { click: goToLoginPage }),
      ])

    );
  }
}
