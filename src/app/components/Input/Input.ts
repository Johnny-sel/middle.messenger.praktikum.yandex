import './Input.sass';

import { div, input, span } from '@core/tags';
import { Component } from '@core/component';
import { Props, State } from '@core/types';

export default class Input extends Component {
  constructor() {
    super();
  }

  onBlur(event: FocusEvent) {
    const element = event.currentTarget as any;
    if (!element.value) {
      element.setCustomValidity("Invalid field.")
    } else {
      element.setCustomValidity("")
    }
  }

  create(_: State, props: Props) {
    const { value, name, placeholder, change: onChange, pattern, error, className } = props;
    const onBlur = this.onBlur.bind(this);
    // prettier-ignore
    return (
      div(`c=${className ?? 'form__input'} input_group;`, [
        input(`c=input_group__input input; id=${name}; v=${value}; t=${name}; n=${name}; p=${placeholder}; pt=${pattern}; `, [],
          {
            input: onChange,
            blur: onBlur
          }

        ),
        span('c=input_group__error;', [error]),
      ])

    );
  }
}
