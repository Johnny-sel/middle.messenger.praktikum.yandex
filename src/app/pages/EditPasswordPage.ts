import {component} from '@core/tags';
import {Component} from '@core/component';
import {Layout} from '@app/components';
import {EditPasswordForm} from '@app/modules';

export default class EditPasswordPage extends Component<{}, {}> {
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
