import './ChatList.sass';
// core
import {aside, button, component, div, footer, header, nav, span, ul} from '@core/tags';
import {Component} from '@core/component';
import {Router} from '@core/router';
// app
import {Input, ChatListItem, Popover} from '@app/components';
import {location, name} from '@app/constants';
import {inputs} from '@app/resources';
import {CHANGE_INPUT, CREATE_CHAT, DELETE_CHAT, OPEN_CHAT, SWITCH_TOOLTIP} from '@app/actions';
// local
import {chatListState} from './state';
import {dispatch} from './reducer';
import {ChatListProps, ChatListState} from './types';
import {GetUserResponse} from '@api/types';

const titleInput = inputs.find((e) => e.name === name.title);

export default class ChatList extends Component<ChatListState, ChatListProps> {
  constructor() {
    super();
  }

  createState() {
    return chatListState;
  }

  onChange(event: InputEvent) {
    this.state.event = event;
    dispatch.call(this, CHANGE_INPUT);
  }

  switchPopover() {
    dispatch.call(this, SWITCH_TOOLTIP);
  }

  createChat() {
    dispatch.call(this, CREATE_CHAT);
  }

  openChat(chatId: number) {
    dispatch.call(this, OPEN_CHAT, chatId);
  }

  deleteChat(event: Event, chatId: number) {
    event.stopPropagation();
    dispatch.call(this, DELETE_CHAT, chatId);
  }

  create() {
    const {inputData, showPopover,  loadCreateChat, loadDeleteChat} = this.state;
    const {deletedChatId, selectedChatId} = this.state;
    const {chats, loadChats} = this.props;

    const onChange = this.onChange.bind(this);
    const switchPopover = this.switchPopover.bind(this);
    const createChat = this.createChat.bind(this);
    const openChat = this.openChat.bind(this);
    const deleteChat = this.deleteChat.bind(this);

    const currentUser = JSON.parse(localStorage.getItem('user') || '{}') as GetUserResponse;

    // prettier-ignore

    return (
      aside('c=chats__list;', [
        // header aside
        header('c=chats__list__header;', [
          nav('c=chats__list__header__nav;', [
            button('c=chats__list__header__nav__menu button; t=button; n=account',
                {click: () => Router.to(location.profile)},
            ),
          ]),
          span('c=chats__list__header__username text center;',
          currentUser ?
              [`${currentUser?.first_name} ${currentUser?.second_name}`]:
              ['Loading...'],
          ),
          button('c=chats__list__header_search__home button; t=button; n=home',
              {click: () => Router.to(location.root)},
          ),
        ]),
        // chats items
        chats.length === 0 && !loadChats ?
          div('c=chats__list__create_chat;', [
            span('c=text;', ['Create chat']),
          ]) :
            loadChats?
              span('c=;', ['Loading chats...']) :
              ul('c=chats__list__items;', [
                ...chats.map((chat) => {
                  return component.call(this, ChatListItem, {
                    onClickChat: openChat,
                    onDeleteChat: deleteChat,
                    loadDeleteChat: loadDeleteChat,
                    deletedChatId: deletedChatId,
                    chat: chat,
                    active: chat.id === (selectedChatId || this.props.selectedChatId),
                    key: chat.id + 'li',
                  });
                }),
              ]),

        // footer aside
        footer('c=chats__list__footer;', [
          component.call(this, Popover, {
            key: '2',
            show: showPopover,
            load: loadCreateChat,
            className: 'popover__add_chat',
            position: {bottom: '70px'},

            children: [
              component.call(this, Input, {
                ...titleInput,
                key: '3',
                change: onChange,
                showError: false,
                value: inputData['title'],
                className: 'popover__input',
              }),
              button('c=popover__add_chat__button button; t=button; n=create chat', {click: createChat}),
            ],
          }),
          button(`
              c=chats__list__footer__add_chat${showPopover ? '--cancel' : ''} button;
              t=button;
              n=add chat;
            `,
          {click: switchPopover},
          ),
        ]),
      ])
    );
  }
}
