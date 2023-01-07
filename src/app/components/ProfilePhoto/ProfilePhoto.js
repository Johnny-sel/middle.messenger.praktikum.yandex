import './ProfilePhoto.sass';
import avatar from '@app/img/avatar-preview.png';

import { div, span, img , button } from '@core/tags';
import { Component } from '@core/component';

export default class ProfilePhoto extends Component {
  constructor() {
    super();
  }

  create(state, props) {
    const { profileName } = props;

    // prettier-ignore
    return (
      div('c=large_avatar;', [
        div('c=large_avatar__preview;', [
          img(`c=large_avatar__preview__img; src=${avatar}; alt=insert profile photo;`, []),
          button('c=large_avatar__preview_button; t=button;', ['Change avatar']),
        ]),
        span('c=large_avatar__profile_name text;', [ profileName ])
      ])
    );
  }
}
