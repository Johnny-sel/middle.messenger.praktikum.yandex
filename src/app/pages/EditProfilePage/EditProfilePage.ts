import {Layout} from '@app/components';
// core
import {section, form, component, a, span} from '@core/tags';
import {Component} from '@core/component';
import {Router} from '@core/router';
// app
import {CHANGE_INPUT, GET_USER, UPDATE_USER} from '@app/actions';
import {Button, Input} from '@app/components';
import {location, title} from '@app/constants';
import {TInput} from '@app/types';
import {editProfileInputs} from '@app/resources';
// local
import {EditProfileState} from './types';
import {editProfileState} from './state';
import {dispatch} from './reducer';

export default class EditProfilePage extends Component<EditProfileState> {
  constructor() {
    super();
  }

  createState() {
    return editProfileState;
  }

  onChange(event: InputEvent): void {
    this.state.event = event;
    dispatch.call(this, CHANGE_INPUT);
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    this.state.target = event.target as HTMLButtonElement;
    dispatch.call(this, UPDATE_USER);
  }

  didMount(): void {
    dispatch.call(this, GET_USER);
  }

  create() {
    const onSubmit = this.onSubmit.bind(this);
    const change = this.onChange.bind(this);

    const {inputData, load, error} = this.state;
    // prettier-ignore
    return (
      component.call(this, Layout, {
        key: '1',
        title: title.profileEdit,
        children: [
          section('c=section;', [
            form('c=form;', [
              ...editProfileInputs.map((input: TInput) => {
                const value = (inputData as any)[input.name];
                const key = input.name;
                return component.call(this,Input, {...input, change, load, value, key});
              }),
              component.call(this, Button, {text: 'Change account', onSubmit, load, type: 'submit', key: '2'}),
            ]),
            span(`c=${error? 'error':'hidden'};`, [error ?? '']),
            a('c=link;', ['Go to account'], {click: () => Router.to(location.profile)}),
          ]),
      ]})
    );
  }
}
