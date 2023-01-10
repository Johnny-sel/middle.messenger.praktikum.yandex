import { section, form, component, a } from '@core/tags';
import { Component } from '@core/component';
import { Router } from '@core/router';
import { Button, Input } from '@app/components';
import { location } from '@app/const';
import { State } from '@core/types';
import { TInput } from './types';

const inputs: TInput[] = [
  { name: 'email', placeholder: 'Email Address' },
  { name: 'login', placeholder: 'Login' },
  { name: 'first_name', placeholder: 'Name' },
  { name: 'second_name', placeholder: 'Surname' },
  { name: 'display_name', placeholder: 'Chat Name' },
  { name: 'phone', placeholder: 'Phone number' },
];

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
    this.state.data[name] = (event.target as any).value;
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    Router.to(location.profile);
  }

  goToProfilePage() {
    Router.to(location.profile);
  }

  create(state: State) {
    const { inputs } = state;

    const onSubmit = this.onSubmit.bind(this);
    const goToProfilePage = this.goToProfilePage.bind(this);
    const onChange = this.onChange.bind(this);

    // prettier-ignore
    return (
      section('c=section', [
        form('c=form;', [
          ...inputs.map((inputData: TInput) => {
            return component(Input, { ...inputData, change: onChange })
          }),
          component(Button, { text: 'Change account', onSubmit: onSubmit, type: 'submit' }),
        ]),
        a('c=link;', ['Go to account'], { click: goToProfilePage }),
      ])
    );
  }
}
