import { component, main } from '@core/tags';
import { Component } from '@core/component';
import { ProfileInfo } from '@app/modules';
import { Layout } from '@app/layouts';

export default class ProfilePage extends Component {
  constructor() {
    super();
  }

  createState() {
    return {};
  }

  didMount() {}

  create() {
    // prettier-ignore
    return (
      component(Layout, { children: [ProfileInfo] })
    )
  }
}
