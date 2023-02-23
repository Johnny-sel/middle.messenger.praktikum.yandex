import './ChatListItem.sass';

import {button, component, div, img, li, span} from '@core/tags';
import {Component} from '@core/component';
import {parseDate} from '@app/utils';
import {GetChatsResponse} from '@api/types';
import {hostResources} from '@app/constants';
import {Spinner} from '@app/components';

export default class ChatListItem extends Component<{}, ChatListItemProps> {
  constructor() {
    super();
  }

  create() {
    const {active, chat, onClickChat, onDeleteChat, loadDeleteChat, deletedChatId} = this.props;

    const time = parseDate(chat.last_message?.time).time;
    const content = chat.last_message?.content;
    const selectedChat = active ? '--active' : '';
    const lastMessage = content?.length > 20 ? content?.slice(0, 15) + '...' : content;
    const userAvatar = chat.last_message?.user?.avatar;

    // prettier-ignore
    return (
      li(`c=chat__list__item chat__list__item${selectedChat}; tabIndex=0;`, [

        div('c=chat__list__item__avatar;', [
          userAvatar?
            img(`
              c=chat__list__item__avatar__img;
              src=${hostResources + userAvatar};
              alt=profile photo;`, ['E']
          ):
          div('c=chat__list__item__avatar_preview;', [chat.title[0]]),
        ]),

        div('c=chat__list__item__body;', [
          div('c=chat__list__item__body__top;', [
            span('c=chat__list__item__body__top__username;', [chat.title ?? '']),
            span('c=chat__list__item__body__top__time;', [time ?? '']),
          ]),
          div('c=chat__list__item__body__bottom;', [
            span('c=chat__list__item__body__bottom__text;', [lastMessage ?? '']),
            deletedChatId === chat.id && loadDeleteChat? component.call(this, Spinner, {key:'1', size: '24px'}):
              button('c=chat__list__item__body__bottom__trash button; n=delete chat',
                {click: (e: Event)=> {onDeleteChat(e, chat.id)}}
              ),
          ]),
        ]),
      ], {click: () => {onClickChat(chat.id)}})
    );
  }
}

type ChatListItemProps = {
  chat: GetChatsResponse;
  active: boolean;
  loadDeleteChat: boolean;
  deletedChatId: number;
  onClickChat: (chatId: number) => void;
  onDeleteChat: (event: Event, chatId: number) => void;
};
