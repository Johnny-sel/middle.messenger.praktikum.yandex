// core
import {span, section, form, component, a} from '@core/tags';
import {Component} from '@core/component';
import {Router} from '@core/router';
// app
import {CHANGE_INPUT, GET_USER, LOGIN_USER} from '@app/actions';
import {Button, Input} from '@app/components';
import {location} from '@app/const';
import {TInput} from '@app/types';
import {loginInputs} from '@app/resources';
// local
import {dispatch} from './reducer';
import {LoginState} from './types';
import {loginState} from './state';

export default class LoginForm extends Component<LoginState> {
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

  unMount(): void {
    console.log('LoginForm unmount');
    console.log('this.state:', this.state.data);
  }

  create() {
    const {error, load, data} = this.state;

    const change = this.onChange.bind(this);
    const onSubmit = this.onSubmit.bind(this);

    const disabled = load ? 'disabled' : '';

    // prettier-ignore
    return (
      section('c=section', [
        span('c=text;', ['Welcom to online messeger']),
        form('c=form; a=s;', [
          ...loginInputs.map((input: TInput) => {
            const value = (data as any)[input.name];
            return component(Input, {...input, change, load, value});
          }),
          component(Button, {text: 'Login', onSubmit, load, type: 'submit'}),
        ]),
        span(`c=${error? 'error':'hidden'};`, [error ?? '']),
        a(`c=link ${disabled};`, ['Create account'], {click: () => Router.to(location.registration)}),
      ])
    );
  }
}
