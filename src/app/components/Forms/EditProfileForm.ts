import { section, form, component, a } from '@core/tags';
import { Component } from '@core/component';
import { Router } from '@core/router';
import { Button, Input } from '@app/components';
import { location } from '@app/const';
import { State } from '@core/types';
import { TInput } from './types';
import { editProfileInputs as inputs } from './resources';

const data = {
  email: '',
  login: '',
  first_name: '',
  second_name: '',
  display_name: '',
  phone: '',
};

export default class EditProfileForm extends Component {
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
    Router.to(location.profile);
    console.log(this.state.data);
  }

  goToProfilePage() {
    Router.to(location.profile);
  }

  create(state: State) {
    const { inputs, data } = state;

    const onSubmit = this.onSubmit.bind(this);
    const goToProfilePage = this.goToProfilePage.bind(this);
    const onChange = this.onChange.bind(this);

    // prettier-ignore
    return (
      section('c=section', [
        form('c=form;', [
          ...inputs.map((input: TInput) => {
            return component(Input, { ...input, change: onChange, value: data[input.name] })
          }),
          component(Button, { text: 'Change account', onSubmit: onSubmit, type: 'submit' }),
        ]),
        a('c=link;', ['Go to account'], { click: goToProfilePage }),
      ])
    );
  }
}
