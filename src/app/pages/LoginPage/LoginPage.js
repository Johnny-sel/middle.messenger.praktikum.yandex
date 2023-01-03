import { div, p, span, h1, h2, button } from '@core/vdom';
import Component from '@core/component';
import Router from '@core/router';

export default class LoginPage extends Component {
  constructor() {
    super();
  }

  createState() {
    return {
      count: 0,
      number: 0,
      isActive: false,
    };
  }

  didMount() {
    setInterval(() => {
      this.state.count++;
      this.state.isActive = !this.state.isActive;
    }, 1000);
  }

  goToLogoutPage() {
    Router.navigateTo('/logout');
  }
  moveHanlder() {
    Router.navigateTo('/logout');
  }
  blurHanlder() {
    Router.navigateTo('/logout');
  }

  create(state) {
    const { count, number, isActive, isFlag } = state;

    const active = isActive ? 'active' : '';
    const flag = isFlag ? 'active' : '';

    // prettier-ignore
    return (
      div(`c=container ${active};`, [
          h1(`c=container ${flag};`, [count]),
          h2(`c=container ${flag};`, [number]),
          button(`c=container ${active};`, ['INCREMENT']),
          div([
              h1(`c=container ${flag};`, [count]),
              h2(`c=container ${flag};`, [number]),
              div([
                  div([
                      h1(`c=container ${flag};`, [count]),
                      h2(`c=container ${flag};`, [number]),
                      button(`c=container ${active}; click=goToLogoutPage(); move=moveHanlder(); t=submit; blur=blurHanlder();`, ['INCREMENT']),
                  ]),
              ]),
          ]),
      ])
    );
  }
}
