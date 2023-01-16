import './Button.sass';

import {button} from '@core/tags';
import {Component} from '@core/component';
import {Props} from '@core/types';

export default class Button extends Component<void> {
  constructor() {
    super();
  }

  create(_: void, props: Props) {
    const {onSubmit, text, type, load} = props;

    // prettier-ignore
    return (
      button(`
        c=form__button button;
        t=${type ?? 'button'};
        ${load ? "di=" :''};
      `, 
        [load? 'Loading...': text],
        {click: onSubmit}
      )
    );
  }
}
