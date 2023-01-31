import './ChatListItem.sass';

import {div, li, span} from 'src/core/vdom/tags/tags';
import {Component} from '@core/component';
import {parseDate} from '@app/utils';
import {ChatListItemProps} from './types';

export default class ChatListItem extends Component<{}, ChatListItemProps> {
  constructor() {
    super();
  }

  create() {
    const {active, chat} = this.props;
    const {id, last_message, title} = chat;
    const {time} = parseDate(last_message?.time);

    const selected = active ? '--active' : '';
    const content = last_message?.content;
    const length = content?.length;

    const lastMessage = length > 20 ? content?.slice(0, 20) + '...' : content;

    const click = this.props.onClick.bind(this);
    // prettier-ignore
    return (
      li(`c=chat__list__items__item chat__list__items__item${selected}; tabIndex=0;`, [
        div('c=chat__list__items__item__avatar;', ['E']),
        div('c=chat__list__items__item__body;', [
          div('c=chat__list__items__item__body__top;', [
            span('c=chat__list__items__item__body__top__username;', 
              [last_message?.user?.login ?? '']
            ),
            span('c=chat__list__items__item__body__top__time;',
              [time ?? '']
            ),
          ]),
          div('c=chat__list__items__item__body__bottom;', [
            span('c=chat__list__items__item__body__bottom__text;', 
            [lastMessage ? lastMessage : title]),
          ]),
        ]),
      ], {click: () => click(id)})
    );
  }
}
