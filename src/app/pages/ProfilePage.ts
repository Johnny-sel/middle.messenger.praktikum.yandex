import {component} from '@core/tags';
import {Component} from '@core/component';
import {Layout} from '@app/components';
import {ProfileInfo} from '@app/modules';

export default class ProfilePage extends Component<{}, {}> {
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
