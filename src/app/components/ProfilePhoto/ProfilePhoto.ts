import './ProfilePhoto.sass';
import preview from '@app/img/avatar-preview.png';

import {div, span, img, button, input, label} from '@core/tags';
import {Component} from '@core/component';
import {hostResources} from '@app/const';
import {User} from '@api/repositories';

export default class ProfilePhoto extends Component<void> {
  constructor() {
    super();
  }

  async updatePhoto(event: InputEvent) {
    const image = (event.target as HTMLInputElement).files?.item(0);
    if (image) {
      const formData = new FormData();
      formData.append('avatar', image);
      const user = await User.updatePhoto(formData);
      console.log('user:', user);
    }
  }

  create() {
    const {profileName, photoUrl} = this.props;
    const uploadPhoto = this.updatePhoto.bind(this);

    // prettier-ignore
    return (
      div('c=large_avatar;', [
        div('c=large_avatar__preview;', [
          photoUrl? 
            img(`c=large_avatar__img; src=${hostResources + photoUrl}; alt=insert profile photo;`, [])
              :
            img(`c=large_avatar__preview__img; src=${preview}; alt=insert profile photo;`, []),
          input(`c=large_avatar__preview_button; t=file; id=file; v=Change avatar; `, [], {input: uploadPhoto}),
          label(`c=large_avatar__preview_label; for=file;`,['Change avatar'])
        ]),
        span('c=large_avatar__profile_name text;', [profileName]),
      ])
    );
  }
}
