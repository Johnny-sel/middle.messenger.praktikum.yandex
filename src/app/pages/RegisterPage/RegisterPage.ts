// core
import {section, form, component, a, span} from '@core/tags';
import {Component} from '@core/component';
import {Router} from '@core/router';
// app
import {CHANGE_INPUT, CREATE_USER} from '@app/actions';
import {Button, Input, Layout} from '@app/components';
import {location, title} from '@app/constants';
import {TInput} from '@app/types';
import {regInputs} from '@app/resources';

// local

import {registerState} from './state';
import {dispatch} from './reducer';
import {RegisterState} from './types';

export default class RegisterPage extends Component<RegisterState, {}> {
  constructor() {
    super();
  }

  createState() {
    return registerState;
  }

  onChange(event: InputEvent): void {
    this.state.event = event;
    dispatch.call(this, CHANGE_INPUT);
  }

  onSubmit(event: InputEvent): void {
    event.preventDefault();
    this.state.target = event.target as HTMLButtonElement;
    dispatch.call(this, CREATE_USER);
  }

  create() {
    const {error, load, inputData} = this.state;

    const onSubmit = this.onSubmit.bind(this);
    const change = this.onChange.bind(this);

    // prettier-ignore
    return (
      component(Layout, {
        title: title.registration,
        children: [
          section('c=section;', [
            form('c=form;', [
              ...regInputs.map((input: TInput) => {
                const value = (inputData as any)[input.name]
                return component(Input, {...input, change, value, load});
              }),
              component(Button, {text: 'Create account', onSubmit, type: 'submit', load}),
            ]),
            span(`c=${error? 'error':'hidden'};`, [error ?? '']),
            a('c=link;', ['Go to login'], {click: () => Router.to(location.root)}),
          ])
      ]})
    );
  }
}
