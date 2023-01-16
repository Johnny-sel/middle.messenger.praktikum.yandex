// core
import {span, section, form, component, a} from '@core/tags';
import {Component} from '@core/component';
import {Router} from '@core/router';
import {State} from '@core/types';
// app
import {Button, Input} from '@app/components';
import {location} from '@app/const';
import {TInput} from '@app/types';
// local
import {validateForm} from '../utils/validateForm';
import {loginInputs} from '../utils/getInputs';
import {onChange} from '../utils/onChange';
import {initialState} from './initialState';

export default class LoginForm extends Component {
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
      Router.to(location.chats);
    }

    console.log('form data', this.state.data);
  }

  create(state: State) {
    const change = onChange.bind(this);
    const onSubmit = this.onSubmit.bind(this);

    // prettier-ignore
    return (
      section('c=section', [
        span('c=text;', ['Welcom to online messeger']),
        form('c=form; a=s;', [
          ...loginInputs.map((input: TInput) => {
            return component(Input, {...input, change, value: state.data[input.name]});
          }),
          component(Button, {text: 'Login', onSubmit: onSubmit, type: 'submit'}),
        ]),
        a('c=link;', ['Create account'], {click: () => Router.to(location.registration)}),
      ])
    );
  }
}
