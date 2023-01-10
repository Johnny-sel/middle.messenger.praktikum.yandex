import './ProfileInfo.sass';

import { section, div, component, a } from '@core/tags';
import { Component } from '@core/component';
import { ProfilePhoto, InfoLine } from '@app/components';
import { Router } from '@core/router';
import { location } from '@app/const';
import { State } from '@core/types';

type Item = { name: string, value: string };

const { root, profileEdit, passwordEdit } = location;

export default class ProfileInfo extends Component {
  constructor() {
    super();
  }

  createState() {
    return {
      profileName: 'Evgenii Seleznev',
      items: [
        { name: 'Email', value: 'demo@demo.com' },
        { name: 'Login', value: 'Demo login' },
        { name: 'Name', value: 'Demo name' },
        { name: 'Surname', value: 'Demo surname' },
        { name: 'Chat name', value: 'Demo chat name' },
        { name: 'Phone phone', value: '+111111111111' },
      ],
    };
  }

  goToChangeData() {
    Router.to(profileEdit);
  }

  goToChangePassword() {
    Router.to(passwordEdit);
  }

  goToLoginPage() {
    Router.to(root);
  }

  create(state: State) {
    const { profileName, items } = state;

    const goToChangeData = this.goToChangeData.bind(this);
    const goToChangePassword = this.goToChangePassword.bind(this);
    const goToLoginPage = this.goToLoginPage.bind(this);

    // prettier-ignore
    return (
      section('c=profile__info section;', [
        component(ProfilePhoto, { profileName }),
        ...items.map((item: Item) => {
          return component(InfoLine, { name: item.name, value: item.value });
        }),
        div('c=profile__info__group_link;', [
          a('c=profile__info__group_link__link link;', ['Change account'], { click: goToChangeData }),
          a('c=profile__info__group_link__link link;', ['Change password'], { click: goToChangePassword }),
          a('c=profile__info__group_link__link link;', ['Logout'], { click: goToLoginPage }),
        ]),
      ])
    );
  }
}
