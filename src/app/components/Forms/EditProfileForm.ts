import {section, form, component, a} from '@core/tags';
import {Component} from '@core/component';
import {Router} from '@core/router';
import {State} from '@core/types';

import {Button, Input} from '@app/components';
import {location} from '@app/const';
import {TInput} from '@app/types';
import {inputs} from '@app/resources';
import {name} from '@app/const';
import {validateForm} from './utils/validateForm';

const names = [
  name.email,
  name.login,
  name.firstName,
  name.secondName,
  name.displayName,
  name.phone,
];

const editProfileInputs = inputs.filter((input) => names.includes(input.name));

export default class EditProfileForm extends Component {
  constructor() {
    super();
  }

  createState() {
    return {
      data: {
        [name.email]: '',
        [name.login]: '',
        [name.firstName]: '',
        [name.secondName]: '',
        [name.displayName]: '',
        [name.phone]: '',
      },
    };
  }

  onChange(event: InputEvent) {
    const element = event.target as any;
    element.setCustomValidity('');
    const name = element.name;
    const value = element.value;
    this.state.data = {...this.state.data, [name]: value};
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    const isValid = validateForm((event.target as any).form);

    if (isValid) {
      Router.to(location.profile);
    }

    console.log('form data', this.state.data);
  }

  create(state: State) {
    const onSubmit = this.onSubmit.bind(this);
    const onChange = this.onChange.bind(this);

    // prettier-ignore
    return (
      section('c=section', [
        form('c=form;', [
          ...editProfileInputs.map((input: TInput) => {
            return component(Input, {...input, change: onChange, value: state.data[input.name]});
          }),
          component(Button, {text: 'Change account', onSubmit: onSubmit, type: 'submit'}),
        ]),
        a('c=link;', ['Go to account'], {click: () => Router.to(location.profile)}),
      ])
    );
  }
}
