import { section, form, component, a } from '@core/tags';
import { Component } from '@core/component';
import { Router } from '@core/router';
import { Button, Input } from '@app/components';
import { location } from '@app/const';

const data = {
  "password": '',
  "confirm_password": '',
};

export default class EditPasswordForm extends Component {
  constructor() {
    super();
  }

  createState() {
    return { data, loading: false };
  }

  onChange(event: InputEvent) {
    const name = (event.target as any).name;
    this.state.data[name] = (event.target as any).value;

  }

  onSubmit(event: SubmitEvent) {
    Router.to(location.profile);
    event.preventDefault();
  }

  goToProfilePage() {
    Router.to(location.profile);
  }

  create() {
    const onChange = this.onChange.bind(this);
    const onSubmit = this.onSubmit.bind(this);
    const goToProfilePage = this.goToProfilePage.bind(this);

    // prettier-ignore
    return (
      section('c=section', [
        form('c=form;', [
          component(Input, { name: 'password', placeholder: 'New Password', change: onChange }),
          component(Input, { name: 'confirm_password', placeholder: 'Confirm New Password', change: onChange }),
          component(Button, { text: 'Change password', onSubmit: onSubmit, type: 'submit' }),
        ]),
        a('c=link;', ['Go to account'], { click: goToProfilePage }),
      ])
    );
  }
}
