import { div, p, span, h1, h2, button } from '@core/vdom';
import Component from '@core/component';
import Router from '@core/router';
export default class LogoutPage extends Component {
  constructor() {
    super();
  }

  createState() {
    return {};
  }

  didMount() {}

  create(state) {
    const {} = state;
    // prettier-ignore
    return (
      h1(`c=;`, ["LOGOUT PAGE"])
    );
  }
}
