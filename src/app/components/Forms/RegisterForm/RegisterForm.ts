// core
import {section, form, component, a, span} from '@core/tags';
import {Component} from '@core/component';
import {Router} from '@core/router';
import {State} from '@core/types';
// app
import {Button, Input} from '@app/components';
import {location} from '@app/const';
import {TInput} from '@app/types';
// local
import {validateForm} from '../utils/validateForm';
import {regInputs} from '../utils/getInputs';
import {onChange} from '../utils/onChange';
import {initialState} from './initialState';
import {Auth} from '@api/repositories';
import {Reason} from '@api/types';
import {comparePasswords} from '../utils/comparePasswords';

export default class RegisterForm extends Component<typeof initialState> {
  constructor() {
    super();
  }

  createState() {
    return initialState;
  }

  async onSubmit(event: SubmitEvent) {
    event.preventDefault();
    this.state.load = true;

    try {
      const isValid = validateForm((event.target as any).form);
      const isMatch = comparePasswords(this.state.data);

      if (!isMatch) throw 'Passwords not match';

      if (isValid) {
        let res: unknown;

        res = await Auth.signup(this.state.data);
        if ((res as Reason).reason) throw (res as Reason).reason;

        res = await Auth.signin(this.state.data);
        if ((res as Reason).reason) throw (res as Reason).reason;

        Router.to(location.chats);
      }
    } catch (error) {
      this.state.error = error;
    } finally {
      this.state.load = false;
    }
  }

  create(state: State) {
    const {error, load} = state as typeof initialState;

    const onSubmit = this.onSubmit.bind(this);
    const change = onChange.bind(this);

    // prettier-ignore
    return (
      section('c=section;', [
        form('c=form;', [
          ...regInputs.map((input: TInput) => {
            return component(Input, {...input, change, value: state.data[input.name], load});
          }),
          component(Button, {text: 'Create account', onSubmit, type: 'submit', load}),
        ]),
        span(`c=${error? 'error':'hidden'};`, [error ?? '']),
        a('c=link;', ['Go to login'], {click: () => Router.to(location.root)}),
      ])
    );
  }
}
