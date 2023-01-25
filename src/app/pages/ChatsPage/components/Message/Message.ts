import './Message.sass';

import {div, span} from '@core/tags';
import {Component} from '@core/component';
import {MessageProps} from './types';

export default class Message extends Component<{}, MessageProps> {
  constructor() {
    super();
  }

  create() {
    const {content, time} = this.props;
    // prettier-ignore
    return (
      div('c=message;', [
        span('c=message__title;', [time]),
        span('c=message__content;', [content]),
      ])
    );
  }
}
