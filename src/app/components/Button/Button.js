import { button } from '@core/vdom';
import { Component } from '@core/component';

export default class Button extends Component {
  constructor(props) {
    super(props);
  }

  create(state, props) {
    const { onSubmit } = props;
    // prettier-ignore
    return (
      button(`c=login__form__button button; t=button;`,['Login'], { click: onSubmit })
    );
  }
}
