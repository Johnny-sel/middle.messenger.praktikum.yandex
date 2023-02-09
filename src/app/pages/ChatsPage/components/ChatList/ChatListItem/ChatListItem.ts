import './ChatListItem.sass';

import {div, li, span} from '@core/tags';
import {Component} from '@core/component';
import {parseDate} from '@app/utils';
import {GetChatsResponse} from '@api/types';

export default class ChatListItem extends Component<{}, ChatListItemProps> {
  constructor() {
    super();
  }

  create() {
    const {active, chat, onClickChat} = this.props;

    const time = parseDate(chat.last_message?.time).time;
    const content = chat.last_message?.content;
    const selectedChat = active ? '--active' : '';
    const lastMessage = content?.length > 20 ? content?.slice(0, 20) + '...' : content;

    // prettier-ignore
    return (
      li(`c=chat__list__item chat__list__item${selectedChat}; tabIndex=0;`, [
        div('c=chat__list__item__avatar;', ['E']),
        div('c=chat__list__item__body;', [
          div('c=chat__list__item__body__top;', [
            span('c=chat__list__item__body__top__username;',
              [chat.last_message?.user?.login ?? '']
            ),
            span('c=chat__list__item__body__top__time;',
              [time ?? '']
            ),
          ]),
          div('c=chat__list__item__body__bottom;', [
            span('c=chat__list__item__body__bottom__text;',
            [lastMessage ? lastMessage : chat.title]),
          ]),
        ]),
      ], {click: () => {onClickChat(chat.id)}})
    );
  }
}

type ChatListItemProps = {
  chat: GetChatsResponse;
  active: boolean;
  itemIndex: number;
  onClickChat: (chatId: number) => void;
};
