import { input } from '@core/tags';
import { Component } from '@core/component';

import './Input.sass';

export default class Input extends Component {
  constructor() {
    super();
  }

  create(state, props) {
    const {} = state;
    const { name, placeholder, change } = props;
    // prettier-ignore
    return (
      input(`c=form__input input; t=${name}; n=${name}; p=${placeholder?? name};`, [], { change })
    );
  }
}
