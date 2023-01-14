import { span, section, form, component, a } from '@core/tags';
import { Component } from '@core/component';
import { Router } from '@core/router';
import { State } from '@core/types';

import { Button, Input } from '@app/components';
import { location } from '@app/const';
import { inputs } from '@app/resources';
import { TInput } from '@app/types';
import { name } from '@app/const';
import { validateForm } from './validateForm';

const names = [name.email, name.password];
const loginInputs = inputs.filter(input => names.includes(input.name));
export default class LoginForm extends Component {
  constructor() {
    super();
  }

  createState() {
    return {
      data: {
        [name.email]: '',
        [name.password]: '',
      }
    };
  }

  onChange(event: InputEvent) {
    const name = (event.target as any).name;
    const value = (event.target as any).value;
    this.state.data = { ...this.state.data, [name]: value };
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    const isValid = validateForm((event.target as any).form);

    if (isValid) {
      Router.to(location.chats);
    }

    console.log('form data', this.state.data)
  }

  create(state: State) {
    const onChange = this.onChange.bind(this);
    const onSubmit = this.onSubmit.bind(this);

    // prettier-ignore
    return (
      section('c=section', [
        span('c=text;', ['Welcom to online messeger']),
        form('c=form; a=s;', [
          ...loginInputs.map((input: TInput) => {
            return component(Input, { ...input, change: onChange, value: state.data[input.name] })
          }),
          component(Button, { text: 'Login', onSubmit: onSubmit, type: 'submit' }),
        ]),
        a('c=link;', ['Create account'], { click: () => Router.to(location.registration) }),
      ])
    );
  }
}
