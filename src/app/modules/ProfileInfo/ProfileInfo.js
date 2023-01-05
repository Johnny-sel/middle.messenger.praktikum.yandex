import './ProfileInfo.sass';

import {  main, form, component, a } from '@core/tags';
import { Component } from '@core/component';
import { Button, Input, LargeAvatar } from '@app/components';

export default class ProfileInfo extends Component {
  constructor() {
    super();
  }

  createState() {
    return {
      profileName: 'Evgenii Seleznev'
    };
  }
  
  create(state) {
    const { profileName } = state;

    // prettier-ignore
    return (
      main('c=profile__form;', [
        component(LargeAvatar, { profileName }),
      ])
      
    );
  }
}
