import { div, p, span, h1, h2, button } from '@core/vdom';
import Component from '@core/component';

export default class LogoutPage extends Component {
  constructor() {
    super();
  }



  create(state) {
    // prettier-ignore
    return (
      h1(['LOGOUT PAGE'])
    );
  }
}
