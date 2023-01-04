import { button } from '@core/tags';
import { Component } from '@core/component';

import './Button.sass';

export default class Button extends Component {
  constructor(props) {
    super(props);
  }

  create(state, props) {
    const { onSubmit , text} = props;
    // prettier-ignore
    return (
      button(`c=login__form__button button; t=button;`, [text], { click: onSubmit })
    );
  }
}
