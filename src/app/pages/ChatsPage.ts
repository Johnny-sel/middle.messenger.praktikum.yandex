import { component, h1 } from '@core/tags';
import { Component } from '@core/component';
import { Layout } from '@app/components';

export default class ChatsPage extends Component {
  constructor() {
    super();
  }

  create() {
    // prettier-ignore
    return (
      component(Layout, { children: [
        h1(["Chats Page"])
      ] })
    );
  }
}
