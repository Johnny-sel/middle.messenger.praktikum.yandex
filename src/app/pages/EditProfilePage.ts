import {component} from '@core/tags';
import {Component} from '@core/component';
import {EditProfileForm, Layout} from '@app/components';

export default class EditProfilePage extends Component {
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
