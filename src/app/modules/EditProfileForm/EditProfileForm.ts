// core
import {section, form, component, a} from '@core/tags';
import {Component} from '@core/component';
import {Router} from '@core/router';
import {State} from '@core/types';
// app
import {Button, Input} from '@app/components';
import {location} from '@app/const';
import {TInput} from '@app/types';
// local
import {validateForm} from '../../utils/validateForm';
import {onChange} from '../../functions/onChange';
import {editProfileInputs} from '../../resources/getInputs';
import {initialState} from './initialState';

export default class EditProfileForm extends Component<typeof initialState> {
  constructor() {
    super();
  }

  createState() {
    return initialState;
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    const isValid = validateForm((event.target as any).form);

    if (isValid) {
      Router.to(location.profile);
    }

  }

  create(state: State) {
    const onSubmit = this.onSubmit.bind(this);
    const change = onChange.bind(this);

    // prettier-ignore
    return (
      section('c=section', [
        form('c=form;', [
          ...editProfileInputs.map((input: TInput) => {
            return component(Input, {...input, change, value: state.data[input.name]});
          }),
          component(Button, {text: 'Change account', onSubmit: onSubmit, type: 'submit'}),
        ]),
        a('c=link;', ['Go to account'], {click: () => Router.to(location.profile)}),
      ])
    );
  }
}
