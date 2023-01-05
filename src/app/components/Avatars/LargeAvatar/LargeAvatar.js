import './LargeAvatar.sass';

import { div, span, img , button } from '@core/tags';
import { Component } from '@core/component';

export default class LargeAvatar extends Component {
  constructor() {
    super();
  }

  create(state, props) {
    const {} = state;
    const { profileName } = props;

    // prettier-ignore
    return (
      div('c=large_avatar;', [
        div('c=large_avatar__preview;', [
          img('c=large_avatar__preview__img; src=img/avatar-preview.png;', []),
          button('c=large_avatar__preview_button;', ['Change avatar']),
        ]),
        span('c=large_avatar__profile_name;', [ profileName ])
      ])
    );
  }
}
