// core
import {span, section, form, component, a} from '@core/tags';
import {Component} from '@core/component';
import {Router} from '@core/router';
// app
import {CHANGE_INPUT, GET_USER, LOGIN_USER} from '@app/actions';
import {Button, Input, Layout} from '@app/components';
import {location, title} from '@app/constants';
import {TInput} from '@app/types';
import {loginInputs} from '@app/resources';
// local
import {dispatch} from './Logic';
import {LoginState} from './Types';
import {loginState} from './State';

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
    const {error, load, data} = this.state;

    const change = this.onChange.bind(this);
    const onSubmit = this.onSubmit.bind(this);

    const disabled = load ? 'disabled' : '';

    // prettier-ignore
    return (
      component(Layout, {
        title: title.root,
        children: [
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
      ]})
    );
  }
}
