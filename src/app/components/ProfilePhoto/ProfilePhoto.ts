import './ProfilePhoto.sass';
import preview from '@app/img/avatar-preview.png';

import {div, span, img,  input, label} from '@core/tags';
import {Component} from '@core/component';
import {hostResources} from '@app/const';

export default class ProfilePhoto extends Component<void> {
  constructor() {
    super();
  }

  create() {
    const {name, photoUrl, upload} = this.props;


    // prettier-ignore
    return (
      div('c=large_avatar;', [
        div('c=large_avatar__preview;', [
          photoUrl? 
            img(`c=large_avatar__img; src=${hostResources + photoUrl}; alt=insert profile photo;`, [])
              :
            img(`c=large_avatar__preview__img; src=${preview}; alt=insert profile photo;`, []),
          input(`c=large_avatar__preview_button; t=file; id=file; v=Change avatar; `, [], {input: upload}),
          label(`c=large_avatar__preview_label; for=file;`,['Change avatar'])
        ]),
        span('c=large_avatar__profile_name text;', [name]),
      ])
    );
  }
}
