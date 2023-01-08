import { button } from '@core/tags';
import { Component } from '@core/component';

import './Button.sass';

export default class Button extends Component {
  constructor(props) {
    super(props);
  }

  create(state, props) {
    const { onSubmit, text, type } = props;
    // prettier-ignore
    return (
      button(`c=form__button button; t=${type ?? 'button'};`, [text], { click: onSubmit })
    );
  }
}
