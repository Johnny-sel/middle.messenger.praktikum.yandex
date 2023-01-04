import { h1 } from '@core/vdom';
import { Component } from '@core/component';
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
