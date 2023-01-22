import './ChatListItem.sass';

import {div, li, span} from '@core/tags';
import {Component} from '@core/component';
import {GetChatsResponse} from '@api/types';

type ChatListItemProps = {
  chat: GetChatsResponse;
  onClick: (chatId: string) => void;
};

export default class ChatListItem extends Component<{}, ChatListItemProps> {
  constructor() {
    super();
  }

  create() {
    const {avatar, id, last_message, title, unread_count} = this.props.chat;
    const click = this.props.onClick.bind(this);
    // prettier-ignore
    return (
      li('c=chat__list__items__item; tabIndex=0;', [
        div('c=chat__list__items__item__avatar;', ['E']),
        div('c=chat__list__items__item__body;', [
          div('c=chat__list__items__item__body__top;', [
            span('c=chat__list__items__item__body__top__username;', 
              [last_message?.user?.login ?? '']
            ),
            span('c=chat__list__items__item__body__top__time;',
              [last_message?.time ?? '']
            ),
          ]),
          div('c=chat__list__items__item__body__bottom;', [
            span('c=chat__list__items__item__body__bottom__text;', 
            [title ?? '']),
          ]),
        ]),
      ], {click: () => click(id)})
    );
  }
}
