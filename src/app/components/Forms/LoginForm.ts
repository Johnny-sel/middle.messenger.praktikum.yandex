import { span, section, form, component, a } from '@core/tags';
import { Component } from '@core/component';
import { Router } from '@core/router';
import { Button, Input } from '@app/components';
import { location } from '@app/const';
import { loginInputs as inputs } from './resources';
import { TInput } from './types';
import { State } from '@core/types';

const data = {
  email: '',
  password: '',
};

export default class LoginForm extends Component {
  constructor() {
    super();
  }

  createState() {
    return { data, inputs, loading: false };
  }

  onChange(event: InputEvent) {
    const name = (event.target as any).name;
    const value = (event.target as any).value;

    this.state.data = { ...this.state.data, [name]: value };
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    Router.to(location.chats);
    console.log(this.state.data)
  }

  goToRegisterPage() {
    Router.to(location.registration);
  }

  create(state: State) {
    const { data } = state;
    const onChange = this.onChange.bind(this);
    const onSubmit = this.onSubmit.bind(this);
    const goToRegisterPage = this.goToRegisterPage.bind(this);

    // prettier-ignore
    return (
      section('c=section', [
        span('c=text;', ['Welcom to online messeger']),
        form('c=form; a=s;', [
          ...inputs.map((input: TInput) => {
            return component(Input, { ...input, change: onChange, value: data[input.name] })
          }),
          component(Button, { text: 'Login', onSubmit: onSubmit, type: 'submit' }),
        ]),
        a('c=link;', ['Create account'], { click: goToRegisterPage }),
      ])
    );
  }
}
