import './Spinner.sass';

import {span} from '@core/tags';
import {Component} from '@core/component';

export default class Spinner extends Component {
  constructor() {
    super();
  }

  create() {
    // prettier-ignore
    return (
      span('c=spinner;')
    );
  }
}
