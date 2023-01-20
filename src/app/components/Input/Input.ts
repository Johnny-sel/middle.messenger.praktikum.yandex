import './Input.sass';

import {div, input, span} from '@core/tags';
import {Component} from '@core/component';

export default class Input extends Component<{}> {
  constructor() {
    super();
  }

  create() {
    const {value, name, type, placeholder, change, pattern, error, className, load} = this.props;

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
        [], {input: change},
        ),
        span('c=input_group__error;', [error]),
      ])
    );
  }
}
