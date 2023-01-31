import './MessageListItem.sass';

import {div, span} from 'src/core/vdom/tags/tags';
import {Component} from '@core/component';
import {parseDate} from '@app/utils';
import {MessageProps} from './types';

export default class Message extends Component<{}, MessageProps> {
  constructor() {
    super();
  }

  create() {
    const {content, time: datetime} = this.props;
    const {date, time} = parseDate(datetime);
    // prettier-ignore
    return (
      div('c=message;', [
        span('c=message__title;', [`${date}  ${time}`]),
        span('c=message__content;', [content]),
      ])
    );
  }
}
