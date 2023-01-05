import { component } from '@core/tags';
import { Component } from '@core/component';
import { EditPasswordForm , Layout} from '@app/components';

export default class EditPasswordPage extends Component {
  constructor() {
    super();
  }

  create(state, props) {
    // prettier-ignore
    return (
      component(Layout, { children: [
        EditPasswordForm
      ] })
    );
  }
}
