import './Input.sass';

import {div, input, span} from '@core/tags';
import {Component} from '@core/component';
import {Props, State} from '@core/types';
import {name as names} from '@app/const';

const {confirmPassword, password} = names;

export default class Input extends Component<any> {
  constructor() {
    super();
  }

  create(_: State, props: Props) {
    const {value, name, placeholder, change: onChange, pattern, error, className, load} = props;
    const type = name === confirmPassword ? password : name;
    // prettier-ignore
    return (
      div(`c=${className ?? 'form__input'} input_group;`, [
        input(`
          c=input_group__input input;
          id=${name};
          v=${value};
          t=${type};
          n=${name};
          p=${placeholder};
          pt=${pattern};
          ${load ? "di=" :''};
        `, 
        [], {input: onChange},
        ),
        span('c=input_group__error;', [error]),
      ])

    );
  }
}
