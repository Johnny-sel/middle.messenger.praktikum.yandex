import './ProfileInfo.sass';

import { section, div, component, a } from '@core/tags';
import { Component } from '@core/component';
import { LargeAvatar, InfoLine } from '@app/components';
import { Router } from '@core/router';

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
    Router.navigateTo('/profile/edit');
  }

  goToChangePassword() {}
  logout() {}

  create(state) {
    const { profileName, items } = state;

    const goToChangeData = this.goToChangeData.bind(this);
    const goToChangePassword = this.goToChangePassword.bind(this);
    const logout = this.logout.bind(this);

    // prettier-ignore
    return (
      section('c=profile__info;', [
        component(LargeAvatar, { profileName }),
        ...items.map((item, index) => {
          return component(InfoLine, { name: item.name, value: item.value });
        }),
        div('c=profile__info__group_link;', [
          a('c=profile__info__group_link__link link;', [ 'Change data' ], { click: goToChangeData}),
          a('c=profile__info__group_link__link link;', [ 'Change password' ], { click: goToChangePassword}),
          a('c=profile__info__group_link__link link;', [ 'Logout' ], { click: ()=> logout}),
        ]),
      ])
    );
  }
}
