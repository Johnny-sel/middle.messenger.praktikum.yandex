import './Button.sass';

import { button } from '@core/tags';
import { Component } from '@core/component';
import { Props, State } from '@core/types';

export default class Button extends Component {
  constructor() {
    super();
  }

  create(_: State, props: Props) {
    const { onSubmit, text, type } = props;

    // prettier-ignore
    return (
      button(`c=form__button button; t=${type ?? 'button'};`, [text], { click: onSubmit })
    );
  }
}
