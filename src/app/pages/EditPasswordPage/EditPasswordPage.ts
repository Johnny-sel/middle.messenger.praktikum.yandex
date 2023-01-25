// core
import {section, form, component, a, span} from '@core/tags';
import {Component} from '@core/component';
import {Router} from '@core/router';
// app
import {CHANGE_INPUT, UPDATE_PASSWORD} from '@app/actions';
import {Button, Input, Layout} from '@app/components';
import {location, title} from '@app/constants';
import {TInput} from '@app/types';
import {editPasswordInputs} from '@app/resources';
// local
import {EditPasswordState} from './types';
import {dispatch} from './reducer';
import {editPasswordState} from './state';

export default class EditPasswordPage extends Component<EditPasswordState, {}> {
  constructor() {
    super();
  }

  createState() {
    return editPasswordState;
  }

  onChange(event: InputEvent): void {
    this.state.event = event;
    dispatch.call(this, CHANGE_INPUT);
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    this.state.target = event.target as HTMLButtonElement;
    dispatch.call(this, UPDATE_PASSWORD);
  }

  create() {
    const change = this.onChange.bind(this);
    const onSubmit = this.onSubmit.bind(this);

    const {inputData, error, load} = this.state;

    // prettier-ignore
    return (
      component(Layout, {
        title: title.passwordEdit,
        children: [
          section('c=section', [
            form('c=form;', [
              ...editPasswordInputs.map((input: TInput) => {
                const value = (inputData as any)[input.name];
                return component(Input, {...input, change, value, load});
              }),
              component(Button, {text: 'Change password', onSubmit, load, type: 'submit'}),
            ]),
            span(`c=${error? 'error':'hidden'};`, [error ?? '']),
            a('c=link;', ['Go to account'], {click: () => Router.to(location.profile)}),
          ])
      ]})
    );
  }
}
