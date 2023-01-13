import './Input.sass';

import { div, input, span } from '@core/tags';
import { Component } from '@core/component';
import { Props, State } from '@core/types';

export default class Input extends Component {
  constructor() {
    super();
  }

  create(_: State, props: Props) {
    const { value, name, placeholder, change: onChange, pattern, error } = props;
    // prettier-ignore
    return (
      div('c=;', [
        input(`c=form__input input; v=${value}; t=${name}; n=${name}; p=${placeholder}; req; pt=${pattern};`, [],
          { input: onChange }
        ),
        span('c=input__error;', [error]),
      ])

    );
  }
}
