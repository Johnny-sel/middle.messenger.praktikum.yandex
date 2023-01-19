// core
import {section, form, component, a} from '@core/tags';
import {Component} from '@core/component';
import {Router} from '@core/router';
import {Props, State} from '@core/types';
// app
import {Button, Input} from '@app/components';
import {location} from '@app/const';
import {TInput} from '@app/types';
// local
import {validateForm} from '../../utils/validateForm';
import {onChange} from '../../functions/onChange';
import {editProfileInputs} from '../../resources/getInputs';
import { EditProfileState } from './types';
import { editProfileState } from './state';
import { dispatch } from './reducer';
import { CHANGE_INPUT_ACTION, GET_USER_ACTION, UPDATE_USER_ACTION } from '@app/actions';

export default class EditProfileForm extends Component<EditProfileState> {
  constructor() {
    super();
  }

  createState() {
    return editProfileState;
  }

  onChange(event: InputEvent): void {
    this.state.event = event;
    dispatch.call(this, CHANGE_INPUT_ACTION);
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    this.state.target = event.target as HTMLButtonElement;
    dispatch.call(this, UPDATE_USER_ACTION);
  }

  didMount(): void {
    dispatch.call(this, GET_USER_ACTION);
  }

  create() {
    const onSubmit = this.onSubmit.bind(this);
    const change = this.onChange.bind(this);

    const {data, load} = this.state;

    // prettier-ignore
    return (
      section('c=section', [
        form('c=form;', [
          ...editProfileInputs.map((input: TInput) => {
            const value = (data as any)[input.name];
            return component(Input, {...input, change, load, value});
          }),
          component(Button, {text: 'Change account', onSubmit, load, type: 'submit'}),
        ]),
        a('c=link;', ['Go to account'], {click: () => Router.to(location.profile)}),
      ])
    );
  }
}
