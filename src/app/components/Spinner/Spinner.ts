import './Spinner.sass';

import {span} from '@core/tags';
import {Component} from '@core/component';

export default class Spinner extends Component<{}, {size: string}> {
  constructor() {
    super();
  }

  create() {
    // prettier-ignore
    return (
      span(`c=spinner; s=width:${this.props.size}, height:${this.props.size}`)
    );
  }
}
