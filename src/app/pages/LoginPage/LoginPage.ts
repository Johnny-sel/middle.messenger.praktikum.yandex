// core
import {span, section, form, component, a} from 'src/core/vdom/tags/tags';
import {Component} from '@core/component';
import {Router} from '@core/router';
// app
import {CHANGE_INPUT, GET_USER, LOGIN_USER} from '@app/actions';
import {Button, Input, Layout} from '@app/components';
import { location, title} from '@app/constants';
import {TInput} from '@app/types';
import {loginInputs} from '@app/resources';
// local
import {dispatch} from './reducer';
import {LoginState} from './types';
import {loginState} from './state';

export default class LoginPage extends Component<LoginState, {}> {
  constructor() {
    super();
  }

  createState() {
    return loginState;
  }

  onChange(event: InputEvent): void {
    this.state.event = event;
    dispatch.call(this, CHANGE_INPUT);
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    this.state.target = event.target as HTMLButtonElement;
    dispatch.call(this, LOGIN_USER);
  }

  didMount(): void {
    dispatch.call(this, GET_USER);
  }

  create() {
    const {error, load, inputData} = this.state;

    const change = this.onChange.bind(this);
    const onSubmit = this.onSubmit.bind(this);

    const disabled = load ? 'disabled' : '';

    // prettier-ignore
    return (
      component.call(this, Layout, {
        key: '1',
        title: title.root,
        children: [
          section('c=section', [
            span('c=text;', ['Welcom to online messeger']),
            form('c=form; a=s;', [
              ...loginInputs.map((input: TInput) => {
                const value = (inputData as Record<string, string>)[input.name];
                const key = input.name;
                return component.call(this, Input, {...input, change, load, value, key});
              }),
              component.call(this, Button, {text: 'Login', onSubmit, load, type: 'submit', key: '2'}),
            ]),
            span(`c=${error? 'error':'hidden'};`, [error ?? '']),
            a(`c=link ${disabled};`, ['Create account'], {click: () => Router.to(location.registration)}),
          ])
      ]})
    );
  }
}
