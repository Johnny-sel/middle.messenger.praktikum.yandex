import {UPDATE_PASSWORD_ACTION} from './../../actions/index';
// core
import {section, form, component, a, span} from '@core/tags';
import {Component} from '@core/component';
import {Router} from '@core/router';
// app
import {CHANGE_INPUT_ACTION} from '@app/actions';
import {Button, Input} from '@app/components';
import {location} from '@app/const';
import {TInput} from '@app/types';
import {editPasswordInputs} from '@app/resources';
// local
import {EditPasswordState} from './types';
import {dispatch} from './reducer';
import {editPasswordState} from './state';

export default class EditPasswordForm extends Component<EditPasswordState> {
  constructor() {
    super();
  }

  createState() {
    return editPasswordState;
  }

  onChange(event: InputEvent): void {
    this.state.event = event;
    dispatch.call(this, CHANGE_INPUT_ACTION);
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    this.state.target = event.target as HTMLButtonElement;
    dispatch.call(this, UPDATE_PASSWORD_ACTION);
  }

  create() {
    const change = this.onChange.bind(this);
    const onSubmit = this.onSubmit.bind(this);

    const {data, error, load} = this.state;

    // prettier-ignore
    return (
      section('c=section', [
        form('c=form;', [
          ...editPasswordInputs.map((input: TInput) => {
            const value = (data as any)[input.name];
            return component(Input, {...input, change, value, load});
          }),
          component(Button, {text: 'Change password', onSubmit, load, type: 'submit'}),
        ]),
        span(`c=${error? 'error':'hidden'};`, [error ?? '']),
        a('c=link;', ['Go to account'], {click: () => Router.to(location.profile)}),
      ])
    );
  }
}
