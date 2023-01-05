import { component } from '@core/tags';
import { Component } from '@core/component';
import { EditProfileForm } from '@app/modules';
import { Layout } from '@app/layouts';

export default class ProfilePageEdit extends Component {
  constructor() {
    super();
  }

  create(state, props) {

    // prettier-ignore
    return (
      component(Layout,  { children: [EditProfileForm] } )
    );
  }
}
