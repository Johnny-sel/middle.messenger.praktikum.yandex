import {component} from '@core/tags';
import {Component} from '@core/component';
import {Layout} from '@app/components';
import {EditProfileForm} from '@app/modules';

export default class EditProfilePage extends Component<{}, {}> {
  constructor() {
    super();
  }

  create() {
    // prettier-ignore
    return (
      component(Layout, {children: [
        component(EditProfileForm),
      ]})
    );
  }
}
