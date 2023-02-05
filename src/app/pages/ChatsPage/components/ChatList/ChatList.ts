import './ChatList.sass';
// core
import {aside, button, component, footer, header, nav, span, ul} from '@core/tags';
import {Component} from '@core/component';
import {Router} from '@core/router';
// app
import {Input, ChatListItem, Popover} from '@app/components';
import {location, name} from '@app/constants';
import {inputs} from '@app/resources';
import {CHANGE_INPUT, CREATE_CHAT, OPEN_CHAT, OPEN_CHAT_MENU, SWITCH_TOOLTIP} from '@app/actions';
// local
import {chatListState} from './state';
import {dispatch} from './reducer';
import {ChatListProps, ChatListState} from './types';

const searchChatInput = inputs.find((e) => e.name === name.searchChat);
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

  openChat(evt: Event, chatId: number) {
    evt.stopPropagation();
    dispatch.call(this, OPEN_CHAT, chatId);
  }

  openChatMenu(evt: Event, chatId: number) {
    evt.stopPropagation();
    dispatch.call(this, OPEN_CHAT_MENU, chatId);
  }

  create() {
    const {inputData, showPopover, isClickChatMenu, selectedChatId, loadCreateChat} = this.state;
    const {chats, loadChats} = this.props;


    const onChange = this.onChange.bind(this);
    const switchPopover = this.switchPopover.bind(this);
    const createChat = this.createChat.bind(this);
    const openChat = this.openChat.bind(this);
    const openChatMenu = this.openChatMenu.bind(this);

    // prettier-ignore

    return (
      aside('c=chats__list;', [
        // header aside
        header('c=chats__list__header;', [
          nav('c=chats__list__header__nav;', [
            button('c=chats__list__header__nav__menu button; t=button; n=menu',
              {click: () => Router.to(location.root)},
            ),
          ]),
          component.call(this, Input, {
            ...searchChatInput,
            key: '1',
            showError: false,
            change: onChange,
            value: inputData['search_chat'],
            className: 'chats__list__header_search',
          }),
          button('c=chats__list__header_search__account button; t=button; n=account',
            {click: () => Router.to(location.profile)},
          ),
        ]),
        // chats items
        chats.length === 0 && !loadChats ?
          span('c=text;', ['Create chat'])
            :
            loadChats?
              span('c=;',['Loading chats...'])
              :
              ul('c=chats__list__items;', [
              ...chats?.map((chat, index) => {
                  return component.call(this, ChatListItem, {
                    onClickChat: openChat,
                    onClickChatMenu: openChatMenu,
                    isClickChatMenu: isClickChatMenu,
                    itemIndex:index,
                    chat: chat,
                    active: chat.id === selectedChatId,
                    key: chat.id
                  });
              }),
        ]),
        // footer aside
        footer('c=chats__list__footer;', [
          component.call(this, Popover, {
            key: '2',
            show: showPopover,
            load: loadCreateChat,
            position: {bottom: '70px'},
            children: [
              component.call(this, Input, {
                ...titleInput,
                key: '3',
                change: onChange,
                showError: false,
                value: inputData['title'],
                className: 'tooltip__input',
              }),
              button('c=tooltip__button button; t=button; n=create chat', {click: createChat}),
            ]
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
