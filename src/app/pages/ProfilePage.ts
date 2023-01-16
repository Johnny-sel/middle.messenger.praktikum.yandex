import {component} from '@core/tags';
import {Component} from '@core/component';
import {ProfileInfo, Layout} from '@app/components';

export default class ProfilePage extends Component {
  constructor() {
    super();
  }

  create() {
    // prettier-ignore
    return (
      component(Layout, {children: [
        component(ProfileInfo),
      ]})
    );
  }
}
