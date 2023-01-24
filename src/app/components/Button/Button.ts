import './Button.sass';

import {button} from '@core/tags';
import {Component} from '@core/component';
export default class Button extends Component<{}, any> {
  constructor() {
    super();
  }


  create() {
    const {onSubmit, text, type, load} = this.props;

    // prettier-ignore
    return (
      button(`c=form__button button; t=${type ?? 'button'}; ${load ? "di=" :''}; `, 
        [load? 'Loading...': text],
        {click: onSubmit}
      )
    );
  }
}
