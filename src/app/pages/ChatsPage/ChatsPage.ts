

import './ChatsPage.sass';

import {div, aside, section, footer, header, main, nav, button, ul, component} from '@core/tags';
import {Component} from '@core/component';
import {State} from '@core/types';

import {ChatListItem, Input} from '@app/components';
import {inputs} from '@app/resources';
import {name} from '@app/const';

const searchChatInput = inputs.find((e) => e.name === name.searchChat);
const searchMessageInput = inputs.find((e) => e.name === name.searchMessage);
const sendMessageInput = inputs.find((e) => e.name === name.sendMessage);

export default class ChatsPage extends Component {
  constructor() {
    super();
  }

  createState() {
    return {
      data: {
        [name.searchChat]: '',
        [name.searchMessage]: '',
        [name.sendMessage]: '',
      },
    };
  }

  onChange(event: InputEvent) {
    const name = (event.target as any).name;
    const value = (event.target as any).value;
    this.state.data = {...this.state.data, [name]: value};
  }

  create(state: State) {
    console.log('form data:', state.data);
    const onChange = this.onChange.bind(this);

    // prettier-ignore
    return (
      div('c=chats;', [
        // Left side
        aside('c=chats__list;', [
          // top
          header('c=chats__list__header;', [
            nav('c=chats__list__header__nav;', [
              button('c=chats__list__header__nav__menu button; t=button; n=menu', []),
            ]),
            component(Input, {
              ...searchChatInput,
              change: onChange,
              value: state.data[searchChatInput!.name],
              className: 'chats__list__header_search',
            }),
          ]),
          // chats items
          ul('c=chats__list__items;', [
            ...[1, 2, 3, 4, 5, 6].map(() => {
              return component(ChatListItem);
            }),
          ]),
        ]),
        // Messages
        section('c=chats__messages;', [
          // top
          header('c=chats__messages__header;', [
            component(Input, {
              ...searchMessageInput,
              change: onChange,
              value: state.data[searchMessageInput!.name],
              className: 'chats__messages__header__search',
            }),
            button('c=chats__messages__header__account button; t=button; n=account', []),
          ]),
          // middle
          main('c=chats__messages__message_items;', [

          ]),
          // bottom
          footer('c=chats__messages__footer;', [
            button('c=chats__messages__footer__attach button; t=button; n=attach file', []),
            component(Input, {
              ...sendMessageInput,
              change: onChange,
              value: state.data[sendMessageInput!.name],
              className: 'chats__messages__footer__message',
            }),
            button('c=chats__messages__footer__send button; t=button; n=send message', []),
          ]),
        ]),
      ])
    );
  }
}
