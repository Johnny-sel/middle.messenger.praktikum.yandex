import {div, span, button} from '@core/tags';
import {Component} from '@core/component';
import {TestState} from './types';

export default class TestPage extends Component<TestState, {}> {
  constructor() {
    super();
  }

  createState() {
    return {users: [], load: true, count: 0, isActive: false};
  }

  didMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((users) => (this.state.users = users))
        .finally(() => (this.state.load = false));

    setInterval(() => {
      this.state.count++;
      this.state.isActive = !this.state.isActive;
    }, 1000);
  }

  addUser() {
    const user = {id: 1, name: 'Leanne Graham'};
    this.state.users = [...this.state.users, user];
  }

  create() {
    const {load, users, count, isActive} = this.state;
    const active = isActive ? 'green' : 'red';

    const addUser = this.addUser.bind(this);

    // prettier-ignore
    return (
      div('c=test;',
        load ?
          [span('c=load;', ['Load'])] :
          [
            ...users.map((user: { name: any; }) => div('c=user;', [user.name])),
            button('c=test; t=button;', ['ADD USER'], {click: addUser}),
            div(`c=${active};`, [count]),
          ],
      )
    );
  }
}
