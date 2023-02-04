import {button} from './../../../../../core/vdom/tags/tags';
import './ChatListItem.sass';

import {div, li, span} from '@core/tags';
import {Component} from '@core/component';
import {parseDate} from '@app/utils';
import {ChatListItemProps} from './types';

export default class ChatListItem extends Component<{}, ChatListItemProps> {
  constructor() {
    super();
  }

  create() {
    const {active, chat, onClick} = this.props;
    const {time} = parseDate(chat.last_message?.time);

    const selected = active ? '--active' : '';
    const content = chat.last_message?.content;
    const length = content?.length;

    const lastMessage = length > 20 ? content?.slice(0, 20) + '...' : content;

    // prettier-ignore
    return (
      li(`c=chat__list__items__item chat__list__items__item${selected}; tabIndex=0;`, [
        button(`c=chat__list__items__item__menu button;`),
        div('c=chat__list__items__item__separator;'),
        div('c=chat__list__items__item__avatar;', ['E']),
        div('c=chat__list__items__item__body;', [
          div('c=chat__list__items__item__body__top;', [
            span('c=chat__list__items__item__body__top__username;',
              [chat.last_message?.user?.login ?? '']
            ),
            span('c=chat__list__items__item__body__top__time;',
              [time ?? '']
            ),
          ]),
          div('c=chat__list__items__item__body__bottom;', [
            span('c=chat__list__items__item__body__bottom__text;',
            [lastMessage ? lastMessage : chat.title]),
          ]),
        ]),
      ], {click: onClick})
    );
  }
}
