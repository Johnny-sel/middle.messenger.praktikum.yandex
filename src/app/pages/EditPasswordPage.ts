import {component} from '@core/tags';
import {Component} from '@core/component';
import {EditPasswordForm, Layout} from '@app/components';

export default class EditPasswordPage extends Component {
  constructor() {
    super();
  }

  create() {
    // prettier-ignore
    return (
      component(Layout, {children: [
        component(EditPasswordForm),
      ]})
    );
  }
}
