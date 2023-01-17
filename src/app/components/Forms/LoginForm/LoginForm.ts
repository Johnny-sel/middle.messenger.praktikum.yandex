// core
import {span, section, form, component, a} from '@core/tags';
import {Component} from '@core/component';
import {Router} from '@core/router';
// app
import {Button, Input} from '@app/components';
import {location} from '@app/const';
import {TInput} from '@app/types';
import {loginInputs} from '../utils/getInputs';
import {initialState, dispatch} from './reducer';

export default class LoginForm extends Component<typeof initialState> {
  constructor() {
    super();
  }

  createState() {
    return initialState;
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    this.state.target = event.target as any;
    dispatch.call(this, 'LOGIN_USER');
  }

  didMount(): void {
    dispatch.call(this, 'GET_USER');
  }

  onChange(event: InputEvent): void {
    this.state.event = event;
    dispatch.call(this, 'CHANGE_INPUT');
  }

  create() {
    const {error, load, data} = this.state;

    const change = this.onChange.bind(this);
    const onSubmit = this.onSubmit.bind(this);

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
        a('c=link;', ['Create account'], {click: () => Router.to(location.registration)}),
      ])
    );
  }
}
